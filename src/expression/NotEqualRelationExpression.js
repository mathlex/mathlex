function NotEqualRelationExpression() {}

NotEqualRelationExpression.prototype = new BinaryExpression();

NotEqualRelationExpression.prototype.accept = function(visitor) {
    visitor.visitNotEqualRelation(this);
};
