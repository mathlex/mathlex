function Interpreter() {
    this._tokenizer = new Tokenizer();
    this._builder = new ExpressionBuilder();
    this._parser = new Parser(this._builder);
    
    this._builder.addFunctionCollection(new BasicFunctionCollection());
    this._builder.addFunctionCollection(new TrigFunctionCollection());
    this._builder.addFunctionCollection(new CalculusFunctionCollection());
}

Interpreter.prototype.accept = function(visitor) {
    if (null === this._parser.parseTree) {
        return;
    }
    this._parser.parseTree.accept(visitor);
};

Interpreter.prototype.interpret = function(input) {
    this._tokenizer.tokenize(input);
    this._parser.parse(this._tokenizer.getIterator());
};

