#!/bin/bash
FILES=`find src -name "*.js"`
for FILE in $FILES; do cat $FILE >> interpreter.js; done

yui -o interpreter.min.js interpreter.js
rm interpreter.js
