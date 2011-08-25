function CosecantFunction() {
    this.name = 'csc';
}

CosecantFunction.prototype = new FunctionExpression();

CosecantFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

CosecantFunction.prototype.accept = function(visitor) {
    visitor.visitCosecantFunction(this);
};
