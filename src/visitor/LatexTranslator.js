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
    
    while (rhs instanceof BinaryExpression) {
        rhs = rhs.left;
    }
    
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
