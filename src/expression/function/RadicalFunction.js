function RadicalFunction() {
    this.name = 'root';
}

RadicalFunction.prototype = new FunctionExpression();

RadicalFunction.prototype.getExpression = function() {
    return this.getArgument(0);
};

RadicalFunction.prototype.getRoot = function() {
    return this.getArgument(1);
};


RadicalFunction.prototype.accept = function(visitor) {
    visitor.visitRadicalFunction(this);
};

