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

    opt_expression: [
        o 'expression'
        o '',           -> ['Empty']
    ]


    expression: [
        o 'logical'
        o 'logical TEquiv logical',     -> ['Equivalent', $1, $3]
        o 'logical TNotEquiv logical',  -> ['NotEquivalent', $1, $3]
    ]

    expression_list: [
        o 'expression',                         -> [$1]
        o 'expression_list TComma expression',  -> $1.concat [$3]
    ]

    logical: [
        o 'quantification'
        o 'logical TIff logical',                       -> ['Iff', $1, $3]
        o 'logical TImplies logical',                   -> ['Implies', $1, $3, false]
        o 'logical TIf logical',                        -> ['Implies', $3, $1, true]
        o 'TIf logical TThen logical',                  -> ['Implies', $2, $4, false]
        o 'logical TOr logical',                        -> ['Or', $1, $3]
        o 'logical TXor logical',                       -> ['Xor', $1, $3]
        o 'logical TAnd logical',                       -> ['And', $1, $3]
        o 'TNot logical',                               -> ['Not', $2]
        o 'TTilde logical',                             (-> ['Not', $2]), prec: 'TNot'
        o 'TBang logical',                              -> ['Not', $2]
    ]

    logical_list: [
        o 'logical',                        -> [$1]
        o 'logical_list TComma logical',    -> $1.concat [$3]
    ]

    quantification: [
        o 'relation'
        o 'TQForall relation TImplies quantification',  -> ['Forall', $2, $4]
        o 'TQForall relation TSuchThat relation TImplies quantification',   -> ['Forall', $2, ['Implies', $4, $6, false]]
        o 'TQExists relation TSuchThat quantification',  -> ['Exists', $2, $4]
        o 'TQUnique relation TSuchThat quantification',  -> ['Unique', $2, $4]
    ]

    relation: [
        o 'equality'
        o 'inequality'
        o 'ratio'
    ]

    equality: [
        o 'algebraic TEqual algebraic',         -> ['Equal', $1, $3]
        o 'ratio TRatioEqual ratio',            -> ['RatioEqual', $1, $3]
    ]

    inequality: [
        o 'algebraic TNotEqual algebraic',      -> ['NotEqual', $1, $3]
        o 'algebraic TCongruent algebraic',     -> ['Congruent', $1, $3]
        o 'algebraic TSimilar algebraic',       -> ['Similar', $1, $3]
        o 'algebraic TTilde algebraic',         -> ['Similar', $1, $3]
        o 'algebraic TParallel algebraic',      -> ['Parallel', $1, $3]
        o 'algebraic TPerpendicular algebraic', -> ['Perpendicular', $1, $3]
        o 'algebraic TLess algebraic',          -> ['Less', $1, $3]
        o 'algebraic TLessEqual algebraic',     -> ['LessEqual', $1, $3]
        o 'algebraic TGreaterEqual algebraic',  -> ['GreaterEqual', $1, $3]
        o 'algebraic TGreater algebraic',       -> ['Greater', $1, $3]
        o 'algebraic TSubset algebraic',        -> ['Subset', $1, $3]
        o 'algebraic TSuperset algebraic',      -> ['Superset', $1, $3]
        o 'algebraic TPropSubset algebraic',    -> ['ProperSubset', $1, $3]
        o 'algebraic TPropSuperset algebraic',  -> ['ProperSuperset', $1, $3]
        o 'algebraic TIn algebraic',            -> ['Inclusion', $1, $3]
        o 'algebraic TDivides algebraic',       -> ['Divides', $1, $3]
        o 'algebraic TPipe algebraic',          -> ['Divides', $1, $3]
        o 'algebraic TNotDivides algebraic',    -> ['NotDivides', $1, $3]
    ]

    ratio: [
        o 'algebraic'
        o 'algebraic TRatio algebraic',         -> ['Ratio', $1, $3]
    ]

    opt_algebraic: [
        o 'algebraic'
        o '',           -> ['Empty']
    ]

    algebraic: [
        o 'primary'
        o 'algebraic TPlusMinus algebraic',             -> ['PlusMinus', $1, $3]
        o 'algebraic TMinusPlus algebraic',             -> ['MinusPlus', $1, $3]
        o 'algebraic TPlus algebraic',                  -> ['Plus', $1, $3]
        o 'algebraic TMinus algebraic',                 -> ['Minus', $1, $3]
        o 'algebraic TTimes algebraic',                 -> ['Times', $1, $3]
        o 'algebraic TDivide algebraic', ->
            # return ['Function', ['Variable', 'diff'], [$1[1], $3[1]]] if $1[0] == 'Differential' and $3[0] == 'Differential'
            # return ['Function', ['Variable', 'pdiff'], [$1[1], $3[1]]] if $1[0] == 'Partial' and $3[0] == 'Partial'
            ['Divide', $1, $3, true]
        o 'algebraic TSlash algebraic', ->
            # return ['Function', ['Variable', 'diff'], [$1[1], $3[1]]] if $1[0] == 'Differential' and $3[0] == 'Differential'
            # return ['Function', ['Variable', 'pdiff'], [$1[1], $3[1]]] if $1[0] == 'Partial' and $3[0] == 'Partial'
            ['Divide', $1, $3, false]
        o 'algebraic TModulus algebraic',               -> ['Modulus', $1, $3]
        o 'algebraic TExponent algebraic',              -> ['Exponent', $1, $3]
        o 'algebraic TSuperscript algebraic',           -> ['Superscript', $1, $3]
        o 'algebraic TSubscript algebraic',             -> ['Subscript', $1, $3]
        o 'algebraic TDot algebraic',                   -> ['DotProduct', $1, $3]
        o 'algebraic TCross algebraic',                 -> ['CrossProduct', $1, $3]
        o 'algebraic TWedge algebraic',                 -> ['WedgeProduct', $1, $3]
        o 'algebraic TTensor algebraic',                -> ['TensorProduct', $1, $3]
        o 'algebraic TCompose algebraic',               -> ['Compose', $1, $3]
        o 'algebraic TUnion algebraic',                 -> ['Union', $1, $3]
        o 'algebraic TIntersect algebraic',             -> ['Intersection', $1, $3]
        o 'algebraic TSetDiff algebraic',               -> ['SetDiff', $1, $3]
        o 'algebraic TDirectSum algebraic',             -> ['DirectSum', $1, $3]
        o 'algebraic TCartesianProduct algebraic',      -> ['CartesianProduct', $1, $3]
        o 'TPlusMinus algebraic',                       (-> ['PosNeg', $2]), prec: 'UnaryPrefix'
        o 'TMinusPlus algebraic',                       (-> ['NegPos', $2]), prec: 'UnaryPrefix'
        o 'TPlus algebraic',                            (-> ['Positive', $2]), prec: 'UnaryPrefix'
        o 'TMinus algebraic',                           (-> ['Negative', $2]), prec: 'UnaryPrefix'
        o 'TVectorizer algebraic',                      -> ['Vectorizer', $2]
        o 'TUnitVectorizer algebraic',                  -> ['UnitVectorizer', $2]
        o 'TPartial algebraic',                         -> ['Partial', $2]
        o 'TPartial algebraic TDivPartial algebraic',   -> ['Function', ['Variable', 'pdiff'], [$2, $4]]
        o 'TDifferential algebraic',                    -> ['Differential', $2]
        o 'TDifferential algebraic TDivDiff algebraic', -> ['Function', ['Variable', 'diff'], [$2, $4]]
        o 'TChangeDelta algebraic',                     -> ['Change', $2]
        o 'TGradient algebraic',                        -> ['Gradient', $2]
        o 'TDivergence algebraic',                      -> ['Divergence', $2]
        o 'TCurl algebraic',                            -> ['Curl', $2]
        o 'TSum range_bounds algebraic',                -> ['Function', ['Variable', 'sum'], [$3].concat($2)]
        o 'TProduct range_bounds algebraic',            -> ['Function', ['Variable', 'prod'], [$3].concat($2)]
        o 'TLimit TSubscript TLParen primary TImplies algebraic TRParen algebraic', -> ['Function', ['Variable', 'lim'], [$8, $4, $6]]
        o 'algebraic TBang',                            -> ['Factorial', $1]
        o 'algebraic TPrime',                           -> ['Prime', $1]
        o 'algebraic TDotDiff',                         -> ['DotDiff', $1]
        o 'algebraic TLParen expression_list TRParen',  -> ['Function', $1, $3]
    ]

    range_bounds: [
        o 'TSubscript TLParen primary TEqual algebraic TRParen TSuperscript primary',  -> [$3, $5, $8]
        o 'TSuperscript primary TSubscript TLParen primary TEqual expression TRParen',  -> [$5, $7, $2]
        o 'TSubscript TLParen inequality TRParen',                                      -> [$3]
    ]

    algebraic_list: [
        o 'algebraic',                          -> [$1]
        o 'algebraic_list TComma algebraic',    -> $1.concat [$3]
    ]

    primary: [
        o 'TIdent',                                                 -> ['Variable', $1]
        o 'TIntLit',                                                -> ['Literal', 'Int', $1]
        o 'TFloatLit',                                              -> ['Literal', 'Float', $1]
        o 'TConstant',                                              -> ['Constant', $1]
        o 'TLess algebraic_list TGreater',                          -> ['Vector', $2]
        o 'TLVector algebraic_list TRVector',                       -> ['Vector', $2]
        o 'TLess algebraic TPipe',                                  -> ['Bra', $2]
        o 'TPipe algebraic TGreater',                               -> ['Ket', $2]
        o 'TLess algebraic TOr algebraic TGreater',                 -> ['BraKet', $2, $4]
        o 'TLVector algebraic TPipe algebraic TRVector',            -> ['BraKet', $2, $4]
        o 'TLCurlyBrace set TRCurlyBrace',                          -> $2
        o 'TLSqBracket list TRSqBracket',                           -> ['List', $2]
        o 'range_start algebraic TComma algebraic range_end',       -> ['Range', $1, $2, $4, $5]
        o 'TPipe algebraic TPipe',                                  -> ['AbsVal', $2]
        o 'TLPipe opt_algebraic TRPipe',                            -> ['AbsVal', $2]
        o 'TOr algebraic TOr',                                      -> ['Norm', $2]
        o 'TLDoublePipe opt_algebraic TRDoublePipe',                -> ['Norm', $2]
        o 'TLParen opt_expression TRParen',                         -> ['Parentheses', $2]
        o 'TIntegral int_bounds algebraic TDifferential algebraic', -> ['Function', ['Variable', 'int'], [$2, $5]]
        # o '',                                                       -> ['Empty']
    ]

    int_bounds: [
        o 'TSubscript primary TSuperscript primary',    -> {lo: $2, hi: $4}
        o 'TSuperscript primary TSubscript primary',    -> {hi: $2, lo: $4}
        o 'TSubscript primary',                         -> {lo: $2}
        o 'TSuperscript primary',                       -> {hi: $2}
        o '',                                           -> {}
    ]

    range_start: [
        o 'TLRangeInclusive',   -> true
        o 'TLRangeExclusive',   -> false
    ]

    range_end: [
        o 'TRRangeInclusive',   -> true
        o 'TRRangeExclusive',   -> false
    ]

    set: [
        o '',                                   -> ['EmptySet']
        o 'expression_list',                    -> ['Set', $1]
        o 'relation TSuchThat logical_list',    -> ['SetBuilder', $1, $3]
    ]

    list: [
        o 'expression_list'
        o '',   -> [['Empty']]
    ]


operators = [
    ['left', 'TSubscript', 'TSuperscript']
    ['left', 'TBang', 'TPrime', 'TDotDiff']
    ['right', 'TExponent']
    ['left', 'TCompose']
    ['left', 'TLParen', 'TRParen']
    ['non', 'TDivDiff', 'TDivPartial']
    ['right', 'TPartial', 'TDifferential', 'TChangeDelta']
    ['right', 'UnaryPrefix', 'TNot', 'TVectorizer', 'TUnitVectorizer', 'TGradient', 'TDivergence', 'TCurl']
    ['left', 'TWedge']
    ['left', 'TCross', 'TTensor', 'TCartesianProduct']
    ['nonassoc', 'TDot']
    ['left', 'TTimes', 'TSlash', 'TDivide', 'TModulus']
    ['right', 'TSum', 'TProduct', 'TLimit']
    ['left', 'TIntersect']
    ['left', 'TUnion']
    ['left', 'TDirectSum']
    ['left', 'TSetDiff']
    ['left', 'TPlusMinus', 'TMinusPlus', 'TPlus', 'TMinus']
    ['nonassoc', 'TEqual', 'TNotEqual', 'TTilde', 'TSimilar', 'TCongruent']
    ['left', 'TAnd']
    ['left', 'TXor']
    ['left', 'TOr']
    ['left', 'TImplies', 'TIf']
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
