function LessRelationExpression() {}

LessRelationExpression.prototype = new BinaryExpression();

LessRelationExpression.prototype.accept = function(visitor) {
    visitor.visitLessRelation(this);
};
