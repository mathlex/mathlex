function ConstantExpression(n) {
    this.name = n;
}

ConstantExpression.prototype = new Expression();

ConstantExpression.prototype.accept = function(visitor) {
    visitor.visitConstant(this);
};