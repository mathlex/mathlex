function TrigFunctionCollection() {}

TrigFunctionCollection.prototype = new FunctionCollection();

TrigFunctionCollection.prototype.loadFunctions = function() {
    return [
        new SineFunction(),
        new CosineFunction(),
        new TangentFunction(),
        new CosecantFunction(),
        new SecantFunction(),
        new CotangentFunction(),
        new ArcSineFunction(),
        new ArcCosineFunction(),
        new ArcTangentFunction(),
        new ArcCosecantFunction(),
        new ArcSecantFunction(),
        new ArcCotangentFunction()
    ];
};
