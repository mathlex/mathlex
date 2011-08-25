function ExpressionBuilder() {}

ExpressionBuilder.prototype = new AbstractExpressionBuilder();

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

ExpressionBuilder.prototype.newLessRelation = function(left, right) {
    return buildBinaryExpression(new LessRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newLessEqualRelation = function(left, right) {
    return buildBinaryExpression(new LessEqualRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newEqualRelation = function(left, right) {
    return buildBinaryExpression(new EqualRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newNotEqualRelation = function(left, right) {
    return buildBinaryExpression(new NotEqualRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newGreaterEqualRelation = function(left, right) {
    return buildBinaryExpression(new GreaterEqualRelationExpression(), left, right);
};

ExpressionBuilder.prototype.newGreaterRelation = function(left, right) {
    return buildBinaryExpression(new GreaterRelationExpression(), left, right);
};

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

ExpressionBuilder.prototype.newAbsoluteValue = function(subExpr) {
    return buildUnaryExpression(new AbsoluteValueExpression(), subExpr);
};

ExpressionBuilder.prototype.newNegation = function(subExpr) {
    return buildUnaryExpression(new NegationExpression(), subExpr);
};

ExpressionBuilder.prototype.newPositive = function(subExpr) {
    return buildUnaryExpression(new PositiveExpression(), subExpr);
};

ExpressionBuilder.prototype.newFactorial = function(subExpr) {
    return buildUnaryExpression(new FactorialExpression(), subExpr);
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

ExpressionBuilder.prototype.newNull = function() {
    return new NullExpression();
};

ExpressionBuilder.prototype.newFunction = function(name, args) {
    func = this.getFunction(name);
    if (null == func) {
        return this.newNull();
    }
    
    for (arg in args) {
        func.addArgument(args[arg]);
    }
    
    return func;
};
