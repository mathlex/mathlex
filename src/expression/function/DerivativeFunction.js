function DerivativeFunction() {
    this.name = 'diff';
}

DerivativeFunction.prototype = new FunctionExpression();

DerivativeFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

DerivativeFunction.prototype.getDiffVar = function() {
    return this.getArgument(1);
};

DerivativeFunction.prototype.accept = function(visitor) {
    visitor.visitDerivativeFunction(this);
};
