function SquareRootFunction() {
    this.name = 'sqrt';
}

SquareRootFunction.prototype = new FunctionExpression();

SquareRootFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

SquareRootFunction.prototype.accept = function(visitor) {
    visitor.visitSquareRootFunction(this);
};

