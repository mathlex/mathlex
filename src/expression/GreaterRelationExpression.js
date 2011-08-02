function GreaterRelationExpression() {}

GreaterRelationExpression.prototype = new BinaryExpression();

GreaterRelationExpression.prototype.accept = function(visitor) {
    visitor.visitGreaterRelation(this);
};
