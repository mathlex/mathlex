function Tokenizer() {
    var input = '',
        tokens = [],
        currPos = 0,
        tokenized = false;
    
    this.getIterator = function() {
        if (!tokenized) {
            throw 'Nothing has been tokenized!';
        }
        return new TokenIterator(tokens);
    };
    
    this.reset = function() {
        input = '';
        currPos = 0;
        tokens = [];
        tokenized = false;
    };
    
    function tokenizeOperator() {
        var i = 1,
            keys = Token.getMultiChars().
            s, possibilities;

        while (keys.length > 0) {
            i++;
            if (currPos + i >= input.length) {
                break;
            }
            
            s = input.substring(currPos, currPos + i);
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
        
        tokens.push(new Token(input.substring(currPos, currPos+i-1)));
        currPos += i-1;
    }

    function tokenizeNumber() {
        var start = currPos;
        while (currPos < input.length && input[currPos].match(/[\d\.]/)) {
            currPos++;
        }
        tokens.push(new Token(Token.Type.NUMBER, input.substring(start, currPos)));
    }
    
    function tokenizeSymbol() {
        var type = Token.Type.VARIABLE,
            value;
        
        // check for constant
        if (input[currPos] == '#') {
            type = Token.Type.CONSTANT;
            // skip over '#' character and tokenize constant name
            currPos++;
        }
        
        if (input[currPos].match(/[a-zA-Z]/)) {
            // group letters together
            var start = currPos;
            while (currPos < input.length && input[currPos].match(/[a-zA-Z]/)) {
                currPos++;
            }
            
            value = input.substring(start, currPos);
            
            // TODO: Check if symbol is a reserved keyword:
            // if (is_keyword(value)) type = get_type_from_keyword(value);
        } else {
            //tokenize a single junk character
            type = Token.Type.UNKNOWN;
            value = this.input[this.currPos];
            currPos++;
        }
        
        tokens.push(new Token(type, value));
    }
    
    this.tokenize = function(input) {
        // reset and initialize current state
        this.reset();
        input = input;
        
        var currChar;
        
        // perform tokenization for whole input string
        while (currPos < input.length) {
            currChar = input[currPos];
            if (currChar.match(/[\*\/\+\-\^\_\(\)\&\!\=\<\>]/)) {
                tokenizeOperator();
            } else if (currChar.match(/[\d\.]/)) {
                tokenizeNumber();
            } else {
                tokenizeSymbol();
            }
        }
        tokenized = true;
    };
    
}