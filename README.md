MathLex Parser and Renderer
===========================


Build Instructions
------------------

```bash
yarn
yarn build
```

Or, if you use NPM:

```bash
npm install
npm run build
```

The compiled JS files will be output in the `build` directory:

* `build/mathlex.js` contains the MathLex library.
* `build/demo/index.js` is a demonstration page that makes use of the library.

If you so desire, you can build the symbol list in `docs` using LaTeX.

Usage Documentation
-------------------

### Quick-Start ###

Include the MathLex javascript file in your HTML. I recommend putting it just
before the closing `</body>` tag, but you can put it in your `<head>` or
wherever works best for you.

    <script src="/path/to/mathlex.min.js"></script>

Suppose you have an input field somewhere in your `<body>`:

    <input type="text" id="#math-input" />

The value of this text field is easy to obtain. For example, the JS and jQuery
commands are:

    // standard JS...
    var mathText = document.getElementById('math-input').value;

    // or jQuery...
    var mathText = $('#math-input').val();

    // or whatever your preferred framework's procedure is...

`mathText` is now the name of this value, but you can use whatever name you want
(as long as it's not a [reserved keyword][js reserved]). Once you have math
input code, pass it to the `parse()` method of the  global `MathParser` object.

    var syntaxTree = MathParser.parse(mathText);

This will give back an abstract syntax tree which can then be passed to the
`render()` method.

There are currently three renderers included by default:

* `latex`: For use in typesetting (perhaps using [MathJax][]).

* `sage` (about 80% complete): Input language for the open source Sage computer
  algebra system

* `text-tree`: outputs a plain text indented tree representation of the abstract
  syntax tree (intended for debugging purposes).

Here is a sample use case for each renderer

    var latexCode = MathParser.render(syntaxTree, 'latex');
    var sageCode  = MathParser.render(syntaxTree, 'sage');
    var treeCode  = MathParser.render(syntaxTree, 'text-tree');

If using MathJax, the following code can be used to dynamically update the
display:

    // get MathJax runtime information on page load
    var mjQueue = MathJax.Hub.queue
    var mjOutBox;

    mjQueue.Push(function() {
      mjOutBox = MathJax.Hub.getAllJax('math-output')[0];
    });


    // update math-output MathJax object.
    // this code should be inside some callback function
    mjQueue.Push(['Text', mjOutBox, latexCode]);



### MathParser Object ###

The `MathParser` object has two main methods: `parse()` and `render()`. The
`parse()` method accepts input as a string of MathLex math code and outputs a
syntax tree representing the semantic value of the parsed text.

To save on computation time, only parse the input string once and then use the
corresponding  syntax tree to perform any necessary computation or rendering.
For example, the parsed tree could be used to display formatted LaTeX output
using [MathJax][] and sent to a Sage-processing server for evaluation:

    var syntaxTree = MathParser.parse($('#math-input').val());

    $('#latex-output').html(MathParser.render(syntaxTree, 'latex'));

    $.post('http://example.org/sage-processor/handle', {
      sage_code: MathParser.render(syntaxTree, 'sage')
    }, function (data) {
      // success callback
      // do something with server response.
    });


### Syntax Tree Nodes ###

When provided with a valid MathLex string, `MathParser.parse()` produces an
_abstract syntax tree_ representing the explicit, inferred value of the MathLex
code. This representative tree is built from different "node" types represented
as a recursive array.

Every node is a JavaScript array consisting of at least one element: the node's
ID. The 0-th element (i.e. `node[0]`) is always a string indicating the type of
node. The list below describes all possible nodes and their structure.

* `['Empty']`
* `['Equivalent', lhs, rhs]`
* `['NotEquivalent', lhs, rhs]`
* `['Iff', lhs, rhs]`
* `['Implies', hypothesis, conclusion, syntax_used]` (Note: `syntax_used` is a
  boolean variable indicating whether the "implies" (True) or "implied by"
  (False) syntax was used)
* `['Or', lhs, rhs]`
* `['Xor', lhs, rhs]`
* `['And', lhs, rhs]`
* `['Not', clause]`
* `['Forall', relation, quantified_statement]`
* `['Exists', relation, quantified_statement]`
* `['Unique', relation, quantified_statement]`
* `['Equal', lhs, rhs]`
* `['NotEqual', lhs, rhs]`
* `['RatioEqual', lhs, rhs]`
* `['Congruent', lhs, rhs]`
* `['Similar', lhs, rhs]`
* `['Parallel', lhs, rhs]`
* `['Perpendicular', lhs, rhs]`
* `['Less', lhs, rhs]`
* `['LessEqual', lhs, rhs]`
* `['GreaterEqual', lhs, rhs]`
* `['Greater', lhs, rhs]`
* `['Subset', lhs, rhs]`
* `['Superset', lhs, rhs]`
* `['ProperSubset', lhs, rhs]`
* `['ProperSuperset', lhs, rhs]`
* `['Inclusion', lhs, rhs]`
* `['Divides', lhs, rhs]`
* `['NotDivides', lhs, rhs]`
* `['Ratio', lhs, rhs]`
* `['PlusMinus', lhs, rhs]`
* `['MinusPlus', lhs, rhs]`
* `['Plus', lhs, rhs]`
* `['Minus', lhs, rhs]`
* `['Times', lhs, rhs]`
* `['Divide', lhs, rhs]`
* `['Modulus', lhs, rhs]`
* `['Exponent', lhs, rhs]`
* `['Superscript', lhs, rhs]`
* `['Subscript', lhs, rhs]`
* `['DotProduct', lhs, rhs]`
* `['CrossProduct', lhs, rhs]`
* `['WedgeProduct', lhs, rhs]`
* `['TensorProduct', lhs, rhs]`
* `['Compose', lhs, rhs]`
* `['Union', lhs, rhs]`
* `['Intersection', lhs, rhs]`
* `['SetDiff', lhs, rhs]`
* `['DirectSum', lhs, rhs]`
* `['CartesianProduct', lhs, rhs]`
* `['PosNeg', expr]`
* `['NegPos', expr]`
* `['Positive', expr]`
* `['Negative', expr]`
* `['Vectorizer', expr]`
* `['UnitVectorizer', expr]`
* `['Partial', expr]`
* `['Differential', expr]`
* `['Change', expr]`
* `['Gradient', expr]`
* `['Divergence', expr]`
* `['Curl', expr]`
* `['Factorial', expr]`
* `['Prime', expr]`
* `['DotDiff', expr]`
* `['Function', func_builder, arguments]`
* `['Variable', name]`
* `['Literal, type, value]` (Type is either 'Int' or 'Float')
* `['Constant', name]`
* `['Vector', components]`
* `['Bra', expr]`
* `['Ket', expr]`
* `['BraKet', lhs, rhs]`
* `['List', elements]`
* `['Range', left_inclusive, lower_bound, upper_bound, right_inclusive]` (left
  and right inclusives are boolean values)
* `['AbsVal', expr]`
* `['Norm', expr]`
* `['Parentheses', expr]`
* `['Integral', expr, differential, bounds]` (`bounds` is a JS object containing
  a `lo` index, `hi` index, both, or none)
* `['EmptySet']`
* `['Set', components]`
* `['SetBuilder', build_expr, predicates]`



### Comprehensive Example Usage ###

The following example captures input from an HTML text field, displays a
"live-updating preview" for immediate feedback, and a submit button to send the
parsed code to a Sage server.

    <body>
      <!-- ... -->

      <input type="text" id="math-input" placeholder="Type math here..." />
      <button id="process-math">Process Math</math>

      <div id="math-output"></div>

      <!-- ... -->

      <!-- javascripts -->
      <script src="/path/to/jquery.min.js"></script>
      <script src="/path/to/mathlex.min.js"></script>
      <script>
        $(document).ready(function () {
          // get MathJax output object
          var mjOutBox;
          MathJax.Hub.queue.Push(function() {
            mjOutBox = MathJax.Hub.getAllJax('math-output')[0];
          });

          // "live update" MathJax whenever a key is pressed
          $('#math-input').on('keyup', function (evt) {
            var math = $(this).val();

            if (math.length > 0) {
              try {
                var ast = MathParser.parse(math);
                var latex = MathParser.render(ast, 'latex');
                MathJax.Hub.queue.Push(['Text', mjOutBox, latex]);
              } catch (err) {
                alert('Oops. Something went wrong. Check your syntax and try again.');
              }
            }
          });

          // send output to Sage server
          $('#process-math').on('click', function (evt) {
            var math = $('#math-input').val();

            if (math.length > 0) {
              try {
                var ast = MathParser.parse(math);
                var sage = MathParser.render(ast, 'sage');

                // send data to server
                $.post('http://example.org/sage', {sage_code: sage}, function (data) {
                  // AJAX success callback
                  if (data.match(/True/)) {
                    alert('Correct!');
                  } else if (data.match(/False/)) {
                    alert('Incorrect!');
                  }
                });
              } catch (err) {
                alert('Oops. Something went wrong. Check your syntax and try again.');
              }
            }
          });
        });
      </script>
    </body>


License
=======
MathLex is licensed under the [MIT License][] and [Creative Commons
Attribution-NonCommercial-ShareAlike 3.0 Unported License][cc-by-nc-sa].

MathLex may be used for free in any personal or academic resource. If you would
like to use MathLex in a commercial product, please contact us.

For more information, please see our website at http://www.mathlex.org/license.


[Node.js]: http://nodejs.org "Standalone V8 JavaScript runtime"
[Handlebars]: http://handlebarsjs.com "Handlebars - Node.js templating system"
[Jison]: http://zaach.github.com/jison "Jison parser generator"
[uglify-js2]: http://github.com/mishoo/UglifyJS2 "JS minifier/compressor/obfuscator"
[Ruby]: http://ruby-lang.org "Ruby programming language"
[CoffeeScript]: http://coffeescript.org
[Compass]: http://compass-style.org "Compass Stylesheet Framework"
[MathJax]: http://www.mathjax.org "MathJax: Beautiful math in all browsers"
[js reserved]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Reserved_Words "Reserved JavaScript keywords"
[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US
[mit license]: https://opensource.org/licenses/MIT
