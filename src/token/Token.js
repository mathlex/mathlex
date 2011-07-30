function Token(type, value) {
    this.type = type;
    value = value ? value : type;
    this.value = value;
}

var TokenType = {
    UNKNOWN: '?',
    PLUS: '+',
    MINUS: '-',
    TIMES: '*',
    DIVIDE: '/',
    CARET: '^',
    UNDERSCORE: '_',
    LPAREN: '(',
    RPAREN: ')',
    NUMBER: '1',
    CONSTANT: '#',
    VARIABLE: 'x',
    END_OF_INPUT: ''
};
