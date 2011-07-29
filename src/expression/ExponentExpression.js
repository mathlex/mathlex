function ExponentExpression() {}

ExponentExpression.prototype = new BinaryExpression

ExponentExpression.prototype.accept = function(visitor) {
    visitor.visitExponent(this);
};