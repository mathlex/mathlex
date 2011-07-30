function Tokenizer() {
    this.input = this.currPos = this.tokens = null;
}

Tokenizer.prototype.tokenize = function(input) {
    // reset and initialize the current state
    this.input = input;
    this.currPos = 0;
    this.tokens = new Array();
    
    var currChar;
    
    // perform tokenization for whole input string
    while (this.currPos < this.input.length) {
        currChar = this.input[this.currPos];
        if (currChar.match(/[\*\/\+\-\^\_\(\)\#]/)) {
            // some operators will use the '#' symbol...
            this.tokenizeOperator();
        } else if (currChar.match(/[\d\.]/)) {
            this.tokenizeNumber();
        } else if (currChar.match(/[a-zA-Z]/)) {
            this.tokenizeSymbol()
        } else {
            this.tokenizeCharacter();
        }
    }
    
    // append an end-of-input token to signal parser
    this.tokens.push(new Token(TokenType.END_OF_INPUT));
};

Tokenizer.prototype.tokenizeOperator = function() {
    var end, currChar;
    
    // check for digraph (multicharacter token operator)
    for (type in TokenType) {
        if (TokenType[type].length > 1) {
            end = this.currPos + TokenType[type].length;
            if (this.input.substring(this.currPos, end) == TokenType[type]) {
                this.tokens.push(new Token(type));
                this.currPos += TokenType[type].length;
                return;
            }
        }
    }
    
    // if the current symbol is a '#', then it must belong to a constant.
    if (this.input[this.currPos] == '#') {
        this.tokenizeSymbol();
    } else {
        // tokenize operator
        this.tokenizeCharacter();
    }
};

Tokenizer.prototype.tokenizeNumber = function() {
    var start = this.currPos;
    while (this.currPos < this.input.length && this.input[this.currPos].match(/[\w\.]/)) {
        this.currPos++;
    }
    this.tokens.push(new Token(TokenType.NUMBER, this.input.substring(start, this.currPos)));
};

Tokenizer.prototype.tokenizeSymbol = function() {
    // expect a variable by default
    var type = TokenType.VARIABLE;
    
    // check for constant (forwarded request from tokenizeOperator)
    if (this.input[this.currPos] == '#') {
        type = TokenType.CONSTANT;
        // disregard the '#' symbol and get the constant's name
        this.currPos++;
    }
    
    // to prevent infinite loop below, check that the current symbol is a letter
    if (!this.input[this.currPos].match(/[a-zA-Z]/)) {
        // if not a letter, tokenize unknown character
        this.tokenizeCharacter(TokenType.UNKNOWN);
        return;
    }
    
    var start = this.currPos;
    while (this.currPos < this.input.length && this.input[this.currPos].match(/[a-zA-Z]/)) {
        this.currPos++;
    }
    
    this.tokens.push(new Token(type, this.input.substring(start, this.currPos)));
};

Tokenizer.prototype.tokenizeCharacter = function(type) {
    type = type ? type : this.input[this.currPos];
    this.tokens.push(new Token(type, this.input[this.currPos]));
    this.currPos++;
};


Tokenizer.prototype.hasNext = function() {
    return (this.tokens.length > 0);
};

Tokenizer.prototype.getNext = function() {
    var t = this.tokens.shift();
    return t;
};

Tokenizer.prototype.putBack = function(token) {
    this.tokens.unshift(token);
};