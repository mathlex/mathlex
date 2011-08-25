function LimitFunction() {
    this.name = 'lim';
}

LimitFunction.prototype = new FunctionExpression();

LimitFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

LimitFunction.prototype.getVariable = function() {
    return this.getArgument(1);
};

LimitFunction.prototype.getLimit = function() {
    return this.getArgument(2);
};

LimitFunction.prototype.accept = function(visitor) {
    visitor.visitLimitFunction(this);
};
