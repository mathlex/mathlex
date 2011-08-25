function FunctionExpression() {
    this._arguments = [];
    this.name = '__FUNC__';
}

FunctionExpression.prototype = new Expression();

FunctionExpression.prototype.clone = function() {
    var clone = {};
    for (var i in this) {
        if (this[i] instanceof Array) {
            clone[i] = this[i].slice(0);
        } else {
            clone[i] = this[i];
        }
    }
    return clone;
};

FunctionExpression.prototype.getArgument = function(i) {
    if (i >= this._arguments.length) {
        var empty = new NullExpression();
        empty.parent = this;
        return empty;
    }
    
    return this._arguments[i]
};


FunctionExpression.prototype.addArgument = function(arg) {
    arg.parent = this;
    this._arguments.push(arg);
};

