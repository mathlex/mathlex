function TangentFunction() {
    this.name = 'tan';
}

TangentFunction.prototype = new FunctionExpression();

TangentFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

TangentFunction.prototype.accept = function(visitor) {
    visitor.visitTangentFunction(this);
};
