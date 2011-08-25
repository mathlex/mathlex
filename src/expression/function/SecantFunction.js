function SecantFunction() {
    this.name = 'sec';
}

SecantFunction.prototype = new FunctionExpression();

SecantFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

SecantFunction.prototype.accept = function(visitor) {
    visitor.visitSecantFunction(this);
};
