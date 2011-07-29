function DivideExpression() {}

DivideExpression.prototype = new BinaryExpression();

DivideExpression.prototype.accept = function(visitor) {
    visitor.visitDivide(this);
};