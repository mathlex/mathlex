RES_EMPTY = 'Empty'
RES_CONSUMED = 'Consumed'

REPLY_ERROR = 'Error'
REPLY_OK = 'Ok'

exports.Parser = class Parser
    parse: (input) -> @expression() input

    return: (val) -> (inp) -> [RES_EMPTY, REPLY_OK, val, inp]
    bind: (p, f) -> (inp) ->
        reply = p inp
        return reply if reply[1] == REPLY_ERROR

        reply2 = (f reply[2]) reply[3]
        reply2[0] = RES_CONSUMED if reply[0] == RES_CONSUMED
        reply2

    bind_: (p, q) -> @bind p, (_) => q

    choice: (p, q) -> (inp) ->
        reply1 = p inp
        reply2 = q inp

        switch reply1[0]
            when RES_EMPTY then switch reply1[1]
                when REPLY_ERROR then reply2
                when REPLY_OK then reply1
            when RES_CONSUMED then switch reply1[1]
                when REPLY_ERROR
                    reply2[0] = RES_CONSUMED
                    reply2
                when REPLY_OK then switch reply2[0]
                    when RES_CONSUMED
                        # return the parsed result that consumed more input
                        if reply2[3].length < reply1[3].length then reply2 else reply1
                    else reply1

    choices: (p, qs...) ->
        return p if qs.length == 0
        @choice p, @choices qs...

    many: (p) -> @choice (@many1 p), @return []

    many1: (p) ->
        @bind p, (v) =>
            @bind (@many p), (vs) =>
                @return [v].concat vs

    sat: (pred) -> (inp) ->
        return [RES_EMPTY, REPLY_ERROR, null, null] if inp.length == 0
        if pred inp[0]
            [RES_CONSUMED, REPLY_OK, inp[0], inp.slice 1]
        else
            [RES_EMPTY, REPLY_ERROR, null, null]

    aToken: (tok) -> @sat (t) -> t[0] == tok

    commaSep1: (p) ->
        @bind p, (v) =>
            commap = @bind_ (@aToken 'TComma'), p
            @bind (@many commap), (vs) =>
                @return [v].concat vs

    commaSep: (p) -> @choice (@commaSep1 p), @return []

    identifier: ->
        @aToken 'TIdent'

    paren: (p) ->
        @bind_ (@aToken 'TLParen'), @bind p, (expr) =>
            @bind_ (@aToken 'TRParen'), @return ['ASTParentheses', expr]

    variable: (tys) ->
        @bind @identifier(), (tok) =>
            @return ['ASTVariable', tok[1], tys]

    constant: ->
        @bind (@aToken 'TConstant'), (tok) => @return ['ASTConstant', tok[1]]

    expression: ->
        @choices @algebraicExpr(), @logicalExpr(), @setExpr()


    # BEGIN: Logical Expressions

    logicalExpr: ->
        opCond = (lhs) =>
            p = @bind (@aToken 'TIff'), (op) =>
                @bind @conditional(), (rhs) =>
                    @return ['ASTIff', lhs, rhs]
            @choice p, @return lhs
        @bind @conditional(), (lhs) => opCond lhs

    conditional: ->
        opDisj = (lhs) =>
            p = @bind (@aToken 'TIf'), (op) =>
                @bind @disjunction(), (rhs) =>
                    @return ['ASTIf', lhs, rhs]
            @choice p, @return lhs
        @bind @disjunction(), (lhs) => opDisj lhs

    disjunction: ->
        opExcl = (lhs) =>
            p = @bind (@aToken 'TOr'), (op) =>
                @bind @exclusion(), (rhs) =>
                    opExcl ['ASTOr', lhs, rhs]
            @choice p, @return lhs
        @bind @exclusion(), (lhs) => opExcl lhs

    exclusion: ->
        opConj = (lhs) =>
            p = @bind (@aToken 'TXor'), (op) =>
                @bind @conjunction(), (rhs) =>
                    opConj ['ASTXor', lhs, rhs]
            @choice p, @return lhs
        @bind @conjunction(), (lhs) => opConj lhs

    conjunction: ->
        opNeg = (lhs) =>
            p = @bind (@aToken 'TAnd'), (op) =>
                @bind @negation(), (rhs) =>
                    opNeg ['ASTAnd', lhs, rhs]
            @choice p, @return lhs
        @bind @negation(), (lhs) => opNeg lhs

    negation: ->
        p = @choices (@aToken 'TNot'), (@aToken 'TBang'), @return null
        @bind p, (op) =>
            @bind @proposition(), (val) =>
                @return if op is null then val else ['ASTNot', val]

    proposition: ->
        p = @bind (@many @quantification()), (qs) =>
            @bind (@paren @logicalExpr()), (expr) =>
                @return if qs.length == 0 then expr else ['ASTProp', qs, expr]
        @choices p, @boolean(), @relation(), @functionExpr(), @variable ['TyBool']

    quantification: ->
        p = @choices (@aToken 'TQForall'), (@aToken 'TQExists'), (@aToken 'TQUnique')
        @bind p, (quantifier) =>
            @bind (@choice @relation(), @variable 'TyAny'), (expr) =>
                tag = switch quantifier[0]
                    when 'TQForall' then 'ASTForall'
                    when 'TQExists' then 'ASTExists'
                    when 'TQUnique' then 'ASTUnique'
                @return [tag, expr]

    boolean: ->
        isBoolLit = (tok) ->
            switch tok[0]
                when 'TTrue', 'TFalse' then true
                when 'TIntLit' then (tok[1] == 0 or tok[1] == 1)
                else false
        @bind (@sat isBoolLit), (tok) =>
            val = (tok[0] == 'TIntLit' and tok[1] == 1) or tok[0] == 'TTrue'
            @return ['ASTLiteral', 'VBool', val]

    relation: ->
        @choices @algebraicRelation(), @setRelation(), @inclusionRelation()

    algebraicRelation: ->
        p = @choices (@aToken 'TLess'), (@aToken 'TLessEqual'), (@aToken 'TEqual'), (@aToken 'TNotEqual'), (@aToken 'TGreaterEqual'), (@aToken 'TGreater')

        @bind @algebraicExpr(), (lhs) =>
            @bind p, (op) =>
                @bind @algebraicExpr(), (rhs) =>
                    tag = switch op[0]
                        when 'TLess' then 'ASTLess'
                        when 'TLessEqual' then 'ASTLessEqual'
                        when 'TEqual' then 'ASTEqual'
                        when 'TNotEqual' then 'ASTNotEqual'
                        when 'TGreaterEqual' then 'ASTGreaterEqual'
                        when 'TGreater' then 'ASTGreater'
                    @return [tag, lhs, rhs]

    setRelation: ->
        p = @choices (@aToken 'TSubset'), (@aToken 'TSuperset'), (@aToken 'TPropSubset'), (@aToken 'TPropSuperset'), (@aToken 'TEqual'), (@aToken 'TNotEqual')

        @bind @setExpr(), (lhs) =>
            @bind p, (op) =>
                @bind @setExpr(), (rhs) =>
                    tag = switch op[0]
                        when 'TSubset' then 'ASTSubset'
                        when 'TSuperset' then 'ASTSuperset'
                        when 'TPropSubset' then 'ASTProperSubset'
                        when 'TPropSuperset' then 'ASTProperSuperset'
                        when 'TEqual' then 'ASTEqual'
                        when 'TNotEqual' then 'ASTNotEqual'
                    @return [tag, lhs, rhs]

    inclusionRelation: ->
        @bind (@choice @algebraicExpr(), @setExpr()), (lhs) =>
            @bind (@aToken 'TIn'), (op) =>
                @bind @setExpr(), (rhs) =>
                    @return ['ASTInclusion', lhs, rhs]

    # END: Logical Expressions


    # BEGIN: Algebraic Expressions

    algebraicExpr: ->
        opTerm = (lhs) =>
            p = @bind (@choice (@aToken 'TPlus'), (@aToken 'TMinus')), (op) =>
                @bind @term(), (rhs) =>
                    tag = switch op[0]
                        when 'TPlus' then 'ASTPlus'
                        when 'TMinus' then 'ASTMinus'
                    opTerm [tag, lhs, rhs]
            @choice p, @return lhs
        @bind @term(), (lhs) => opTerm lhs

    term: ->
        opPrefix = (lhs) =>
            p = @bind (@choices (@aToken 'TTimes'), (@aToken 'TDivide'), (@aToken 'TModulus')), (op) =>
                @bind @prefix(), (rhs) =>
                    tag = switch op[0]
                        when 'TTimes' then 'ASTTimes'
                        when 'TDivide' then 'ASTDivide'
                        when 'TModulus' then 'ASTModulus'
                    opPrefix [tag, lhs, rhs]
            @choice p, @return lhs
        @bind @prefix(), (lhs) => opPrefix lhs

    prefix: ->
        p = @choices (@aToken 'TMinus'), (@aToken 'TPlus'), @return null
        @bind p, (op) =>
            @bind @factor(), (val) =>
                if (op is null)
                    @return val
                else
                    tag = switch op[0]
                        when 'TMinus' then 'ASTNegative'
                        when 'TPlus' then 'ASTPositive'
                    @return [tag, val]
    factor: ->
        opPrefix = (lhs) =>
            p = @bind (@choice (@aToken 'TPower'), (@aToken 'TUnderscore')), (op) =>
                @bind @prefix(), (rhs) =>
                    tag = switch op[0]
                        when 'TPower' then 'ASTPower'
                        when 'TUnderscore' then 'ASTSubscript'
                    opPrefix [tag, lhs, rhs]
            @choice p, @return lhs
        @bind @suffix(), (lhs) => opPrefix lhs

    suffix: ->
        opSuffix = (val) =>
            p = @bind (@aToken 'TBang'), (op) =>
                opSuffix ['ASTFactorial', val]
            @choice p, @return val
        @bind @primary(), (val) => opSuffix val

    primary: ->
        @choices (@paren @algebraicExpr()), @absVal(), @functionExpr(), @vectorExpr(), @number(), (@variable ['TyInt', 'TyFloat']), @constant()

    absVal: ->
        @bind_ (@aToken 'TPipe'), @bind @algebraicExpr(), (expr) =>
            @bind_ (@aToken 'TPipe'), @return ['ASTAbsVal', expr]

    number: ->
        @choice @floatLit(), @intLit()

    floatLit: ->
        @bind (@aToken 'TFloatLit'), (tok) =>
            @return ['ASTLiteral', 'VFloat', tok[1]]

    intLit: ->
        @bind (@aToken 'TIntLit'), (tok) =>
            @return ['ASTLiteral', 'VInt', tok[1]]

    # END: Algebraic Expressions


    # BEGIN: Vector Expressions

    vectorExpr: ->
        @dotProduct()

    dotProduct: ->
        @bind @crossProduct(), (lhs) =>
            @bind (@choice (@aToken 'TDot'), (@return null)), (op) =>
                if op is null
                    @return lhs
                else
                    @bind @crossProduct(), (rhs) =>
                        @return ['ASTDotProduct', lhs, rhs]
    crossProduct: ->
        @bind @vector(), (lhs) =>
            @bind (@choice (@aToken 'TCross'), (@return null)), (op) =>
                if op is null
                    @return lhs
                else
                    @bind @vector(), (rhs) =>
                        @return ['ASTCrossProduct', lhs, rhs]

    vector: ->
        p = @bind_ (@aToken 'TLess'), @bind (@commaSep @algebraicExpr()), (components) =>
            @bind_ (@aToken 'TGreater'), @return ['ASTVector', components]
        @choice p, @constant()

    # END: Vector Expressions


    # BEGIN: Function Expressions

    functionExpr: ->
        @bind @funcCompose(), (f) =>
            @bind_ (@aToken 'TLParen'), @bind (@commaSep @expression()), (args) =>
                @bind_ (@aToken 'TRParen'), @return ['ASTFuncApp', f, args]

    funcSuffix: ->
        opSuffix = (base) =>
            p = @bind (@aToken 'TPrime'), (op) =>
                opSuffix ['ASTFuncPrime', base]
            @choice p, @return base
        @bind (@choice (@paren @fincSumDiff()), @funcName()), (base) => opSuffix base

    funcName: ->
        @bind @identifier(), (ident) =>
            @return ['ASTFunction', ident[1]]

    funcSumDiff: ->
        opFuncTerm = (lhs) =>
            p = @bind (@choice (@aToken 'TPlus'), (@aToken 'TMinus')), (op) =>
                @bind @funcTerm(), (rhs) =>
                    tag = switch op[0]
                        when 'TPlus' then 'ASTPlus'
                        when 'TMinus' then 'ASTMinus'
                    opFuncTerm [tag, lhs, rhs]
            @choice p, @return lhs
        @bind @funcTerm(), (lhs) => opFuncTerm lhs

    funcTerm: ->
        opFuncCompose = (lhs) =>
            p = @bind (@choice (@aToken 'TTimes'), (@aToken 'TDivide')), (op) =>
                @bind @funcCompose(), (rhs) =>
                    tag = switch op[0]
                        when 'TTimes' then 'ASTFuncProduct'
                        when 'TDivide' then 'ASTFuncQuotient'
                    opFuncCompose [tag, lhs, rhs]
            @choice p, @return lhs
        @bind @funcCompose(), (lhs) => opFuncCompose lhs

    funcCompose: ->
        opFuncPrefix = (lhs) =>
            p = @bind (@aToken 'TCompose'), (op) =>
                @bind @funcPrefix(), (rhs) =>
                    opFuncPrefix ['ASTCompose', lhs, rhs]
            @choice p, @return lhs
        @bind @funcPrefix(), (lhs) => opFuncPrefix lhs

    funcPrefix: ->
        @bind (@choices (@aToken 'TPlus'), (@aToken 'TMinus'), @return null), (op) =>
            @bind @funcFactor(), (val) =>
                if op is null
                    @return val
                else
                    tag = switch op[0]
                        when 'TPlus' then 'ASTPositive'
                        when 'TMinus' then 'ASTNegative'
                    @return [tag, val]

    funcFactor: ->
        opFuncPrefix = (lhs) =>
            p = @bind (@aToken 'TPower'), (op) =>
                @bind (@choice @funcPrefix(), @number()), (rhs) =>
                    opFuncPrefix ['ASTPower', lhs, rhs]
            @choice p, @return lhs
        @bind @funcSuffix(), (lhs) => opFuncPrefix lhs

    # END: Function Expressions


    # BEGIN: Set Expressions

    setExpr: ->
        opUnion = (lhs) =>
            p = @bind (@aToken 'TMinus'), (op) =>
                @bind @union(), (rhs) =>
                    opUnion ['ASTMinus', lhs, rhs]
            @choice p, @return lhs
        @bind @union(), (lhs) => opUnion lhs

    union: ->
        opIntersect = (lhs) =>
            p = @bind (@aToken 'TUnion'), (op) =>
                @bind @intersection(), (rhs) =>
                    opIntersect ['ASTUnion', lhs, rhs]
            @choice p, @return lhs
        @bind @intersection(), (lhs) => opIntersect lhs

    intersection: ->
        opComplement = (lhs) =>
            p = @bind (@aToken 'TIntersect'), (op) =>
                @bind @complement(), (rhs) =>
                    opComplement ['ASTIntersection', lhs, rhs]
            @choice p, @return lhs
        @bind @complement(), (lhs) => opComplement lhs

    complement: ->
        opPrime = (val) =>
            p = @bind (@aToken 'TPrime'), (op) =>
                opComplement ['ASTComplement', val]
            @choice p, @return val
        @bind @setPrimary(), (val) => opPrime val

    setPrimary: ->
        @choices (@paren @setExpr()), @setLiteral(), @setBuilder(), @setRange(), @functionExpr(), @variable ['TySet:TyAny'], @constant()

    setLiteral: ->
        @bind (@aToken 'TLCurlyBrace'), (start) =>
            p = @choice (@commaSep1 @algebraicExpr()), (@commaSep1 @setExpr()), @return []
            @bind p, (elems) =>
                @bind (@aToken 'TRCurlyBrace'), (end) =>
                    @return if elems.length == 0 then ['ASTEmptySet'] else ['ASTSet', elems]

    setBuilder: ->
        @bind (@aToken 'TLCurlyBrace'), (start) =>
            @bind (@choice @inclusionRelation(), @variable ['TyAny']), (domain) =>
                p = @bind_ (@choice (@aToken 'TPipe'), (@aToken 'TColon')), @commaSep1 @logicalExpr()
                @bind (@choice p, @return []), (predicates) =>
                    @bind_ (@aToken 'TRCurlyBrace'), @return ['ASTSetBuilder', domain, predicates]

    setRange: ->
        @bind (@choice (@aToken 'TLParen'), (@aToken 'TLSqBracket')), (sDelim) =>
            @bind @algebraicExpr(), (start) =>
                @bind_ (@aToken 'TComma'), @bind @algebraicExpr(), (end) =>
                    @bind (@choice (@aToken 'TRParen'), (@aToken 'TRSqBracket')), (eDelim) =>
                        sInclusive = sDelim[0] == 'TLSqBracket'
                        eInclusive = eDelim[0] == 'TRSqBracket'
                        @return ['ASTRange', sInclusive, start, end, eInclusive]

    # END: Set Expressions




lexer = require './lexer'
p = new Parser
l = new lexer.Lexer
console.log p.parse l.tokenize "a*x^2+x/b-c=0"