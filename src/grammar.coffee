{Parser} = require 'jison'

unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*);\s*\}/

o = (patternString, action, options) ->
    patternString = patternString.replace /\s{2,}/g, ' '
    return [patternString, '$$ = $1;', options] unless action
    action = if match = unwrap.exec action then match[1] else "(#{action}())"
    [patternString, "$$ = #{action};", options]

grammar =
    start: [
        o 'expression'
    ]

    expression: [
        o 'logical'
        o 'logical TEqual logical',     -> ['Equal', $1, $3]
        o 'logical TNotEqual logical',  -> ['NotEqual', $1, $3]
    ]

    expression_list: [
        o 'expression',                         -> [$1]
        o 'expression_list TComma expression',  -> $1.concat [$3]
    ]

    logical: [
        o 'quantification'
        o 'logical TIff logical',                       -> ['Iff', $1, $3]
        o 'logical TImplies logical',                   -> ['Implies', $1, $3]
        o 'logical TOr logical',                        -> ['Or', $1, $3]
        o 'logical TXor logical',                       -> ['Xor', $1, $3]
        o 'logical TAnd logical',                       -> ['And', $1, $3]
        o 'TNot logical',                               -> ['Not', $2]
        o 'TBang logical',                              -> ['Not', $2]
    ]

    logical_list: [
        o 'logical',                        -> [$1]
        o 'logical_list TComma logical',    -> $1.concat [$3]
    ]

    quantification: [
        o 'relation'
        o 'TQForall relation TComma quantification',    -> ['Forall', $2, $4]
        o 'TQExists relation TComma quantification',    -> ['Exists', $2, $4]
        o 'TQUnique relation TComma quantification',    -> ['Unique', $2, $4]
    ]

    relation: [
        o 'algebraic'
        o 'algebraic TLess algebraic',          -> ['Less', $1, $3]
        o 'algebraic TLessEqual algebraic',     -> ['LessEqual', $1, $3]
        o 'algebraic TGreaterEqual algebraic',  -> ['GreaterEqual', $1, $3]
        o 'algebraic TGreater algebraic',       -> ['Greater', $1, $3]
        o 'algebraic TSubset algebraic',        -> ['Subset', $1, $3]
        o 'algebraic TSuperset algebraic',      -> ['Superset', $1, $3]
        o 'algebraic TPropSubset algebraic',    -> ['ProperSubset', $1, $3]
        o 'algebraic TPropSuperset algebraic',  -> ['ProperSuperset', $1, $3]
        o 'algebraic TIn algebraic',            -> ['Inclusion', $1, $3]
    ]

    algebraic: [
        o 'primary'
        o 'algebraic TPlusMinus algebraic',             -> ['PlusMinus', $1, $3]
        o 'algebraic TPlus algebraic',                  -> ['Plus', $1, $3]
        o 'algebraic TMinus algebraic',                 -> ['Minus', $1, $3]
        o 'algebraic TTimes algebraic',                 -> ['Times', $1, $3]
        o 'algebraic TDivide algebraic',                -> ['Divide', $1, $3]
        o 'algebraic TModulus algebraic',               -> ['Modulus', $1, $3]
        o 'algebraic TPower algebraic',                 -> ['Power', $1, $3]
        o 'algebraic TUnderscore algebraic',            -> ['Subscript', $1, $3]
        o 'algebraic TDot algebraic',                   -> ['DotProduct', $1, $3]
        o 'algebraic TCross algebraic',                 -> ['CrossProduct', $1, $3]
        o 'algebraic TCompose algebraic',               -> ['Compose', $1, $3]
        o 'algebraic TUnion algebraic',                 -> ['Union', $1, $3]
        o 'algebraic TIntersect algebraic',             -> ['Intersection', $1, $3]
        o 'TPlus algebraic',                            (-> ['Positive', $2]), prec: 'UnaryPrefix'
        o 'TMinus algebraic',                           (-> ['Negative', $2]), prec: 'UnaryPrefix'
        o 'algebraic TBang',                            -> ['Factorial', $1]
        o 'algebraic TPrime',                           -> ['Prime', $1]
        o 'algebraic TLParen expression_list TRParen',  -> ['Function', $1, $3]
    ]

    algebraic_list: [
        o 'algebraic',                          -> [$1]
        o 'algebraic_list TComma algebraic',    -> $1.concat [$3]
    ]

    primary: [
        o 'TIdent',                                             -> ['Variable', $1]
        o 'TIntLit',                                            -> ['Literal', 'Int', $1]
        o 'TFloatLit',                                          -> ['Literal', 'Float', $1]
        o 'TConstant',                                          -> ['Constant', $1]
        o 'TLess algebraic_list TGreater',                      -> ['Vector', $2]
        o 'TLCurlyBrace set TRCurlyBrace',                      -> $2
        o 'range_start algebraic TComma algebraic range_end',   -> ['Range', $1, $2, $4, $5]
        o 'TPipe algebraic TPipe',                              -> ['AbsVal', $2]
        o 'TLParen expression TRParen',                         -> ['Parentheses', $2]
    ]
    
    range_start: [
        o 'TLSqBracket',    -> true
        o 'TRSqBracket',    -> false
    ]
    
    range_end: [
        o 'TLSqBracket',    -> false
        o 'TRSqBracket',    -> true
    ]

    set: [
        o '',                                   -> ['EmptySet']
        o 'expression_list',                    -> ['Set', $1]
        o 'relation such_that logical_list',    -> ['SetBuilder', $1, $3]
    ]

    such_that: [
        o 'TPipe'
        o 'TColon'
    ]


operators = [
    ['left', 'TBang', 'TPrime']
    ['left', 'TCompose']
    ['right', 'TPower', 'TUnderscore']
    ['left', 'TLParen', 'TRParen']
    ['right', 'UnaryPrefix', 'TNot']
    ['left', 'TCross']
    ['nonassoc', 'TDot']
    ['left', 'TTimes', 'TDivide', 'TModulus']
    ['left', 'TIntersect']
    ['left', 'TUnion']
    ['left', 'TPlusMinus', 'TPlus', 'TMinus']
    ['nonassoc', 'TEqual', 'TNotEqual']
    ['left', 'TAnd']
    ['left', 'TXor']
    ['left', 'TOr']
    ['left', 'TImplies']
    ['nonassoc', 'TIff']
]


tokens = []
for name, alts of grammar
    grammar[name] = for alt in alts
        for token in alt[0].split ' '
            tokens.push token unless grammar[token]
        alt[1] = "return #{alt[1]}" if name is 'start'
        alt

exports.parser = new Parser
    tokens: tokens.join ' '
    bnf: grammar
    operators: operators.reverse()
    startSymbol: 'start'