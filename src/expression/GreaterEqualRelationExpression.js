function GreaterEqualRelationExpression() {}

GreaterEqualRelationExpression.prototype = new BinaryExpression();

GreaterEqualRelationExpression.prototype.accept = function(visitor) {
    visitor.visitGreaterEqualRelation(this);
};
