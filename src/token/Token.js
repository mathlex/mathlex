function Token(type, value) {
    this.type = value ? type : Token.typeOf(type);
    this.value = value ? value : type;
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
    BANG: 9,
    DOT: 10,
    CROSS: 11,
    COMPOSITION: 12,
    VECTORIZE: 13,
    GREATER_EQUAL: 14,
    GREATER_THAN: 15,
    EQUAL: 16,
    NOT_EQUAL: 17,
    LESS_THAN: 18,
    LESS_EQUAL: 19,
    NUMBER: 20,
    CONSTANT: 21,
    VARIABLE: 22,
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