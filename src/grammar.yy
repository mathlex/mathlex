%nonassoc TIff
%left TImplies, TIf
%left TOr
%left TXor
%left TAnd
%nonassoc TEqual, TNotEqual, TTilde, TSimilar, TCongruent
%left TPlusMinus, TMinusPlus, TPlus, TMinus
%left TSetDiff
%nonassoc TChoose
%left TDirectSum
%left TUnion
%left TIntersect
%right TSum, TProduct, TLimit, TBigUnion, TBigIntersect
%left TTimes, TSlash, TDivide, TModulus
%nonassoc TDot
%left TCross, TTensor, TCartesianProduct
%left TWedge
%right UnaryPrefix, TNot, TVectorizer, TUnitVectorizer, TGradient, TDivergence, TCurl
%right TPartial, TDifferential, TChangeDelta
%nonassoc TDivDiff, TDivPartial
%left TLParen, TRParen
%left TCompose
%right TSelfCompose
%right TExponent
%left TBang, TPrime, TDotDiff
%left TSubscript, TSuperscript


%start start


%%

start
    : expression
        { return $1; }
    ;

expression
    : logical
    | logical TEquiv logical
        { $$ = ['Equivalent', $1, $3]; }
    | logical TNotEquiv logical
        { $$ = ['NotEquivalent', $1, $3]; }
    ;

expression_list
    : expression
        { $$ = [$1]; }
    | expression_list TComma expression
        { $$ = $1.concat([$3]); }
    ;

logical
    : quantification
    | logical TIff logical
        { $$ = ['Iff', $1, $3]; }
    | logical TImplies logical
        { $$ = ['Implies', $1, $3, false]; }
    | logical TIf logical
        { $$ = ['Implies', $1, $3, true]; }
    | TIf logical TThen logical
        { $$ = ['Implies', $2, $4, false]; }
    | logical TOr logical
        { $$ = ['Or', $1, $3]; }
    | logical TXor logical
        { $$ = ['Xor', $1, $3]; }
    | logical TAnd logical
        { $$ = ['And', $1, $3]; }
    | TNot logical
        { $$ = ['Not', $2]; }
    | TTilde logical
        { $$ = ['Not', $2]; }
    | TBang logical
        { $$ = ['Not', $2]; }
    ;

logical_list
    : logical
        { $$ = [$1]; }
    | logical_list TComma logical
        { $$ = $1.concat([$3]); }
    ;

quantification
    : relation
    | TQForall relation TImplies quantification
        { $$ = ['Forall', $2, $4]; }
    | TQForall relation TSuchThat relation TImplies quantification
        { $$ = ['Forall', $2, ['Implies', $4, $6, false]]; }
    | TQExists relation TSuchThat quantification
        { $$ = ['Exists', $2, $4]; }
    | TQUnique relation TSuchThat quantification
        { $$ = ['Unique', $2, $4]; }
    ;

relation
    : equality
    | inequality
    | ratio
    ;

equality
    : algebraic TEqual algebraic
        { $$ = ['Equal', $1, $3]; }
    | ratio TRatioEqual ratio
        { $$ = ['RatioEqual', $1, $3]; }
    ;

inequality
    : algebraic TNotEqual algebraic
        { $$ = ['NotEqual', $1, $3]; }
    | algebraic TCongruent algebraic
        { $$ = ['Congruent', $1, $3]; }
    | algebraic TSimilar algebraic
        { $$ = ['Similar', $1, $3]; }
    | algebraic TTilde algebraic
        { $$ = ['Similar', $1, $3]; }
    | algebraic TParallel algebraic
        { $$ = ['Parallel', $1, $3]; }
    | algebraic TPerpendicular algebraic
        { $$ = ['Perpendicular', $1, $3]; }
    | algebraic TLess algebraic
        { $$ = ['Less', $1, $3]; }
    | algebraic TLessEqual algebraic
        { $$ = ['LessEqual', $1, $3]; }
    | algebraic TGreaterEqual algebraic
        { $$ = ['GreaterEqual', $1, $3]; }
    | algebraic TGreater algebraic
        { $$ = ['Greater', $1, $3]; }
    | algebraic TSubset algebraic
        { $$ = ['Subset', $1, $3]; }
    | algebraic TSuperset algebraic
        { $$ = ['Superset', $1, $3]; }
    | algebraic TPropSubset algebraic
        { $$ = ['ProperSubset', $1, $3]; }
    | algebraic TPropSuperset algebraic
        { $$ = ['ProperSuperset', $1, $3]; }
    | algebraic TIn algebraic
        { $$ = ['Inclusion', $1, $3]; }
    | algebraic TDivides algebraic
        { $$ = ['Divides', $1, $3]; }
    | algebraic TPipe algebraic
        { $$ = ['Divides', $1, $3]; }
    | algebraic TNotDivides algebraic
        { $$ = ['NotDivides', $1, $3]; }
    ;

ratio
    : algebraic
    | algebraic TRatio algebraic
        { $$ = ['Ratio', $1, $3]; }
    ;

algebraic
    : primary
    | algebraic TPlusMinus algebraic
        { $$ = ['PlusMinus', $1, $3]; }
    | algebraic TMinusPlus algebraic
        { $$ = ['MinusPlus', $1, $3]; }
    | algebraic TPlus algebraic
        { $$ = ['Plus', $1, $3]; }
    | algebraic TMinus algebraic
        { $$ = ['Minus', $1, $3]; }
    | algebraic TTimes algebraic
        { $$ = ['Times', $1, $3]; }
    | algebraic TDivide algebraic
        { $$ = ['Divide', $1, $3, true]; }
    | algebraic TSlash algebraic
        { $$ = ['Divide', $1, $3, false]; }
    | algebraic TModulus algebraic
        { $$ = ['Modulus', $1, $3]; }
    | algebraic TExponent algebraic
        { $$ = ['Exponent', $1, $3]; }
    | algebraic TSuperscript algebraic
        { $$ = ['Superscript', $1, $3]; }
    | algebraic TSubscript algebraic
        { $$ = ['Subscript', $1, $3]; }
    | algebraic TDot algebraic
        { $$ = ['DotProduct', $1, $3]; }
    | algebraic TCross algebraic
        { $$ = ['CrossProduct', $1, $3]; }
    | algebraic TWedge algebraic
        { $$ = ['WedgeProduct', $1, $3]; }
    | algebraic TTensor algebraic
        { $$ = ['TensorProduct', $1, $3]; }
    | algebraic TCompose algebraic
        { $$ = ['Compose', $1, $3]; }
    | algebraic TSelfCompose algebraic
        { $$ = ['SelfCompose', $1, $3]; }
    | algebraic TUnion algebraic
        { $$ = ['Union', $1, $3]; }
    | algebraic TIntersect algebraic
        { $$ = ['Intersection', $1, $3]; }
    | algebraic TSetDiff algebraic
        { $$ = ['SetDiff', $1, $3]; }
    | algebraic TDirectSum algebraic
        { $$ = ['DirectSum', $1, $3]; }
    | algebraic TCartesianProduct algebraic
        { $$ = ['CartesianProduct', $1, $3]; }
    | TPlusMinus algebraic %prec UnaryPrefix
        { $$ = ['PosNeg', $2]; }
    | TMinusPlus algebraic %prec UnaryPrefix
        { $$ = ['NegPos', $2]; }
    | TPlus algebraic %prec UnaryPrefix
        { $$ = ['Positive', $2]; }
    | TMinus algebraic %prec UnaryPrefix
        { $$ = ['Negative', $2]; }
    | TVectorizer algebraic
        { $$ = ['Vectorizer', $2]; }
    | TUnitVectorizer algebraic
        { $$ = ['UnitVectorizer', $2]; }
    | TPartial algebraic
        { $$ = ['Partial', $2]; }
    | TPartial algebraic TDivPartial algebraic
        { $$ = ['Function', ['Variable', 'pdiff'], [$2, $4]]; }
    | TDifferential algebraic
        { $$ = ['Differential', $2]; }
    | TDifferential algebraic TDivDiff algebraic
        { $$ = ['Function', ['Variable', 'diff'], [$2, $4]]; }
    | TChangeDelta algebraic
        { $$ = ['Change', $2]; }
    | TGradient algebraic
        { $$ = ['Gradient', $2]; }
    | TDivergence algebraic
        { $$ = ['Divergence', $2]; }
    | TCurl algebraic
        { $$ = ['Curl', $2]; }
    | TSum range_bounds algebraic
        { $$ = ['Function', ['Variable', 'sum'], [$3].concat($2)]; }
    | TProduct range_bounds algebraic
        { $$ = ['Function', ['Variable', 'prod'], [$3].concat($2)]; }
    | TBigUnion range_bounds algebraic
        { $$ = ['Function', ['Variable', 'Union'], [$3].concat($2)]; }
    | TBigIntersect range_bounds algebraic
        { $$ = ['Function', ['Variable', 'Intersect'], [$3].concat($2)]; }
    | TLimit TSubscript TLParen primary TImplies algebraic TRParen algebraic
        { $$ = ['Function', ['Variable', 'lim'], [$8, $4, $6]]; }
    | algebraic TBang
        { $$ = ['Factorial', $1]; }
    | algebraic TPrime
        { $$ = ['Prime', $1]; }
    | algebraic TDotDiff
        { $$ = ['DotDiff', $1]; }
    | algebraic TChoose algebraic
        { $$ = ['Function', ['Variable', 'combination'], [$1].concat([$3])]; }
    | algebraic TLParen expression_list TRParen
        { $$ = ['Function', $1, $3]; }
;

range_bounds
    : TSubscript TLParen primary TEqual algebraic TRParen TSuperscript primary
        { $$ = [$3, $5, $8]; }
    | TSuperscript primary TSubscript TLParen primary TEqual expression TRParen
        { $$ = [$5, $7, $2]; }
    | TSubscript TLParen inequality TRParen
        { $$ = [$3]; }
;

algebraic_list
    : algebraic
        { $$ = [$1]; }
    | algebraic_list TComma algebraic
        { $$ = $1.concat [$3]; }
;

primary
    : TIdent
        { $$ = ['Variable', $1]; }
    | TIntLit
        { $$ = ['Literal', 'Int', $1]; }
    | TFloatLit
        { $$ = ['Literal', 'Float', $1]; }
    | TConstant
        { $$ = ['Constant', $1]; }
    | TLess algebraic_list TGreater
        { $$ = ['Vector', $2]; }
    | TLVector algebraic_list TRVector
        { $$ = ['Vector', $2]; }
    | TLess algebraic TPipe
        { $$ = ['Bra', $2]; }
    | TPipe algebraic TGreater
        { $$ = ['Ket', $2]; }
    | TLess algebraic TOr algebraic TGreater
        { $$ = ['BraKet', $2, $4]; }
    | TLVector algebraic TPipe algebraic TRVector
        { $$ = ['BraKet', $2, $4]; }
    | TLCurlyBrace set TRCurlyBrace
        { $$ = $2; }
    | TLSqBracket list TRSqBracket
        { $$ = ['List', $2]; }
    | range_start algebraic TComma algebraic range_end
        { $$ = ['Range', $1, $2, $4, $5]; }
    | TPipe algebraic TPipe
        { $$ = ['AbsVal', $2]; }
    | TLPipe opt_algebraic TRPipe
        { $$ = ['AbsVal', $2]; }
    | TOr algebraic TOr
        { $$ = ['Norm', $2]; }
    | TLDoublePipe opt_algebraic TRDoublePipe
        { $$ = ['Norm', $2]; }
    | TLParen opt_expression TRParen
        { $$ = ['Parentheses', $2]; }
    | TIntegral int_bounds algebraic TDifferential algebraic
        {
            var params;
            if (($2.lo != null) && ($2.hi != null)) {
                params = [$3, $5, $2.lo, $2.hi];
            } else if ($2.lo != null) {
                params = [$3, $5, $2.lo];
            } else {
                params = [$3, $5];
            }

            $$ = ['Function', ['Variable', 'int'], params];
        }
    | error
        { $$ = ['Empty']; }
;

int_bounds
    : TSubscript primary TSuperscript primary
        { $$ = {lo: $2, hi: $4}; }
    | TSuperscript primary TSubscript primary
        { $$ = {hi: $2, lo: $4}; }
    | TSubscript primary
        { $$ = {lo: $2}; }
    | TSuperscript primary
        { $$ = {hi: $2}; }
    |
        { $$ = {}; }
;

range_start
    : TLRangeInclusive
        { $$ = true; }
    | TLRangeExclusive
        { $$ = false; }
;

range_end
    : TRRangeInclusive
        { $$ = true; }
    | TRRangeExclusive
        { $$ = false; }
;

set
    : /* empty */
        { $$ = ['EmptySet']; }
    | expression_list
        { $$ = ['Set', $1]; }
    | relation TSuchThat logical_list
        { $$ = ['SetBuilder', $1, $3]; }
;

list
    : expression_list
;
