# 'startsWith' function for String Object
if typeof String.prototype.startsWith != 'function'
    String.prototype.startsWith = (str) -> @indexOf str == 0


WHITESPACE = /^[\s]+/
NUMBER = /^\d*\.?\d+(?:[Ee][+-]?\d+)?/
IDENTIFIER = /^[a-zA-Z][a-zA-Z0-9_]*/
CONSTANT = /^#([a-zA-Z0-9]*)/

# Pipe not included since it can be used as a "such that" operator
# auto match/pair behavior:
#   [0]: automatically add {right} if {left} is found without matching {right}
#   [1]: automatically add {left} if {right} is found without matching {left}
BALANCED_PAIRS = [
    { l: 'TLParen',      r: 'TRParen',       b: [true, true] }
    { l: 'TLSqBracket',  r: 'TRSqBracket',   b: [true, true] }
    { l: 'TLCurlyBrace', r: 'TRCurlyBrace',  b: [true, true] }
    { l: 'TLPipe',       r: 'TRPipe',        b: [true, true] }
    { l: 'TLDoublePipe', r: 'TRDoublePipe',  b: [true, true] }
    { l: 'TLVector',     r: 'TRVector',      b: [true, true] }
    { l: 'TIntegral',    r: 'TDifferential', b: [true, false] }
]

INVERSES = {}
LEFT_DELIMS = []
LEFT_DELIMS_AUTOMATCH = []
RIGHT_DELIMS = []
RIGHT_DELIMS_AUTOMATCH = []

for {l,r,b} in BALANCED_PAIRS
    INVERSES[r] = l
    INVERSES[l] = r
    LEFT_DELIMS.push l
    LEFT_DELIMS_AUTOMATCH.push l if b[0]
    RIGHT_DELIMS.push r
    RIGHT_DELIMS_AUTOMATCH.push r if b[1]

KEYWORD = (str) ->
    switch str.toLowerCase()
        when 'false', 'true' then 'TConstant'
        when 'int', 'integral' then 'TIntegral'
        when 'lim', 'limit' then 'TLimit'
        when 'sum' then 'TSum'
        when 'prod', 'product' then 'TProduct'
        when 'infty', 'infin', 'infinity', 'oo' then 'TInfinity'
        when 'forall' then 'TQForall'
        when 'exists' then 'TQExists'
        when 'unique' then 'TQUnique'
        when 'iff' then 'TIff'
        when 'onlyif', 'implies' then 'TImplies'
        when 'if', 'impliedby', 'when', 'whenever' then 'TIf'
        when 'then' then 'TThen'
        when 'and' then 'TAnd'
        when 'or' then 'TOr'
        when 'xor' then 'TXor'
        when 'not' then 'TNot'
        when 'equiv', 'equivalent' then 'TEquiv'
        when 'nequiv', 'nequivalent' then 'TNotEquiv'
        when 'as' then 'TRatioEqual'
        when 'congruent' then 'TCongruent'
        when 'sim', 'similar' then 'TSimilar'
        when 'para', 'parallel' then 'TParallel'
        when 'perp', 'perpendicular' then 'TPerpendicular'
        when 'subset' then 'TSubset'
        when 'psubset', 'propsubset', 'propersubset' then 'TPropSubset'
        when 'supset', 'superset' then 'TSuperset'
        when 'psuperset', 'psupset', 'propsuperset', 'propsupset', 'propersuperset', 'propersupset' then 'TPropSuperset'
        when 'in' then 'TIn'
        when 'divides' then 'TDivides'
        when 'ndivides', 'notdivides', 'ndivide', 'notdivide' then 'TNotDivides'
        when 'union' then 'TUnion'
        when 'intersect' then 'TIntersect'
        when 'minus' then 'TSetDiff'
        when 'choose' then 'TChoose'
        when 'mod' then 'TModulus'
        else 'TIdent'

SYMBOLS = [
    { symbol: '<->', token: 'TIff' }
    { symbol: '->', token: 'TImplies' }
    { symbol: '<-', token: 'TIf' }
    { symbol: '&&', token: 'TAnd' }
    { symbol: '||', token: 'TOr' }
    { symbol: '~', token: 'TTilde' }
    { symbol: '<', token: 'TLess' }
    { symbol: '<=', token: 'TLessEqual' }
    { symbol: '===', token: 'TEquiv' }
    { symbol: '!==', token: 'TNotEquiv' }
    { symbol: '/==', token: 'TNotEquiv' }
    { symbol: '~=', token: 'TCongruent' }
    { symbol: '=', token: 'TEqual' }
    { symbol: '==', token: 'TEqual' }
    { symbol: '!=', token: 'TNotEqual' }
    { symbol: '/=', token: 'TNotEqual' }
    { symbol: '<>', token: 'TNotEqual' }
    { symbol: '::', token: 'TRatioEqual' }
    { symbol: '>=', token: 'TGreaterEqual' }
    { symbol: '>', token: 'TGreater' }
    { symbol: '|', token: 'TPipe' }
    { symbol: '~|', token: 'TNotDivides' }
    { symbol: '/|', token: 'TNotDivides' }
    { symbol: '\\', token: 'TSetDiff' }
    { symbol: '+', token: 'TPlus' }
    { symbol: '-', token: 'TMinus' }
    { symbol: '*', token: 'TTimes' }
    { symbol: '/', token: 'TDivide' }
    { symbol: '&/', token: 'TSlash' }
    { symbol: '&:', token: 'TRatio' }
    { symbol: '%', token: 'TModulus' }
    { symbol: '^', token: 'TExponent' }
    { symbol: '**', token: 'TExponent' }
    { symbol: '&^', token: 'TSuperscript' }
    { symbol: '&_', token: 'TSubscript' }
    { symbol: '!', token: 'TBang' }
    { symbol: '\'', token: 'TPrime' }
    { symbol: '.', token: 'TDotDiff' }
    { symbol: '@', token: 'TCompose' }
    { symbol: '@@', token: 'TSelfCompose' }
    { symbol: '&Re', token: 'TReal' }
    { symbol: '&Im', token: 'TImaginary' }
    { symbol: '&pd', token: 'TPartial' }
    { symbol: '/&pd', token: 'TDivPartial' }
    { symbol: '&d', token: 'TDifferential' }
    { symbol: '/&d', token: 'TDivDiff' }
    { symbol: '&D', token: 'TChangeDelta' }
    { symbol: '&del', token: 'TGradient' }
    { symbol: '&grad', token: 'TGradient' }
    { symbol: '&del.', token: 'TDivergence' }
    { symbol: '&div', token: 'TDivergence' }
    { symbol: '&delx', token: 'TCurl' }
    { symbol: '&curl', token: 'TCurl' }
    { symbol: '&x', token: 'TCross' }
    { symbol: '&.', token: 'TDot' }
    { symbol: '&w', token: 'TWedge' }
    { symbol: '&ox', token: 'TTensor' }
    { symbol: '&o+', token: 'TDirectSum' }
    { symbol: '&*', token: 'TCartesianProduct' }
    { symbol: '&v', token: 'TVectorizer' }
    { symbol: '&u', token: 'TUnitVectorizer' }
    { symbol: '&pm', token: 'TPlusMinus' }
    { symbol: '+/-', token: 'TPlusMinus' }
    { symbol: '&mp', token: 'TMinusPlus' }
    { symbol: '-/+', token: 'TMinusPlus' }
    { symbol: '&Union', token: 'TUnion' }
    { symbol: '&Intersect', token: 'TIntersect' }
    { symbol: '(', token: 'TLParen' }
    { symbol: ')', token: 'TRParen' }
    { symbol: '{', token: 'TLCurlyBrace' }
    { symbol: '}', token: 'TRCurlyBrace' }
    { symbol: '[', token: 'TLSqBracket' }
    { symbol: ']', token: 'TRSqBracket' }
    { symbol: '[:', token: 'TLRangeInclusive' }
    { symbol: ':]', token: 'TRRangeInclusive' }
    { symbol: '(:', token: 'TLRangeExclusive' }
    { symbol: ':)', token: 'TRRangeExclusive' }
    { symbol: '|:', token: 'TLPipe' }
    { symbol: ':|', token: 'TRPipe' }
    { symbol: '||:', token: 'TLDoublePipe' }
    { symbol: ':||', token: 'TRDoublePipe' }
    { symbol: '<:', token: 'TLVector' }
    { symbol: ':>', token: 'TRVector' }
    { symbol: ':', token: 'TSuchThat' }
    { symbol: ';', token: 'TSemicolon' }
    { symbol: ',', token: 'TComma' }
]

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
                    @opOrSep()
            i += consumed

        @token tok, "auto-ins1-#{tok}" while tok = @delims.pop()

        @tokens

    token: (tag, val) ->
        @delims.push INVERSES[tag] if tag in LEFT_DELIMS_AUTOMATCH
        @pair tag if tag in RIGHT_DELIMS
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
        tag = KEYWORD ident
        @token tag, ident
        ident.length

    constantToken: ->
        return 0 unless match = CONSTANT.exec @chunk
        @token 'TConstant', match[1]
        match[0].length

    opOrSep: ->
        for x in SYMBOLS
            continue if @chunk[0...x.symbol.length] != x.symbol
            @token x.token, x.symbol
            return x.symbol.length


    pair: (tag) ->
        if tag not in @delims and tag in RIGHT_DELIMS_AUTOMATCH
            inverse = INVERSES[tag]
            @tokens.unshift [inverse, "auto-ins2-#{inverse}"]
            @delims.unshift tag
        while @delims.length > 0 and tag isnt expected = @delims.pop()
            @token expected, "auto-ins3-#{expected}"
