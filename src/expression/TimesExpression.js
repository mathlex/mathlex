function TimesExpression() {}

TimesExpression.prototype = new BinaryExpression();

TimesExpression.prototype.accept = function(visitor) {
    visitor.visitTimes(this);
};