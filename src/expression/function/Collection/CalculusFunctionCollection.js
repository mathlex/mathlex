function CalculusFunctionCollection() {}

CalculusFunctionCollection.prototype = new FunctionCollection();

CalculusFunctionCollection.prototype.loadFunctions = function() {
    return [
        new LimitFunction(),
        new DerivativeFunction(),
        new IntegralFunction()
    ];
};
