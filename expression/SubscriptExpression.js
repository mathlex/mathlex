function SubscriptExpression() {
    this.base = this.left;
    this.index = this.right;
}

SubscriptExpression.prototype = new BinaryExpression();

SubscriptExpression.prototype.accept = function(visitor) {
    visitor.visitSubscript(this);
};