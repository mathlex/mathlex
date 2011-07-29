function Expression() {
    this.parent = null;
}

Expression.prototype.accept = function(visitor){
    console.log('Expression.accept() not implemented');
};


function UnaryExpression() {
    this.child = null;
};

UnaryExpression.prototype = new Expression();


function BinaryExpression() {
    this.left = null;
    this.right = null;
};

BinaryExpression.prototype = new Expression();