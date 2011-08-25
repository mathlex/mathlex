function CosineFunction() {
    this.name = 'cos';
}

CosineFunction.prototype = new FunctionExpression();

CosineFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

CosineFunction.prototype.accept = function(visitor) {
    visitor.visitCosineFunction(this);
};
