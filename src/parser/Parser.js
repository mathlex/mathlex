function Parser(builder) {
    this._tokens = this._leftInjectionPoint = null;
    this.parseTree = null;
    this._builder = builder;
}

Parser.prototype.fixUnmatchedDelimiters = function() {
    if (this._tokens.isDone()) {
        return false;
    }
    
    var t = this._tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.RPAREN:
            this._leftInjectionPoint.inject(new Token(Token.Type.LPAREN));
            break;
        case Token.Type.PIPE:
            this._leftInjectionPoint.inject(new Token(Token.Type.PIPE));
            break;
        default:
            // ignore unknown extra tokens
            return false;
    }
    
    // reset token stream iterator
    this._tokens.first();
    return true;
};

Parser.prototype.parse = function(tokens) {
    if (!(tokens instanceof TokenIterator)) {
        throw "Parser.parse requires an instance of TokenIterator";
    }
    
    this._leftInjectionPoint = new TokenIterator(tokens);
    this._tokens = tokens;
    
    do {
        this.parseTree = this.parseRelation();
    } while (this.fixUnmatchedDelimiters());
    
    if (!this._tokens.isDone()) {
        throw "Expected end of token stream";
    }
};

Parser.prototype.parseRelation = function() {
    var left = this.parseSum();
    
    if (this._tokens.isDone()) {
        return left;
    }
    
    var t = this._tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.LESS_THAN:
            this._tokens.next();
            this._leftInjectionPoint = new TokenIterator(this._tokens);
            return this._builder.newLessRelation(left, this.parseSum());
        case Token.Type.LESS_EQUAL:
            this._tokens.next();
            this._leftInjectionPoint = new TokenIterator(this._tokens);
            return this._builder.newLessEqualRelation(left, this.parseSum());
        case Token.Type.EQUAL:
            this._tokens.next();
            this._leftInjectionPoint = new TokenIterator(this._tokens);
            return this._builder.newEqualRelation(left, this.parseSum());
        case Token.Type.NOT_EQUAL:
            this._tokens.next();
            this._leftInjectionPoint = new TokenIterator(this._tokens);
            return this._builder.newNotEqualRelation(left, this.parseSum());
        case Token.Type.GREATER_EQUAL:
            this._tokens.next();
            this._leftInjectionPoint = new TokenIterator(this._tokens);
            return this._builder.newGreaterEqualRelation(left, this.parseSum());
        case Token.Type.GREATER_THAN:
            this._tokens.next();
            this._leftInjectionPoint = new TokenIterator(this._tokens);
            return this._builder.newGreaterRelation(left, this.parseSum());
        default:
            return left;
    }
};

Parser.prototype.parseSum = function() {
    var left = this.parseTerm();
    
    if (this._tokens.isDone()) {
        return left;
    }
    
    var t = this._tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.PLUS:
            this._tokens.next();
            return this._builder.newPlus(left, this.parseSum());
        case Token.Type.MINUS:
            this._tokens.next();
            return this._builder.newMinus(left, this.parseSum());
        default:
            return left;
    }
};

Parser.prototype.parseTerm = function() {
    var left = this.parseFraction();
    
    if (this._tokens.isDone()) {
        return left;
    }
    
    var t = this._tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.TIMES:
            this._tokens.next();
            return this._builder.newTimes(left, this.parseTerm());
        default:
            return left;
    }
};

Parser.prototype.parseFraction = function() {
    // DIVIDE has slightly higher precedence than TIMES:
    // 1/3*x should be (1/3)*x and not 1/(3*x)
    var left = this.parseNegation();
    
    if (this._tokens.isDone()) {
        return left;
    }
    
    var t = this._tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.DIVIDE:
            this._tokens.next();
            return this._builder.newDivide(left, this.parseFraction());
        default:
            return left;
    }
};

Parser.prototype.parseNegation = function() {
    if (this._tokens.isDone()) {
        return this.parseFactor();
    }
    
    var t = this._tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.MINUS:
            this._tokens.next();
            return this._builder.newNegation(this.parseFactor());
        case Token.Type.PLUS:
            this._tokens.next();
            return this._builder.newPositive(this.parseFactor());
        default:
            return this.parseFactor();
    }
};

Parser.prototype.parseFactor = function() {
    var left = this.parseFactorial();
    
    if (this._tokens.isDone()) {
        return left;
    }
    
    var t = this._tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.CARET:
            this._tokens.next();
            return this._builder.newExponent(left, this.parseNegation());
        case Token.Type.UNDERSCORE:
            this._tokens.next();
            return this._builder.newSubscript(left, this.parseNegation());
        default:
            return left;
    }
};

Parser.prototype.parseFactorial = function() {
    var base = this.parsePrimary();
    
    if (this._tokens.isDone()) {
        return base;
    }
    
    var t = this._tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.BANG:
            this._tokens.next();
            return this._builder.newFactorial(base);
        default:
            return base;
    }
};

Parser.prototype.parsePrimary = function() {
    if (this._tokens.isDone()) {
        return this._builder.newNull();
    }
    
    var t = this._tokens.getCurrent(),
        ex;

    switch (t.type) {
        case Token.Type.LPAREN:
            this._tokens.next();
            ex = this._builder.newParentheses(this.parseSum());
            // look for close paren; auto-insert if missing
            if (!this._tokens.isDone() && this._tokens.getCurrent().type == Token.Type.RPAREN) {
                // skip over closing paren
                this._tokens.next();
            }
            return ex;
        case Token.Type.PIPE:
            this._tokens.next();
            ex = this._builder.newAbsoluteValue(this.parseSum());
            // look for close pipe; auto-insert if missing
            if (!this._tokens.isDone() && this._tokens.getCurrent().type == Token.Type.PIPE) {
                // skip  over closing pipe
                this._tokens.next();
            }
            return ex;
        case Token.Type.NUMBER:
            this._tokens.next();
            return this._builder.newNumber(parseFloat(t.value));
        case Token.Type.CONSTANT:
            this._tokens.next();
            return this._builder.newConstant(t.value);
        case Token.Type.VARIABLE:
            this._tokens.next();
            return this._builder.newVariable(t.value);
        default:
            return this._builder.newNull();
    }
};
