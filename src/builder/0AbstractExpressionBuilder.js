function AbstractExpressionBuilder() {
    this._funcCollections = [];
    this._loadedFunctions = {};
}

AbstractExpressionBuilder.prototype.getFunction = function(name) {
    if (this._loadedFunctions[name] === undefined) {
        for (var c in this._funcCollections) {
            if (this._funcCollections[c].hasFunction(name)) {
                this._loadedFunctions[name] = this._funcCollections[c].getFunction(name);
                break;
            }
        }
    }
    return (this._loadedFunctions[name] !== undefined) ? this._loadedFunctions[name].clone() : null;
};

AbstractExpressionBuilder.prototype.addFunctionCollection = function(collection) {
    this._funcCollections.push(collection);
};


AbstractExpressionBuilder.prototype.newLessRelation = function(left, right) {
    console.log('AbstractExpressionBuilder.newLessRelation() is not implemented');
};

AbstractExpressionBuilder.prototype.newLessEqualRelation = function(left, right) {
    console.log('AbstractExpressionBuilder.newLessEqualRelation() is not implemented');
};

AbstractExpressionBuilder.prototype.newEqualRelation = function(left, right) {
    console.log('AbstractExpressionBuilder.newEqualRelation() is not implemented');
};

AbstractExpressionBuilder.prototype.newNotEqualRelation = function(left, right) {
    console.log('AbstractExpressionBuilder.newNotEqualRelation() is not implemented');
};

AbstractExpressionBuilder.prototype.newGreaterEqualRelation = function(left, right) {
    console.log('AbstractExpressionBuilder.newGreaterEqualRelation() is not implemented');
};

AbstractExpressionBuilder.prototype.newGreaterRelation = function(left, right) {
    console.log('AbstractExpressionBuilder.newGreaterRelation() is not implemented');
};

AbstractExpressionBuilder.prototype.newPlus = function(left, right) {
    console.log('AbstractExpressionBuilder.newPlus() is not implemented');
};

AbstractExpressionBuilder.prototype.newMinus = function(left, right) {
    console.log('AbstractExpressionBuilder.newMinus() is not implemented');
};

AbstractExpressionBuilder.prototype.newTimes = function(left, right) {
    console.log('AbstractExpressionBuilder.newTimes() is not implemented');
};

AbstractExpressionBuilder.prototype.newDivide = function(left, right) {
    console.log('AbstractExpressionBuilder.newDivide() is not implemented');
};

AbstractExpressionBuilder.prototype.newExponent = function(base, power) {
    console.log('AbstractExpressionBuilder.newExponent() is not implemented');
};

AbstractExpressionBuilder.prototype.newSubscript = function(base, index) {
    console.log('AbstractExpressionBuilder.newSubscript() is not implemented');
};

AbstractExpressionBuilder.prototype.newParentheses = function(subExpr) {
    console.log('AbstractExpressionBuilder.newParentheses() is not implemented');
};

AbstractExpressionBuilder.prototype.newAbsoluteValue = function(subExpr) {
    console.log('AbstractExpressionBuilder.newAbsoluteValue() is not implemented');
};

AbstractExpressionBuilder.prototype.newNegation = function(subExpr) {
    console.log('AbstractExpressionBuilder.newNegation() is not implemented');
};

AbstractExpressionBuilder.prototype.newPositive = function(subExpr) {
    console.log('AbstractExpressionBuilder.newPositive() is not implemented');
};

AbstractExpressionBuilder.prototype.newFactorial = function(subExpr) {
    console.log('AbstractExpressionBuilder.newFactorial() is not implemented');
};

AbstractExpressionBuilder.prototype.newNumber = function(value) {
    console.log('AbstractExpressionBuilder.newNumber() is not implemented');
};

AbstractExpressionBuilder.prototype.newVariable = function(name) {
    console.log('AbstractExpressionBuilder.newVariable() is not implemented');
};

AbstractExpressionBuilder.prototype.newConstant = function(name) {
    console.log('AbstractExpressionBuilder.newConstant() is not implemented');
};

AbstractExpressionBuilder.prototype.newNull = function() {
    console.log('AbstractExpressionBuilder.newNull() is not implemented');
};

AbstractExpressionBuilder.prototype.newFunction = function(name, args) {
    console.log('AbstractExpressionBuilder.newFunction() is not implemented');
};

