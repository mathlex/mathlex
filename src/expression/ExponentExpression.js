function ExponentExpression() {
    this.base = this.left;
    this.power = this.right;
}

ExponentExpression.prototype = new BinaryExpression

ExponentExpression.prototype.accept = function(visitor) {
    visitor.visitExponent(this);
};