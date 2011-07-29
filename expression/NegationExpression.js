function NegationExpression() {}

NegationExpression.prototype = new BinaryExpression();

NegationExpression.prototype.accept = function(visitor) {
    visitor.visitNegation(this);
};