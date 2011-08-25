function ArcCosineFunction() {
    this.name = 'arccos';
}

ArcCosineFunction.prototype = new FunctionExpression();

ArcCosineFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

ArcCosineFunction.prototype.accept = function(visitor) {
    visitor.visitArcCosineFunction(this);
};
