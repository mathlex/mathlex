function ArcCotangentFunction() {
    this.name = 'arccot';
}

ArcCotangentFunction.prototype = new FunctionExpression();

ArcCotangentFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

ArcCotangentFunction.prototype.accept = function(visitor) {
    visitor.visitArcCotangentFunction(this);
};
