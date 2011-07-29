function PlusExpression() {}

PlusExpression.prototype = new BinaryExpression();

PlusExpression.prototype.accept = function(visitor) {
    visitor.visitPlus(this);
};