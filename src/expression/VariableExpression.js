function VariableExpression(n) {
    this.name = n;
};

VariableExpression.prototype = new Expression();

VariableExpression.prototype.accept = function(visitor) {
    visitor.visitVariable(this);
};