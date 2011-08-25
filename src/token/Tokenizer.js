function Tokenizer() {
    this._input = this._tokens = this._currPos = null;
    this._tokenized = false;
    this.reset();
}

Tokenizer.prototype.getIterator = function() {
    if (!this._tokenized) {
        throw 'Nothing has been tokenized!';
    }
    return new TokenIterator(this._tokens);
};

Tokenizer.prototype.reset = function() {
    this._input = '';
    this._currPos = 0;
    this._tokens = [];
    this._tokenized = false;
};

Tokenizer.prototype.tokenize = function(input) {
    this.reset();
    this._input = input;
    
    while (this._currPos < this._input.length) {
        var currChar = this._input[this._currPos];
        if (currChar.match(/[\*\/\+\-\^\_\(\)\|\&\!\,\=\<\>]/)) {
            this.tokenizeOperator();
        } else if (currChar.match(/[\d\.]/)) {
            this.tokenizeNumber();
        } else {
            this.tokenizeSymbol();
        }
    }
    this._tokenized = true;
};

Tokenizer.prototype.tokenizeOperator = function() {
    var i = 1,
        keys = Token.getMultiChars(),
        s, possibilities;
    
    
    function count(obj) {
        var count = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    }
    
    // FIXME: Object.length is not defined
    while (count(keys) > 0) {
        i++;
        if (this._currPos + i-1 >= this._input.length) {
            break;
        }
        
        s = this._input.substring(this._currPos, this._currPos + i);
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
    
    this._tokens.push(new Token(this._input.substring(this._currPos, this._currPos + i-1)));
    this._currPos += i-1;
};

Tokenizer.prototype.tokenizeNumber = function() {
    var start = this._currPos;
    while (this._currPos < this._input.length && this._input[this._currPos].match(/[\d\.]/)) {
        this._currPos++;
    }
    
    this._tokens.push(new Token(Token.Type.NUMBER, this._input.substring(start, this._currPos)));
};

Tokenizer.prototype.tokenizeSymbol = function() {
    var type = Token.Type.VARIABLE,
        value;
    
    // check for constant
    if (this._input[this._currPos] == '#') {
        type = Token.Type.CONSTANT;
        // skip over '#' character and tokenize constant name
        this._currPos++;
    }
    
    if (this._input[this._currPos].match(/[a-zA-Z]/)) {
        // group letters together
        var start = this._currPos;
        while (this._currPos < this._input.length && this._input[this._currPos].match(/[a-zA-Z\d]/)) {
            this._currPos++;
        }
        
        value = this._input.substring(start, this._currPos);
        
        // TODO: Check if symbol is a reserved keyword:
        // if (is_keyword(value)) type = get_type_from_keyword(value);
    } else {
        // tokenize a single junk character
        type = Token.Type.UNKNOWN;
        value = this._input[this._currPos];
        this._currPos++;
    }
    
    this._tokens.push(new Token(type, value));
};
