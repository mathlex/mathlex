function LessEqualRelationExpression() {}

LessEqualRelationExpression.prototype = new BinaryExpression();

LessEqualRelationExpression.prototype.accept = function(visitor) {
    visitor.visitLessEqualRelation(this);
};
