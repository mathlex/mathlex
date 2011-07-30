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
    
    // look through all tokens and check for digraphs (multicharacter token operators)
    for (type in TokenType) {
        if (TokenType[type].length > 1) {
            end = this.currPos + TokenType[type].length;
            // check if current and succeeding chars match digraph
            if (this.input.substring(this.currPos, end) == TokenType[type]) {
                this.tokens.push(new Token(type));
                this.currPos += TokenType[type].length;
                return;
            }
        }
    }
    
    // tokenize constant if current char is '#' and next is a letter
    if (this.input[this.currPos] == '#' && this.input[this.currPos + 1].match(/a-zA-Z/)) {
        this.tokenizeSymbol();
        return;
    }
    
    // default to a single character token
    this.tokens.push(new Token(this.input[this.currPos]));
    this.currPos++;
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
    var value;
    
    // check for constant (forwarded request from tokenizeOperator)
    if (this.input[this.currPos] == '#') {
        type = TokenType.CONSTANT;
        // disregard the '#' symbol and get the constant's name
        this.currPos++;
    }
    
    if (this.input[this.currPos].match(/[a-zA-Z]/)) {
        // group letters together
        var start = this.currPos;
        while (this.currPos < this.input.length && this.input[this.currPos].match(/[a-zA-Z]/)) {
            this.currPos++;
        }
        
        value = this.input.substring(start, this.currPos);
        
        // TODO: Check if symbol is a reserved keyword:
        // if (is_keyword(value)) type = get_type_from_keyword(value);
    } else {
        //tokenize a single junk character
        type = TokenType.UNKNOWN;
        value = this.input[this.currPos];
        currPos++;
    }
    
    this.tokens.push(new Token(type, value));
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