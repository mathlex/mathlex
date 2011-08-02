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

LatexTranslator.prototype.visitPlus = function(expr) {
    expr.left.accept(this);
    this.latex += '+';
    expr.right.accept(this);
};

LatexTranslator.prototype.visitMinus = function(expr) {
    expr.left.accept(this);
    this.latex += '-';
    expr.right.accept(this);
};

LatexTranslator.prototype.visitTimes = function(expr) {
    var op = '{\\cdot}';
    if (expr.left instanceof VariableExpression || expr.right instanceof VariableExpression
            || expr.left instanceof ConstantExpression || expr.right instanceof ConstantExpression
            || expr.right instanceof ParenthesesExpression) {
        op = '';
    }
    expr.left.accept(this);
    this.latex += op;
    expr.right.accept(this);
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
    expr.right.accept(this);
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