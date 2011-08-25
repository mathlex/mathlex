function FunctionCollection() {
    this._prototypes = null;
}

FunctionCollection.prototype._initFunctions = function() {
    this._prototypes = []
    var funcs = this.loadFunctions();
    for (var f in funcs) {
        this._prototypes[funcs[f].name] = funcs[f];
    }
};

FunctionCollection.prototype.loadFuncions = function() {
    return [];
};

FunctionCollection.prototype.hasFunction = function(name) {
    if (null === this._prototypes) {
        this._initFunctions();
    }
    return this._prototypes[name] !== undefined
};

FunctionCollection.prototype.getFunction = function(name) {
    if(!this.hasFunction(name)) {
        throw 'Function ' + name + ' is not in this collection';
    }
    return this._prototypes[name];
};
