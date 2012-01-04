WHITESPACE = /^[\s]+/
NUMBER = /^\d*\.?\d+(?:[Ee][+-]?\d+)?/
IDENTIFIER = /^[a-zA-Z][a-zA-Z0-9]*/
CONSTANT = /^#([a-zA-Z0-9]*)/

RESERVED = (str) ->
    switch str
        when 'false', '&F' then 'TConstant'
        when 'true', '&T' then 'TConstant'
        when 'infinity' then 'TConstant'

        when 'forall' then 'TQForall'
        when 'exists' then 'TQExists'
        when 'unique' then 'TQUnique'
        when '<->', 'iff' then 'TIff'
        when '->', 'implies' then 'TImplies'
        when '&&', 'and' then 'TAnd'
        when '||', 'or' then 'TOr'
        when 'xor' then 'TXor'
        when '~', 'not' then 'TNot'

        when '<' then 'TLess'
        when '<=' then 'TLessEqual'
        when '=', '==' then 'TEqual'
        when '!=', '<>' then 'TNotEqual'
        when '>=' then 'TGreaterEqual'
        when '>' then 'TGreater'
        when 'subset' then 'TSubset'
        when 'propsubset' then 'TPropSubset'
        when 'superset' then 'TSuperset'
        when 'propsuperset' then 'TPropSuperset'
        when 'in' then 'TIn'
        when 'union' then 'TUnion'
        when 'intersect' then 'TIntersect'

        when '+' then 'TPlus'
        when '-' then 'TMinus'
        when '*' then 'TTimes'
        when '/' then 'TDivide'
        when 'mod', '%' then 'TModulus'
        when '^', '**' then 'TPower'
        when '_' then 'TUnderscore'
        when '!' then 'TBang'
        when '\'' then 'TPrime'
        when '@' then 'TCompose'

        when '&Re' then 'TReal'
        when '&Im' then 'TImaginary'
        when '&x' then 'TCross'
        when '&.' then 'TDot'
        when '&pm' then 'TPlusMinus'

        when '(' then 'TLParen'
        when ')' then 'TRParen'
        when '{' then 'TLCurlyBrace'
        when '}' then 'TRCurlyBrace'
        when '[' then 'TLSqBracket'
        when ']' then 'TRSqBracket'
        when '|' then 'TPipe'
        when ':' then 'TColon'
        when ',' then 'TComma'

        else false

exports.Lexer = class Lexer
    tokenize: (@str) ->
        @delims = []
        @tokens = []

        i = 0
        while @chunk = @str.slice i
            throw SyntaxError unless consumed = @spaceToken() or
                    @numLiteral() or
                    @identifierOrKeywordToken() or
                    @constantToken() or
                    @opOrSep(3) or
                    @opOrSep(2) or
                    @opOrSep(1)
            i += consumed
        @tokens

    token: (tag, val) ->
        @tokens.push [tag, val]

    spaceToken: ->
        return 0 unless match = WHITESPACE.exec @chunk
        match[0].length

    numLiteral: ->
        return 0 unless match = NUMBER.exec @chunk
        number = match[0]
        tag = if /[\.e]/i.exec number then 'TFloatLit' else 'TIntLit'
        @token tag, parseFloat number
        number.length

    identifierOrKeywordToken: ->
        return 0 unless match = IDENTIFIER.exec @chunk
        ident = match[0]
        tag = if RESERVED ident then RESERVED ident else 'TIdent'
        @token tag, ident
        ident.length

    constantToken: ->
        return 0 unless match = CONSTANT.exec @chunk
        @token 'TConstant', match[1]
        match[0].length

    opOrSep: (len) ->
        op = @chunk[0..len-1]
        return 0 unless tag = RESERVED op
        @token tag, op
        len