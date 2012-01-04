{Lexer} = require './lexer'
{parser} = require './parser'

Latex = require './render/latex'
TextTree = require './render/text-tree'

lexer = new Lexer

parser.lexer =
    lex: ->
        [tag, @yytext] = @tokens[@pos++] or ['']
        tag
    setInput: (@tokens) -> @pos = 0
    upcomingInput: -> ""

exports.parse = (input) ->
    return [] if input.length == 0
    parser.parse lexer.tokenize input

exports.render = (ast, fmt) ->
    return '' if ast.length == 0
    switch fmt
        when 'latex' then Latex.render ast
        when 'text-tree' then TextTree.render ast
        else throw "Invalid Format: #{fmt}"