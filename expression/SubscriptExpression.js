function SubscriptExpression() {}

SubscriptExpression.prototype = new BinaryExpression();

SubscriptExpression.prototype.accept = function(visitor) {
    visitor.visitSubscript(this);
};