function BasicFunctionCollection() {}

BasicFunctionCollection.prototype = new FunctionCollection();

BasicFunctionCollection.prototype.loadFunctions = function() {
    return [
        new SquareRootFunction(),
        new RadicalFunction()
    ];
};
