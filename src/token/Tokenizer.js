function Tokenizer() {
    this.input = this.tokens = this.currPos = this.tokenized = null;
    this.reset();
}

Tokenizer.prototype.getIterator = function() {
    if (!this.tokenized) {
        throw 'Nothing has been tokenized!';
    }
    return new TokenIterator(this.tokens);
};

Tokenizer.prototype.reset = function() {
    this.input = '';
    this.currPos = 0;
    this.tokens = [];
    this.tokenized = false;
};

Tokenizer.prototype.tokenize = function(input) {
    this.reset();
    this.input = input;
    
    while (this.currPos < this.input.length) {
        var currChar = this.input[this.currPos];
        if (currChar.match(/[\*\/\+\-\^\_\(\)\&\!\=\<\>]/)) {
            this.tokenizeOperator();
        } else if (currChar.match(/[\d\.]/)) {
            this.tokenizeNumber();
        } else {
            this.tokenizeSymbol();
        }
    }
    this.tokenized = true;
};

Tokenizer.prototype.tokenizeOperator = function() {
    var i = 1,
        keys = Token.getMultiChars(),
        s, possibilities;
        
    while (keys.length > 0) {
        i++;
        if (this.currPos + i >= this.input.length) {
            break;
        }
        
        s = this.input.substring(this.currPos, this.currPos + i);
        possibilities = [];
        for (var k in keys) {
            if (k.substring(0, s.length) === s) {
                possibilities.push(k);
            }
        }
        
        keys = possibilities;
    }
    
    if (i == 1) {
        i++;
    }
    
    this.tokens.push(new Token(this.input.substring(this.currPos, this.currPos + i-1)));
    this.currPos += i-1;
};

Tokenizer.prototype.tokenizeNumber = function() {
    var start = this.currPos;
    while (this.currPos < this.input.length && this.input[this.currPos].match(/[\d\.]/)) {
        this.currPos++;
    }
    
    this.tokens.push(new Token(Token.Type.NUMBER, this.input.substring(start, this.currPos)));
};

Tokenizer.prototype.tokenizeSymbol = function() {
    var type = Token.Type.VARIABLE,
        value;
    
    // check for constant
    if (this.input[this.currPos] == '#') {
        type = Token.Type.CONSTANT;
        // skip over '#' character and tokenize constant name
        this.currPos++;
    }
    
    if (this.input[this.currPos].match(/[a-zA-Z]/)) {
        // group letters together
        var start = this.currPos;
        while (this.currPos < this.input.length && this.input[this.currPos].match(/[a-zA-Z\d]/)) {
            this.currPos++;
        }
        
        value = this.input.substring(start, this.currPos);
        
        // TODO: Check if symbol is a reserved keyword:
        // if (is_keyword(value)) type = get_type_from_keyword(value);
    } else {
        // tokenize a single junk character
        type = Token.Type.UNKNOWN;
        value = this.input[this.currPos];
        this.currPos++;
    }
    
    this.tokens.push(new Token(type, value));
};
