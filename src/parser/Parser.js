function Parser(builder) {
    this.builder = builder;
    this.parseTree = null;
}

Parser.prototype.parse = function(tokens) {
    this.tokens = tokens;
    this.parseTree = this.parseSum();
};

Parser.prototype.parseSum = function() {
    var left = this.parseTerm();
    var t = this.tokens.getNext();
    switch (t.type) {
        case TokenType.PLUS:
            return this.builder.newPlus(left, this.parseSum());
        case TokenType.MINUS:
            return this.builder.newMinus(left, this.parseSum());
        default:
            this.tokens.putBack(t);
            return left;
    }
};

Parser.prototype.parseTerm = function() {
    var left = this.parseNegation();
    var t = this.tokens.getNext();
    switch(t.type) {
        case TokenType.TIMES:
            return this.builder.newTimes(left, this.parseTerm());
        case TokenType.DIVIDE:
            return this.builder.newDivide(left, this.parseTerm());
        default:
            this.tokens.putBack(t);
            return left;
    }
};

Parser.prototype.parseNegation = function() {
    var t = this.tokens.getNext();
    
    if (t.type == TokenType.MINUS) {
        return this.bulder.newNegation(this.parseFactor());
    } else {
        this.tokens.putBack(t);
        return this.parseFactor();
    }
};

Parser.prototype.parseFactor = function() {
    var left = this.parsePrimary();
    var t = this.tokens.getNext();
    
    switch (t.type) {
        case TokenType.CARET:
            return this.builder.newExponent(left, this.parseNegation());
        case TokenType.UNDERSCORE:
            return this.builder.newSubscript(left, this.parseNegation());
        default:
            this.tokens.putBack(t);
            return left;
    }
};

Parser.prototype.parsePrimary = function() {
    var t = this.tokens.getNext();
    var ex;
    switch (t.type) {
        case TokenType.LPAREN:
            ex = this.builder.newParentheses(this.parseSum());
            if (this.tokens.getNext().type != TokenType.RPAREN) {
                throw "Expected " + TokenType.RPAREN + " token."
            }
            return ex;
        case TokenType.NUMBER:
            return this.builder.newNumber(parseFloat(t.value));
        case TokenType.CONSTANT:
            return this.builder.newConstant(t.value);
        case TokenType.VARIABLE:
            return this.builder.newVariable(t.value);
        default:
            this.tokens.putBack(t);
            throw "Expected primary token";
    }
};
