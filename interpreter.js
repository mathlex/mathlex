function ExpressionBuilder() {}

ExpressionBuilder.prototype = new ExpressionBuilderInterface();

function buildUnaryExpression(uExpr, child) {
    child.parent = uExpr;
    uExpr.child = child;
    return uExpr;
}

function buildBinaryExpression(bExpr, left, right) {
    left.parent = bExpr;
    right.parent = bExpr;
    bExpr.left = left;
    bExpr.right = right;
    return bExpr;
}

ExpressionBuilder.prototype.newLessRelation = function(left, right) {
    return buildBinaryExpression(new LessRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newLessEqualRelation = function(left, right) {
    return buildBinaryExpression(new LessEqualRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newEqualRelation = function(left, right) {
    return buildBinaryExpression(new EqualRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newNotEqualRelation = function(left, right) {
    return buildBinaryExpression(new NotEqualRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newGreaterEqualRelation = function(left, right) {
    return buildBinaryExpression(new GreaterEqualRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newGreaterRelation = function(left, right) {
    return buildBinaryExpression(new GreaterRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newPlus = function(left, right) {
    return buildBinaryExpression(new PlusExpression(), left, right);
};

ExpressionBuilder.prototype.newMinus = function(left, right) {
    return buildBinaryExpression(new MinusExpression(), left, right);
};

ExpressionBuilder.prototype.newTimes = function(left, right) {
    return buildBinaryExpression(new TimesExpression(), left, right);
};

ExpressionBuilder.prototype.newDivide = function(left, right) {
    return buildBinaryExpression(new DivideExpression(), left, right);
};

ExpressionBuilder.prototype.newExponent = function(base, power) {
    return buildBinaryExpression(new ExponentExpression(), base, power);
};

ExpressionBuilder.prototype.newSubscript = function(base, index) {
    return buildBinaryExpression(new SubscriptExpression(), base, index);
};

ExpressionBuilder.prototype.newParentheses = function(subExpr) {
    return buildUnaryExpression(new ParenthesesExpression(), subExpr);
};

ExpressionBuilder.prototype.newNegation = function(subExpr) {
    return buildUnaryExpression(new NegationExpression(), subExpr);
};

ExpressionBuilder.prototype.newPositive = function(subExpr) {
    return buildUnaryExpression(new PositiveExpression(), subExpr);
};

ExpressionBuilder.prototype.newFactorial = function(subExpr) {
    return buildUnaryExpression(new FactorialExpression(), subExpr);
};

ExpressionBuilder.prototype.newNumber = function(value) {
    return new NumberExpression(value);
};

ExpressionBuilder.prototype.newVariable = function(name) {
    return new VariableExpression(name);
};

ExpressionBuilder.prototype.newConstant = function(name) {
    return new ConstantExpression(name);
};

ExpressionBuilder.prototype.newNull = function() {
    return new NullExpression();
};function ExpressionBuilderInterface() {}

ExpressionBuilderInterface.prototype.newLessRelation = function(left, right) {
    console.log('ExpressionBuilderInterface.newLessRelation() is not implemented');
};

ExpressionBuilderInterface.prototype.newLessEqualRelation = function(left, right) {
    console.log('ExpressionBuilderInterface.newLessEqualRelation() is not implemented');
};

ExpressionBuilderInterface.prototype.newEqualRelation = function(left, right) {
    console.log('ExpressionBuilderInterface.newEqualRelation() is not implemented');
};

ExpressionBuilderInterface.prototype.newNotEqualRelation = function(left, right) {
    console.log('ExpressionBuilderInterface.newNotEqualRelation() is not implemented');
};

ExpressionBuilderInterface.prototype.newGreaterEqualRelation = function(left, right) {
    console.log('ExpressionBuilderInterface.newGreaterEqualRelation() is not implemented');
};

ExpressionBuilderInterface.prototype.newGreaterRelation = function(left, right) {
    console.log('ExpressionBuilderInterface.newGreaterRelation() is not implemented');
};

ExpressionBuilderInterface.prototype.newPlus = function(left, right) {
    console.log('ExpressionBuilderInterface.newPlus() is not implemented');
};

ExpressionBuilderInterface.prototype.newMinus = function(left, right) {
    console.log('ExpressionBuilderInterface.newMinus() is not implemented');
};

ExpressionBuilderInterface.prototype.newTimes = function(left, right) {
    console.log('ExpressionBuilderInterface.newTimes() is not implemented');
};

ExpressionBuilderInterface.prototype.newDivide = function(left, right) {
    console.log('ExpressionBuilderInterface.newDivide() is not implemented');
};

ExpressionBuilderInterface.prototype.newExponent = function(base, power) {
    console.log('ExpressionBuilderInterface.newExponent() is not implemented');
};

ExpressionBuilderInterface.prototype.newSubscript = function(base, index) {
    console.log('ExpressionBuilderInterface.newSubscript() is not implemented');
};

ExpressionBuilderInterface.prototype.newParentheses = function(subExpr) {
    console.log('ExpressionBuilderInterface.newParentheses() is not implemented');
};

ExpressionBuilderInterface.prototype.newNegation = function(subExpr) {
    console.log('ExpressionBuilderInterface.newNegation() is not implemented');
};

ExpressionBuilderInterface.prototype.newPositive = function(subExpr) {
    console.log('ExpressionBuilderInterface.newPositive() is not implemented');
};

ExpressionBuilderInterface.prototype.newFactorial = function(subExpr) {
    console.log('ExpressionBuilderInterface.newFactorial() is not implemented');
};

ExpressionBuilderInterface.prototype.newNumber = function(value) {
    console.log('ExpressionBuilderInterface.newNumber() is not implemented');
};

ExpressionBuilderInterface.prototype.newVariable = function(name) {
    console.log('ExpressionBuilderInterface.newVariable() is not implemented');
};

ExpressionBuilderInterface.prototype.newConstant = function(name) {
    console.log('ExpressionBuilderInterface.newConstant() is not implemented');
};

ExpressionBuilderInterface.prototype.newNull = function() {
    console.log('ExpressionBuilderInterface.newNull() is not implemented');
};
function BinaryExpression() {
    this.left = null;
    this.right = null;
};

BinaryExpression.prototype = new Expression();function ConstantExpression(n) {
    this.name = n;
}

ConstantExpression.prototype = new Expression();

ConstantExpression.prototype.accept = function(visitor) {
    visitor.visitConstant(this);
};function DivideExpression() {}

DivideExpression.prototype = new BinaryExpression();

DivideExpression.prototype.accept = function(visitor) {
    visitor.visitDivide(this);
};function EqualRelationExpression() {}

EqualRelationExpression.prototype = new BinaryExpression();

EqualRelationExpression.prototype.accept = function(visitor) {
    visitor.visitEqualRelation(this);
};function ExponentExpression() {}

ExponentExpression.prototype = new BinaryExpression

ExponentExpression.prototype.accept = function(visitor) {
    visitor.visitExponent(this);
};function Expression() {
    this.parent = null;
}

Expression.prototype.accept = function(visitor){
    console.log('Expression.accept() not implemented');
};function FactorialExpression() {}

FactorialExpression.prototype = new UnaryExpression();

FactorialExpression.prototype.accept = function(visitor) {
    visitor.visitFactorial(this);
};function GreaterEqualRelationExpression() {}

GreaterEqualRelationExpression.prototype = new BinaryExpression();

GreaterEqualRelationExpression.prototype.accept = function(visitor) {
    visitor.visitGreaterEqualRelation(this);
};
function GreaterRelationExpression() {}

GreaterRelationExpression.prototype = new BinaryExpression();

GreaterRelationExpression.prototype.accept = function(visitor) {
    visitor.visitGreaterRelation(this);
};
function LessEqualRelationExpression() {}

LessEqualRelationExpression.prototype = new BinaryExpression();

LessEqualRelationExpression.prototype.accept = function(visitor) {
    visitor.visitLessEqualRelation(this);
};
function LessRelationExpression() {}

LessRelationExpression.prototype = new BinaryExpression();

LessRelationExpression.prototype.accept = function(visitor) {
    visitor.visitLessRelation(this);
};
function MinusExpression() {}

MinusExpression.prototype = new BinaryExpression();

MinusExpression.prototype.accept = function(visitor) {
    visitor.visitMinus(this);
};function NegationExpression() {}

NegationExpression.prototype = new BinaryExpression();

NegationExpression.prototype.accept = function(visitor) {
    visitor.visitNegation(this);
};function NotEqualRelationExpression() {}

NotEqualRelationExpression.prototype = new BinaryExpression();

NotEqualRelationExpression.prototype.accept = function(visitor) {
    visitor.visitNotEqualRelation(this);
};
function NullExpression() {}

NullExpression.prototype = new Expression();

NullExpression.prototype.accept = function(visitor) {
    visitor.visitNull(this);
};
function NumberExpression(val) {
    this.value = val;
}

NumberExpression.prototype = new Expression();

NumberExpression.prototype.accept = function(visitor) {
    visitor.visitNumber(this);
};function ParenthesesExpression() {}

ParenthesesExpression.prototype = new UnaryExpression();

ParenthesesExpression.prototype.accept = function(visitor) {
    visitor.visitParentheses(this);
};function PlusExpression() {}

PlusExpression.prototype = new BinaryExpression();

PlusExpression.prototype.accept = function(visitor) {
    visitor.visitPlus(this);
};function PositiveExpression() {}

PositiveExpression.prototype = new UnaryExpression();

PositiveExpression.prototype.accept = function(visitor) {
    visitor.visitPositive(this);
};
function SubscriptExpression() {}

SubscriptExpression.prototype = new BinaryExpression();

SubscriptExpression.prototype.accept = function(visitor) {
    visitor.visitSubscript(this);
};function TimesExpression() {}

TimesExpression.prototype = new BinaryExpression();

TimesExpression.prototype.accept = function(visitor) {
    visitor.visitTimes(this);
};function UnaryExpression() {
    this.child = null;
};

UnaryExpression.prototype = new Expression();function VariableExpression(n) {
    this.name = n;
};

VariableExpression.prototype = new Expression();

VariableExpression.prototype.accept = function(visitor) {
    visitor.visitVariable(this);
};function Parser(builder) {
    this.tokens = null;
    this.parseTree = null;
    this.builder = builder;
}

Parser.prototype.parse = function(tokens) {
    this.tokens = tokens;
    this.parseTree = this.parseRelation();
    if (!this.tokens.isDone()) {
        throw "Expected end of token stream";
    }
};

Parser.prototype.parseRelation = function() {
    var left = this.parseSum();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.LESS_THAN:
            this.tokens.next();
            return this.builder.newLessRelation(left, this.parseSum());
        case Token.Type.LESS_EQUAL:
            this.tokens.next();
            return this.builder.newLessEqualRelation(left, this.parseSum());
        case Token.Type.EQUAL:
            this.tokens.next();
            return this.builder.newEqualRelation(left, this.parseSum());
        case Token.Type.NOT_EQUAL:
            this.tokens.next();
            return this.builder.newNotEqualRelation(left, this.parseSum());
        case Token.Type.GREATER_EQUAL:
            this.tokens.next();
            return this.builder.newGreaterEqualRelation(left, this.parseSum());
        case Token.Type.GREATER_THAN:
            this.tokens.next();
            return this.builder.newGreaterRelation(left, this.parseSum());
        default:
            return left;
    }
};

Parser.prototype.parseSum = function() {
    var left = this.parseTerm();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.PLUS:
            this.tokens.next();
            return this.builder.newPlus(left, this.parseSum());
        case Token.Type.MINUS:
            this.tokens.next();
            return this.builder.newMinus(left, this.parseSum());
        default:
            return left;
    }
};

Parser.prototype.parseTerm = function() {
    var left = this.parseFraction();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.TIMES:
            this.tokens.next();
            return this.builder.newTimes(left, this.parseTerm());
        default:
            return left;
    }
};

Parser.prototype.parseFraction = function() {
    // DIVIDE has slightly higher precedence than TIMES:
    // 1/3*x should be (1/3)*x and not 1/(3*x)
    var left = this.parseNegation();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.DIVIDE:
            this.tokens.next();
            return this.builder.newDivide(left, this.parseFraction());
        default:
            return left;
    }
};

Parser.prototype.parseNegation = function() {
    if (this.tokens.isDone()) {
        return this.parseFactor();
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.MINUS:
            this.tokens.next();
            return this.builder.newNegation(this.parseFactor());
        case Token.Type.PLUS:
            this.tokens.next();
            return this.builder.newPositive(this.parseFactor());
        default:
            return this.parseFactor();
    }
};

Parser.prototype.parseFactor = function() {
    var left = this.parseFactorial();
    
    if (this.tokens.isDone()) {
        return left;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.CARET:
            this.tokens.next();
            return this.builder.newExponent(left, this.parseNegation());
        case Token.Type.UNDERSCORE:
            this.tokens.next();
            return this.builder.newSubscript(left, this.parseNegation());
        default:
            return left;
    }
};

Parser.prototype.parseFactorial = function() {
    var base = this.parsePrimary();
    
    if (this.tokens.isDone()) {
        return base;
    }
    
    var t = this.tokens.getCurrent();
    
    switch (t.type) {
        case Token.Type.BANG:
            this.tokens.next();
            return this.builder.newFactorial(base);
        default:
            return base;
    }
};

Parser.prototype.parsePrimary = function() {
    if (this.tokens.isDone()) {
        return this.builder.newNull();
    }
    
    var t = this.tokens.getCurrent();

    switch (t.type) {
        case Token.Type.LPAREN:
            this.tokens.next();
            var ex = this.builder.newParentheses(this.parseSum());
            // look for close paren; auto-insert if missing
            if (!this.tokens.isDone() && this.tokens.getCurrent().type == Token.Type.RPAREN) {
                // skip over closing paren
                this.tokens.next();
            }
            return ex;
        case Token.Type.NUMBER:
            this.tokens.next();
            return this.builder.newNumber(parseFloat(t.value));
        case Token.Type.CONSTANT:
            this.tokens.next();
            return this.builder.newConstant(t.value);
        case Token.Type.VARIABLE:
            this.tokens.next();
            return this.builder.newVariable(t.value);
        default:
            return this.builder.newNull();
    }
};
function Token(type, value) {
    this.type = value ? type : Token.typeOf(type);
    this.value = value ? value : type;
}

Token.Type = {
    UNKNOWN: 0,
    PLUS: 1,
    MINUS: 2,
    TIMES: 3,
    DIVIDE: 4,
    CARET: 5,
    UNDERSCORE: 6,
    LPAREN: 7,
    RPAREN: 8,
    BANG: 9,
    DOT: 10,
    CROSS: 11,
    COMPOSITION: 12,
    VECTORIZE: 13,
    GREATER_EQUAL: 14,
    GREATER_THAN: 15,
    EQUAL: 16,
    NOT_EQUAL: 17,
    LESS_THAN: 18,
    LESS_EQUAL: 19,
    NUMBER: 20,
    CONSTANT: 21,
    VARIABLE: 22,
};

Token.typeMap = {
    '+': Token.Type.PLUS,
    '-': Token.Type.MINUS,
    '*': Token.Type.TIMES,
    '/': Token.Type.DIVIDE,
    '^': Token.Type.CARET,
    '_': Token.Type.UNDERSCORE,
    '(': Token.Type.LPAREN,
    ')': Token.Type.RPAREN,
    '!': Token.Type.BANG,
    '&.': Token.Type.DOT,
    '&x': Token.Type.CROSS,
    '&o': Token.Type.COMPOSITION,
    '&v': Token.Type.VECTORIZE,
    '>=': Token.Type.GREATER_EQUAL,
    '>': Token.Type.GREATER_THAN,
    '=': Token.Type.EQUAL,
    '!=': Token.Type.NOT_EQUAL,
    '<>': Token.Type.NOT_EQUAL,
    '<': Token.Type.LESS_THAN,
    '<=': Token.Type.LESS_EQUAL
};

Token.typeOf = function(s) {
    if (undefined !== Token.typeMap[s]) {
        return Token.typeMap[s];
    } else {
        return Token.Type.UNKNOWN;
    }
};

Token.getMultiChars = function() {
    var multiChars = {};
    for (var key in this.typeMap) {
        if (key.length > 1) {
            multiChars[key] = this.typeMap[key];
        }
    }
    return multiChars;
};function TokenIterator(tokens) {
    var currentIndex = 0;
    
    this.first = function() {
        currentIndex = 0;
    };
    
    this.next = function() {
        currentIndex++;
    };
    
    this.prev = function() {
        currentIndex--;
    };
    
    this.getCurrent = function() {
        return tokens[currentIndex];
    };
    
    this.isDone = function() {
        return (currentIndex >= tokens.length);
    };
}function Tokenizer() {
    this.input = this.tokens = this.currPos = this.tokenized = null;
    this.reset();
}

Tokenizer.prototype.getIterator = function() {
    if (!this.tokenized) {
        throw 'Nothing has been tokenized!';
    }
    return new TokenIterator(this.tokens);
};

Tokenizer.prototype.reset = function() {
    this.input = '';
    this.currPos = 0;
    this.tokens = [];
    this.tokenized = false;
};

Tokenizer.prototype.tokenize = function(input) {
    this.reset();
    this.input = input;
    
    while (this.currPos < this.input.length) {
        var currChar = this.input[this.currPos];
        if (currChar.match(/[\*\/\+\-\^\_\(\)\&\!\=\<\>]/)) {
            this.tokenizeOperator();
        } else if (currChar.match(/[\d\.]/)) {
            this.tokenizeNumber();
        } else {
            this.tokenizeSymbol();
        }
    }
    this.tokenized = true;
};

Tokenizer.prototype.tokenizeOperator = function() {
    var i = 1,
        keys = Token.getMultiChars(),
        s, possibilities;
        
    while (keys.length > 0) {
        i++;
        if (this.currPos + i >= this.input.length) {
            break;
        }
        
        s = this.input.substring(this.currPos, this.currPos + i);
        possibilities = [];
        for (var k in keys) {
            if (k.substring(0, s.length) === s) {
                possibilities.push(k);
            }
        }
        
        keys = possibilities;
    }
    
    if (i == 1) {
        i++;
    }
    
    this.tokens.push(new Token(this.input.substring(this.currPos, this.currPos + i-1)));
    this.currPos += i-1;
};

Tokenizer.prototype.tokenizeNumber = function() {
    var start = this.currPos;
    while (this.currPos < this.input.length && this.input[this.currPos].match(/[\d\.]/)) {
        this.currPos++;
    }
    
    this.tokens.push(new Token(Token.Type.NUMBER, this.input.substring(start, this.currPos)));
};

Tokenizer.prototype.tokenizeSymbol = function() {
    var type = Token.Type.VARIABLE,
        value;
    
    // check for constant
    if (this.input[this.currPos] == '#') {
        type = Token.Type.CONSTANT;
        // skip over '#' character and tokenize constant name
        this.currPos++;
    }
    
    if (this.input[this.currPos].match(/[a-zA-Z]/)) {
        // group letters together
        var start = this.currPos;
        while (this.currPos < this.input.length && this.input[this.currPos].match(/[a-zA-Z\d]/)) {
            this.currPos++;
        }
        
        value = this.input.substring(start, this.currPos);
        
        // TODO: Check if symbol is a reserved keyword:
        // if (is_keyword(value)) type = get_type_from_keyword(value);
    } else {
        // tokenize a single junk character
        type = Token.Type.UNKNOWN;
        value = this.input[this.currPos];
        this.currPos++;
    }
    
    this.tokens.push(new Token(type, value));
};
function ExpressionVisitor() {}

ExpressionVisitor.prototype.visitLessRelation = function(expr) {
    console.log("visitLessRelation not implemented");
};

ExpressionVisitor.prototype.visitLessEqualRelation = function(expr) {
    console.log("visitLessEqualRelation not implemented");
};

ExpressionVisitor.prototype.visitEqualRelation = function(expr) {
    console.log("visitEqualRelation not implemented");
};

ExpressionVisitor.prototype.visitNotEqualRelation = function(expr) {
    console.log("visitNotEqualRelation not implemented");
};

ExpressionVisitor.prototype.visitGreaterEqualRelation = function(expr) {
    console.log("visitGreaterEqualRelation not implemented");
};

ExpressionVisitor.prototype.visitGreaterRelation = function(expr) {
    console.log("visitGreaterRelation not implemented");
};

ExpressionVisitor.prototype.visitPlus = function(expr) {
    console.log("visitPlus not implemented");
};

ExpressionVisitor.prototype.visitMinus = function(expr) {
    console.log("visitMinus not implemented");
};

ExpressionVisitor.prototype.visitTimes = function(expr) {
    console.log("visitTimes not implemented");
};

ExpressionVisitor.prototype.visitDivide = function(expr) {
    console.log("visitDivide not implemented");
};
ExpressionVisitor.prototype.visitExponent = function(expr) {
    console.log("visitExponent not implemented");
};

ExpressionVisitor.prototype.visitSubscript = function(expr) {
    console.log("visitSubscript not implemented");
};

ExpressionVisitor.prototype.visitParentheses = function(expr) {
    console.log("visitParentheses not implemented");
};

ExpressionVisitor.prototype.visitNegation = function(expr) {
    console.log("visitNegation not implemented");
};

ExpressionVisitor.prototype.visitPositive = function(expr) {
    console.log("visitPositive not implemented");
};

ExpressionVisitor.prototype.visitFactorial = function(expr) {
    console.log("visitFactorial not implemented");
};

ExpressionVisitor.prototype.visitNumber = function(expr) {
    console.log("visitNumber not implemented");
};

ExpressionVisitor.prototype.visitVariable = function(expr) {
    console.log("visitVariable not implemented");
};

ExpressionVisitor.prototype.visitConstant = function(expr) {
    console.log("visitConstant not implemented")
};

ExpressionVisitor.prototype.visitNull = function(expr) {
    console.log("visitNull not implemented");
};
function LatexTranslator() {
    this.latex = '';
    
    this.specialVarNames = {
        'alpha': '\\alpha',
        'beta': '\\beta',
        'gamma': '\\gamma',
        'Gamma': '\\Gamma',
        'delta': '\\delta',
        'Delta': '\\Delta',
        'epsilon': '\\varepsilon',
        'zeta': '\\zeta',
        'eta': '\\eta',
        'theta': '\\theta',
        'Theta': '\\Theta',
        'kappa': '\\kappa',
        'lambda': '\\lambda',
        'Lambda': '\\Lambda',
        'mu': '\\mu',
        'nu': '\\nu',
        'xi': '\\xi',
        'Xi': '\\Xi',
        'omicron': 'o',
        'pi': '\\pi',
        'Pi': '\\Pi',
        'rho': '\\rho',
        'sigma': '\\sigma',
        'Sigma': '\\Sigma',
        'tau': '\\tau',
        'upsilon': '\\upsilon',
        'Upsilon': '\\Upsilon',
        'phi': '\\varphi',
        'Phi': '\\Phi',
        'chi': '\\chi',
        'psi': '\\psi',
        'Psi': '\\Psi',
        'omega': '\\omega',
        'Omega': '\\Omega'
    };
    
    this.constants = {
        'pi': '\\pi',
        'p': '\\pi',
        'i': 'i',
        'e': '\\mathrm{e}',
        'vi': '\\hat\\imath',
        'vj': '\\hat\\jmath',
        'vk': '\\hat{k}',
        'v0': '\\vec{0}',
        'one': '\\mathbf{1}',
        'zero': '\\mathbf{0}',
        'infinity': '\\infty',
        'null': '\\emptyset',
        'gamma': '\\gamma',
        'N': '\\mathbb{N}',
        'Z': '\\mathbb{Z}',
        'Q': '\\mathbb{Q}',
        'R': '\\mathbb{R}',
        'C': '\\mathbb{C}',
    };
}

LatexTranslator.prototype = new ExpressionVisitor();

LatexTranslator.prototype.binaryInfix = function(expr, op) {
    expr.left.accept(this);
    this.latex += op;
    expr.right.accept(this);
};

LatexTranslator.prototype.visitLessRelation = function(expr) {
    this.binaryInfix(expr, '<');
};

LatexTranslator.prototype.visitLessEqualRelation = function(expr) {
    this.binaryInfix(expr, '{\\le}');
};

LatexTranslator.prototype.visitEqualRelation = function(expr) {
    this.binaryInfix(expr, '=');
};

LatexTranslator.prototype.visitNotEqualRelation = function(expr) {
    this.binaryInfix(expr, '{\\neq}');
};

LatexTranslator.prototype.visitGreaterEqualRelation = function(expr) {
    this.binaryInfix(expr, '{\\ge}');
};

LatexTranslator.prototype.visitGreaterRelation = function(expr) {
    this.binaryInfix(expr, '>');
};

LatexTranslator.prototype.visitPlus = function(expr) {
    this.binaryInfix(expr, '+');
};

LatexTranslator.prototype.visitMinus = function(expr) {
    this.binaryInfix(expr, '-');
};

LatexTranslator.prototype.visitTimes = function(expr) {
    var op = '{\\cdot}',
        lhs = expr.left,
        rhs = expr.right;
    
    while (lhs instanceof BinaryExpression) {
        lhs = lhs.right;
    }
    lhs = lhs.right;
    
    while (rhs instanceof BinaryExpression) {
        rhs = rhs.left;
    }
    rhs = rhs.left;
    
    if (lhs instanceof VariableExpression || rhs instanceof VariableExpression
            || lhs instanceof ConstantExpression || rhs instanceof ConstantExpression
            || rhs instanceof ParenthesesExpression) {
        op = '';
    }
    
    this.binaryInfix(expr, op);
};

LatexTranslator.prototype.visitDivide = function(expr) {
    this.latex += '\\frac{';
    expr.left.accept(this);
    this.latex += '}{';
    expr.right.accept(this);
    this.latex += '}';
};

LatexTranslator.prototype.visitExponent = function(expr) {
    expr.left.accept(this);
    this.latex += '^{';
    if (expr.right instanceof ParenthesesExpression) {
        expr.right.child.accept(this);
    } else {
        expr.right.accept(this);
    }
    this.latex += '}';
};

LatexTranslator.prototype.visitSubscript = function(expr) {
    expr.left.accept(this);
    this.latex += '_{';
    expr.right.accept(this);
    this.latex += '}';
};

LatexTranslator.prototype.visitParentheses = function(expr) {
    if (expr.parent instanceof DivideExpression) {
        expr.child.accept(this);
    } else {
        this.latex += '\\left(';
        expr.child.accept(this);
        this.latex += '\\right)';
    }
};

LatexTranslator.prototype.visitNegation = function(expr) {
    this.latex += '-';
    expr.child.accept(this);
};

LatexTranslator.prototype.visitPositive = function(expr) {
    this.latex += '+';
    expr.child.accept(this);
};

LatexTranslator.prototype.visitFactorial = function(expr) {
    expr.child.accept(this);
    this.latex += '!';
};

LatexTranslator.prototype.visitNumber = function(expr) {
    this.latex += expr.value + '';
};

LatexTranslator.prototype.visitVariable = function(expr) {
    if (undefined !== this.specialVarNames[expr.name]) {
        this.latex += '{' + this.specialVarNames[expr.name] + '}';
    } else {
        this.latex += expr.name;
    }
};

LatexTranslator.prototype.visitConstant = function(expr) {
    if (undefined !== this.constants[expr.name]) {
        this.latex += '{' + this.constants[expr.name] + '}';
    } else {
        this.latex += '\\#' + expr.name;
    }
};

LatexTranslator.prototype.visitNull = function(expr) {
    this.latex += '{}';
};
