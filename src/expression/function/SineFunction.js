function SineFunction() {
    this.name = 'sin';
}

SineFunction.prototype = new FunctionExpression();

SineFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

SineFunction.prototype.accept = function(visitor) {
    visitor.visitSineFunction(this);
};
