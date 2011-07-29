function ParenthesesExpression() {}

ParenthesesExpression.prototype = new UnaryExpression();

ParenthesesExpression.prototype.accept = function(visitor) {
    visitor.visitParentheses(this);
};