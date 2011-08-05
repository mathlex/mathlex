function AbsoluteValueExpression() {}

AbsoluteValueExpression.prototype = new UnaryExpression();

AbsoluteValueExpression.prototype.accept = function(visitor) {
    visitor.visitAbsoluteValue(this);
};
