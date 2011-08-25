function IntegralFunction() {
    this.name = 'int';
}

IntegralFunction.prototype = new FunctionExpression();

IntegralFunction.prototype.hasLimits = function() {
    return this._arguments.length > 2;
};

IntegralFunction.prototype.getIntegrand = function() {
    return this.getArgument(0)
};

IntegralFunction.prototype.getIntVar = function() {
    return this.getArgument(1);
};

IntegralFunction.prototype.getLowerLimit = function() {
    return this.getArgument(2);
};

IntegralFunction.prototype.getUpperLimit = function() {
    return this.getArgument(3);
};

IntegralFunction.prototype.accept = function(visitor) {
    visitor.visitIntegralFunction(this);
};
