function ArcTangentFunction() {
    this.name = 'arctan';
}

ArcTangentFunction.prototype = new FunctionExpression();

ArcTangentFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

ArcTangentFunction.prototype.accept = function(visitor) {
    visitor.visitArcTangentFunction(this);
};
