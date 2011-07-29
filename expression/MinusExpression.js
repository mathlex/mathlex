function MinusExpression() {}

MinusExpression.prototype = new BinaryExpression();

MinusExpression.prototype.accept = function(visitor) {
    visitor.visitMinus(this);
};