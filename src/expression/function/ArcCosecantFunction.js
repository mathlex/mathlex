function ArcCosecantFunction() {
    this.name = 'arccsc';
}

ArcCosecantFunction.prototype = new FunctionExpression();

ArcCosecantFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

ArcCosecantFunction.prototype.accept = function(visitor) {
    visitor.visitArcCosecantFunction(this);
};
