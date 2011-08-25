function Expression() {
    this.parent = null;
}

Expression.prototype.accept = function(visitor){
    console.log('Expression.accept() not implemented');
};