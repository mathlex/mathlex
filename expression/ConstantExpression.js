function ConstantExpression(n) {
    this.name = n;
};

ConstantExpression.prototpye = new Expression();

ConstantExpression.prototpye.accept = function(visitor) {
    visitor.visitConstant(this);
};