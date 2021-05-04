/*
var TextTree = require(`./text-tree.js`)
var Sage = require(`./sage.js`)*/

var lexer = new Lexer()

parser.lexer = {
    lex: () => {
        var tag;
        [tag, this.yytext] = this.tokens[this.pos++] || [``]
        return tag
    },
    setInput: (tokens) => {this.tokens = tokens; return this.pos = 0},
    upcomingInput: () => {return ``}
}
var expt = {
    parse: (input) => {
        this.lastInput = input
        return input.length == 0 ? [] : parser.parse(lexer.tokenize(input))
    },
    render: (ast, fmt) => {
        if (ast.length == 0) {
            return ``
        }
        var o = ``
        switch (fmt) {
            case `latex`: o=latexrender(ast); break;/*
            case `sage`: o=Sage.render(ast); break;
            case `text-tree`: o=TextTree.render(ast); break;*/
            default: throw `Invalid Format: ${fmt}`
        }
        return o
    }
}
console.log(expt.render(expt.parse('x^2'), `latex`))
