function ExponentExpression() {
    this.base = left;
    this.power = right;
}

ExponentExpression.prototype = new BinaryExpression

ExponentExpression.prototype.accept = function(visitor) {
    visitor.visitExponent(this);
};