function Parser(builder) {
    this.tokens = null;
    this.parseTree = null;
    this.builder = builder;
}

Parser.prototype.parse = function(tokens) {
    this.tokens = tokens;
    this.parseTree = this.parseRelation();
    if (!this.tokens.isDone()) {
        throw "Expected end of token stream";
    }
};

Parser.prototype.parseRelation = function() {
    var left = this.parseSum();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.LESS_THAN:
            this.tokens.next();
            return this.builder.newLessRelation(left, this.parseSum());
        case Token.Type.LESS_EQUAL:
            this.tokens.next();
            return this.builder.newLessEqualRelation(left, this.parseSum());
        case Token.Type.EQUAL:
            this.tokens.next();
            return this.builder.newEqualRelation(left, this.parseSum());
        case Token.Type.NOT_EQUAL:
            this.tokens.next();
            return this.builder.newNotEqualRelation(left, this.parseSum());
        case Token.Type.GREATER_EQUAL:
            this.tokens.next();
            return this.builder.newGreaterEqualRelation(left, this.parseSum());
        case Token.Type.GREATER_THAN:
            this.tokens.next();
            return this.builder.newGreaterRelation(left, this.parseSum());
        default:
            return left;
    }
};

Parser.prototype.parseSum = function() {
    var left = this.parseTerm();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.PLUS:
            this.tokens.next();
            return this.builder.newPlus(left, this.parseSum());
        case Token.Type.MINUS:
            this.tokens.next();
            return this.builder.newMinus(left, this.parseSum());
        default:
            return left;
    }
};

Parser.prototype.parseTerm = function() {
    var left = this.parseFraction();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.TIMES:
            this.tokens.next();
            return this.builder.newTimes(left, this.parseTerm());
        default:
            return left;
    }
};

Parser.prototype.parseFraction = function() {
    // DIVIDE has slightly higher precedence than TIMES:
    // 1/3*x should be (1/3)*x and not 1/(3*x)
    var left = this.parseNegation();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.DIVIDE:
            this.tokens.next();
            return this.builder.newDivide(left, this.parseFraction());
        default:
            return left;
    }
};

Parser.prototype.parseNegation = function() {
    if (this.tokens.isDone()) {
        return this.parseFactor();
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.MINUS:
            this.tokens.next();
            return this.builder.newNegation(this.parseFactor());
        case Token.Type.PLUS:
            this.tokens.next();
            return this.builder.newPositive(this.parseFactor());
        default:
            return this.parseFactor();
    }
};

Parser.prototype.parseFactor = function() {
    var left = this.parseFactorial();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.CARET:
            this.tokens.next();
            return this.builder.newExponent(left, this.parseNegation());
        case Token.Type.UNDERSCORE:
            this.tokens.next();
            return this.builder.newSubscript(left, this.parseNegation());
        default:
            return left;
    }
};

Parser.prototype.parseFactorial = function() {
    var base = this.parsePrimary();
    
    if (this.tokens.isDone()) {
        return base;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.BANG:
            this.tokens.next();
            return this.builder.newFactorial(base);
        default:
            return base;
    }
};

Parser.prototype.parsePrimary = function() {
    if (this.tokens.isDone()) {
        return this.builder.newNull();
    }
    
    var t = this.tokens.getCurrent();

    switch (t.type) {
        case Token.Type.LPAREN:
            this.tokens.next();
            var ex = this.builder.newParentheses(this.parseSum());
            // look for close paren; auto-insert if missing
            if (!this.tokens.isDone() && this.tokens.getCurrent().type == Token.Type.RPAREN) {
                // skip over closing paren
                this.tokens.next();
            }
            return ex;
        case Token.Type.NUMBER:
            this.tokens.next();
            return this.builder.newNumber(parseFloat(t.value));
        case Token.Type.CONSTANT:
            this.tokens.next();
            return this.builder.newConstant(t.value);
        case Token.Type.VARIABLE:
            this.tokens.next();
            return this.builder.newVariable(t.value);
        default:
            return this.builder.newNull();
    }
};
