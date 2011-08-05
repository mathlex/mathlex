function TokenIterator(tokens) {
    if (tokens instanceof TokenIterator) {
        this._tokenList = tokens._tokenList;
        this._currentIndex = tokens._currentIndex;
    } else {
        this._currentIndex = 0;
        this._tokenList = tokens;
    }
}

TokenIterator.prototype.first = function() {
    this._currentIndex = 0;
};

TokenIterator.prototype.next = function() {
    this._currentIndex++;
};

TokenIterator.prototype.prev = function() {
    this._currentIndex--
};

TokenIterator.prototype.getCurrent = function() {
    return this._tokenList[this._currentIndex];
};

TokenIterator.prototype.isDone = function() {
    return (this._currentIndex >= this._tokenList.length);
};

TokenIterator.prototype.inject = function(t) {
    if (!(t instanceof Token)) {
        throw "TokenIterator.inject takes an argument of type Token";
    }
    // insert t into the _tokenList
    this._tokenList.splice(this._currentIndex, 0, t);
};
