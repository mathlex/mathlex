function ExpressionBuilder() {}

ExpressionBuilder.prototype = new ExpressionBuilderInterface();

function buildUnaryExpression(uExpr, child) {
    child.parent = uExpr;
    uExpr.child = child;
    return uExpr;
}

function buildBinaryExpression(bExpr, left, right) {
    left.parent = bExpr;
    right.parent = bExpr;
    bExpr.left = left;
    bExpr.right = right;
    return bExpr;
}

ExpressionBuilder.prototype.newPlus = function(left, right) {
    return buildBinaryExpression(new PlusExpression(), left, right);
};

ExpressionBuilder.prototype.newMinus = function(left, right) {
    return buildBinaryExpression(new MinusExpression(), left, right);
};

ExpressionBuilder.prototype.newTimes = function(left, right) {
    return buildBinaryExpression(new TimesExpression(), left, right);
};

ExpressionBuilder.prototype.newDivide = function(left, right) {
    return buildBinaryExpression(new DivideExpression(), left, right);
};

ExpressionBuilder.prototype.newExponent = function(base, power) {
    return buildBinaryExpression(new ExponentExpression(), base, power);
};

ExpressionBuilder.prototype.newSubscript = function(base, index) {
    return buildBinaryExpression(new SubscriptExpression(), base, index);
};

ExpressionBuilder.prototype.newParentheses = function(subExpr) {
    return buildUnaryExpression(new ParenthesesExpression(), subExpr);
};

ExpressionBuilder.prototype.newNegation = function(subExpr) {
    return buildUnaryExpression(new NegationExpression(), subExpr);
};

ExpressionBuilder.prototype.newNumber = function(value) {
    return new NumberExpression(value);
};

ExpressionBuilder.prototype.newVariable = function(name) {
    return new VariableExpression(name);
};

ExpressionBuilder.prototype.newConstant = function(name) {
    return new ConstantExpression(name);
};
