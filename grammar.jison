%lex
%%
\s+                         /* ignore whitespace */

"true"                      return 'TConstant'
"false"                     return 'TConstant'
"infinity"                  return 'TConstant'
"forall"                    return 'TQForall'
"exists"                    return 'TQExists'
"unique"                    return 'TQUnique'
"<->"                       return 'TIff'
"iff"                       return 'TIff'
"->"                        return 'TIf'
"if"                        return 'TIf'
"implies"                   return 'TIf'
"&&"                        return 'TAnd'
"and"                       return 'TAnd'
"xor"                       return 'TXor'
"||"                        return 'TOr'
"or"                        return 'TOr'
"~"                         return 'TNot'
"not"                       return 'TNot'

"<"                         return 'TLess'
"<="                        return 'TLessEqual'
"="                         return 'TEqual'
"=="                        return 'TEqual'
"==="                       return 'TEquiv'
"!="                        return 'TNotEqual'
"<>"                        return 'TNotEqual'
">="                        return 'TGreaterEqual'
">"                         return 'TGreater'
"subset"                    return 'TSubset'
"superset"                  return 'TSuperset'
"propsubset"                return 'TPropSubset'
"propsuperset"              return 'TPropSuperset'
"in"                        return 'TIn'

"union"                     return 'TUnion'
"intersect"                 return 'TIntersect'

"+"                         return 'TPlus'
"-"                         return 'TMinus'
"*"                         return 'TTimes'
"/"                         return 'TDivide'
"%"                         return 'TModulus'
"mod"                       return 'TModulus'
"^"                         return 'TPower'
"**"                        return 'TPower'
"_"                         return 'TUnderscore'
"!"                         return 'TBang'
"'"                         return 'TPrime'
"@"                         return 'TCompose'
"&."                        return 'TDot'
"&x"                        return 'TCross'

"("                         return 'TLParen'
")"                         return 'TRParen'
"["                         return 'TLSqBracket'
"]"                         return 'TRSqBracket'
"{"                         return 'TLCurlyBrace'
"}"                         return 'TRCurlyBrace'
"|"                         return 'TPipe'
":"                         return 'TColon'
","                         return 'TComma'

\d+                         return 'TIntLit'
\d*\.?\d+(?:[Ee][+-]?\d+)   return 'TFloatLit'
[a-zA-Z][a-zA-Z0-9]*        return 'TIdent'
#[a-zA-Z0-9]+               return 'TConstant'


/lex

%start start

%%

primary
    : TIdent
        { $$ = ['Variable', $1]; }
    | TConstant
        { $$ = ['Constant', $1]; }
    | TIntLit
        { $$ = ['Literal', 'Int', $1]; }
    | TFloatLit
        { $$ = ['Literal', 'Float', $1]; }
    | TLParen expression TRParen
        { $$ = ['Parentheses', $2]; }
    ;

postfix
    : primary
    | postfix TLParen expression_list TRParen
        { $$ = ['Function', $1, $3]; }
    | postfix TBang
        { $$ = ['Factorial', $1]; }
    | postfix TPrime
        { $$ = ['Prime', $1]; }
    ;

factor
    : postfix
    | postfix TPower prefix
        { $$ = ['Power', $1, $3]; }
    | postfix TUnderscore prefix
        { $$ = ['Subscript', $1, $3]; }
    ;

prefix
    : factor
    | TPlus prefix
        { $$ = ['Positive', $2]; }
    | TMinus prefix
        { $$ = ['Negative', $2]; }
    ;

term
    : prefix
    | term TTimes prefix
        { $$ = ['Times', $1, $3]; }
    | term TDivide prefix
        { $$ = ['Divide', $1, $3]; }
    | term TModulus prefix
        { $$ = ['Modulus', $1, $3]; }
    ;

intersection
    : term
    | intersection TIntersect fraction
        { $$ = ['Intersection', $1, $3]; }
    ;

union
    : intersection
    | union TUnion intersection
        { $$ = ['Union', $1, $3]; }
    ;
    
algebraic
    : union
    | algebraic TPlus union
        { $$ = ['Plus', $1, $3]; }
    | algebraic TMinus union
        { $$ = ['TMinus', $1, $3]; }
    ;


relation
    : algebraic
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
    ;

quantification
    : relation
    | TQForall relation TComma quantification
        { $$ = ['Forall', $2, $4]; }
    | TQExists relation TComma quantification
        { $$ = ['Exists', $2, $4]; }
    | TQUnique relation TComma quantification
        { $$ = ['Unique', $2, $4]; }
    ;

negation
    : quantification
    | TNot negation
        { $$ = ['Not', $2]; }
    ;

conjunction
    : negation
    | conjunction TAnd negation
        { $$ = ['And', $1, $3]; }
    ;

exclusion
    : conjunction
    | exclusion TXor conjunction
        { $$ = ['Xor', $1, $3]; }
    ;

disjunction
    : exclusion
    | disjunction TOr exclusion
        { $$ = ['Or', $1, $3]; }
    ;

conditional
    : disjunction
    | implication TIf disjunction
        { $$ = ['If', $1, $3]; }
    ;

logical
    : conditional
    | conditional TIff conditional
        { $$ = ['Iff', $1, $3]; }
    ;

expression
    : logical
    | logical TEqual logical
        { $$ = ['Equal', $1, $3]; }
    | logical TNotEqual logical
        { $$ = ['NotEqual', $1, $3]; }
    ;

expression_list
    : expression_list TComma expression
        { $$ = $1.concat([$3]); }
    | expression
        { $$ = [$1]; }
    ;

start: expression { console.log($1); return $1; };