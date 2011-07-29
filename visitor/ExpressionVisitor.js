function ExpressionVisitor() {}

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

ExpressionVisitor.prototype.visitNumber = function(expr) {
    console.log("visitNumber not implemented");
};

ExpressionVisitor.prototype.visitVariable = function(expr) {
    console.log("visitVariable not implemented");
};

ExpressionVisitor.prototype.visitConstant = function (expr) {
    console.log("visitConstant not implemented")
};