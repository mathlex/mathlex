function EqualRelationExpression() {}

EqualRelationExpression.prototype = new BinaryExpression();

EqualRelationExpression.prototype.accept = function(visitor) {
    visitor.visitEqualRelation(this);
};