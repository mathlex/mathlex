function BinaryExpression() {
    this.left = null;
    this.right = null;
};

BinaryExpression.prototype = new Expression();