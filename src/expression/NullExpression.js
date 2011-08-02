function NullExpression() {}

NullExpression.prototype = new Expression();

NullExpression.prototype.accept = function(visitor) {
    visitor.visitNull(this);
};
