function PositiveExpression() {}

PositiveExpression.prototype = new UnaryExpression();

PositiveExpression.prototype.accept = function(visitor) {
    visitor.visitPositive(this);
};
