function NumberExpression(val) {
    this.value = val;
}

NumberExpression.prototype = new Expression();

NumberExpression.prototype.accept = function(visitor) {
    visitor.visitNumber(this);
};