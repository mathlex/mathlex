function ArcSecantFunction() {
    this.name = 'arcsec';
}

ArcSecantFunction.prototype = new FunctionExpression();

ArcSecantFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

ArcSecantFunction.prototype.accept = function(visitor) {
    visitor.visitArcSecantFunction(this);
};
