function LatexTranslator() {
    this.translatedString = '';
    
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
        'p': '\\p',
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

LatexTranslator.prototype.latex = function() {
    return translatedString;
};

LatexTranslator.prototype.visitPlus = function(expr) {
    expr.left.accept(this);
    translatedString += '+';
    expr.right.accept(this);
};

LatexTranslator.prototype.visitMinus = function(expr) {
    expr.left.accept(this);
    translatedString += '-';
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
    translatedString += op;
    expr.right.accept(this);
};

LatexTranslator.prototype.visitDivide = function(expr) {
    translatedString += '\\frac{';
    expr.left.accept(this);
    translatedString += '}{';
    expr.right.accept(this);
    translatedString += '}';
};

LatexTranslator.prototype.visitExponent = function(expr) {
    expr.base.accept(this);
    translatedString += '^{';
    expr.power.accept(this);
    translatedString += '}';
};

LatexTranslator.prototype.visitSubscript = function(expr) {
    expr.base.accept(this);
    translatedString += '^{';
    expr.index.accept(this);
    translatedString += '}';
};

LatexTranslator.prototype.visitParentheses = function(expr) {
    if (expr.parent instanceof DivideExpression) {
        expr.child.accept(this);
    } else {
        translatedString += '\\left(';
        expr.child.accept(this);
        translatedString += '\\right)';
    }
};

LatexTranslator.prototype.visitNegation = function(expr) {
    translatedString += '-';
    expr.child.accept(this);
};

LatexTranslator.prototype.visitNumber = function(expr) {
    translatedString += expr.value + '';
};

LatexTranslator.prototype.visitVariable = function(expr) {
    if (undefined !== specialVarNames[expr.name]) {
        translatedString += '{' + specialVarNames[expr.name] + '}';
    } else {
        translatedString += expr.name;
    }
};

LatexTranslator.prototype.visitConstant = function(expr) {
    if (undefined !== constants[expr.name]) {
        translatedString += '{' + constants[expr.name] + '}';
    } else {
        translatedString += '\\#' + expr.name;
    }
};