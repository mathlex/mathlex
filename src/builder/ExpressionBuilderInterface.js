function ExpressionBuilderInterface() {}

ExpressionBuilderInterface.prototype.newPlus = function(left, right) {
    console.log('ExpressionBuilderInterface.newPlus() is not implemented');
};

ExpressionBuilderInterface.prototype.newMinus = function(left, right) {
    console.log('ExpressionBuilderInterface.newMinus() is not implemented');
};

ExpressionBuilderInterface.prototype.newTimes = function(left, right) {
    console.log('ExpressionBuilderInterface.newTimes() is not implemented');
};

ExpressionBuilderInterface.prototype.newDivide = function(left, right) {
    console.log('ExpressionBuilderInterface.newDivide() is not implemented');
};

ExpressionBuilderInterface.prototype.newExponent = function(base, power) {
    console.log('ExpressionBuilderInterface.newExponent() is not implemented');
};

ExpressionBuilderInterface.prototype.newSubscript = function(base, index) {
    console.log('ExpressionBuilderInterface.newSubscript() is not implemented');
};

ExpressionBuilderInterface.prototype.newParentheses = function(subExpr) {
    console.log('ExpressionBuilderInterface.newParentheses() is not implemented');
};

ExpressionBuilderInterface.prototype.newNegation = function(subExpr) {
    console.log('ExpressionBuilderInterface.newNegation() is not implemented');
};

ExpressionBuilderInterface.prototype.newNumber = function(value) {
    console.log('ExpressionBuilderInterface.newNumber() is not implemented');
};

ExpressionBuilderInterface.prototype.newVariable = function(name) {
    console.log('ExpressionBuilderInterface.newVariable() is not implemented');
};

ExpressionBuilderInterface.prototype.newConstant = function(name) {
    console.log('ExpressionBuilderInterface.newConstant() is not implemented');
};