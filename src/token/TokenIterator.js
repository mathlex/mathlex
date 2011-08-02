function TokenIterator(tokens) {
    var currentIndex = 0;
    
    this.first = function() {
        currentIndex = 0;
    };
    
    this.next = function() {
        currentIndex++;
    };
    
    this.prev = function() {
        currentIndex--;
    };
    
    this.getCurrent = function() {
        return tokens.get(currentIndex);
    };
    
    this.isDone = function() {
        return (currentIndex >= tokens.length);
    };
}