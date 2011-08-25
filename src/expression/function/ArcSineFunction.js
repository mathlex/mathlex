function ArcSineFunction() {
    this.name = 'arcsin';
}

ArcSineFunction.prototype = new FunctionExpression();

ArcSineFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

ArcSineFunction.prototype.accept = function(visitor) {
    visitor.visitArcSineFunction(this);
};
