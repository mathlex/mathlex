function CotangentFunction() {
    this.name = 'cot';
}

CotangentFunction.prototype = new FunctionExpression();

CotangentFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

CotangentFunction.prototype.accept = function(visitor) {
    visitor.visitCotangentFunction(this);
};
