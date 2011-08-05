function Token(type, value) {
    if (typeof(type) === 'string') {
        this.type = Token.typeOf(type);
        this.value = value ? value : type;
    } else {
        this.type = type;
        this.value = value ? value : '';
    }
}

Token.Type = {
    UNKNOWN: 0,
    PLUS: 1,
    MINUS: 2,
    TIMES: 3,
    DIVIDE: 4,
    CARET: 5,
    UNDERSCORE: 6,
    LPAREN: 7,
    RPAREN: 8,
    PIPE: 9,
    BANG: 10,
    DOT: 11,
    CROSS: 12,
    COMPOSITION: 13,
    VECTORIZE: 14,
    GREATER_EQUAL: 15,
    GREATER_THAN: 16,
    EQUAL: 17,
    NOT_EQUAL: 18,
    LESS_THAN: 19,
    LESS_EQUAL: 20,
    NUMBER: 21,
    CONSTANT: 22,
    VARIABLE: 23,
};

Token.typeMap = {
    '+': Token.Type.PLUS,
    '-': Token.Type.MINUS,
    '*': Token.Type.TIMES,
    '/': Token.Type.DIVIDE,
    '^': Token.Type.CARET,
    '_': Token.Type.UNDERSCORE,
    '(': Token.Type.LPAREN,
    ')': Token.Type.RPAREN,
    '|': Token.Type.PIPE,
    '!': Token.Type.BANG,
    '&.': Token.Type.DOT,
    '&x': Token.Type.CROSS,
    '&o': Token.Type.COMPOSITION,
    '&v': Token.Type.VECTORIZE,
    '>=': Token.Type.GREATER_EQUAL,
    '>': Token.Type.GREATER_THAN,
    '=': Token.Type.EQUAL,
    '!=': Token.Type.NOT_EQUAL,
    '<>': Token.Type.NOT_EQUAL,
    '<': Token.Type.LESS_THAN,
    '<=': Token.Type.LESS_EQUAL
};

Token.typeOf = function(s) {
    if (undefined !== Token.typeMap[s]) {
        return Token.typeMap[s];
    } else {
        return Token.Type.UNKNOWN;
    }
};

Token.getMultiChars = function() {
    var multiChars = {};
    for (var key in this.typeMap) {
        if (key.length > 1) {
            multiChars[key] = this.typeMap[key];
        }
    }
    return multiChars;
};