function FactorialExpression() {}

FactorialExpression.prototype = new UnaryExpression();

FactorialExpression.prototype.accept = function(visitor) {
    visitor.visitFactorial(this);
};