module.exports.palettes = [
    {
        name: 'Syntax',
        toolbars: [
            {
                name: 'Constants',
                buttons: [
                    { content: '#pi', label: '\\pi', tooltip: 'pi' },
                    { content: '#e', label: '\\mathrm{e}', tooltip: 'e' },
                    { content: '#gamma', label: '\\gamma', tooltip: 'gamma constant' },
                    { content: '#i', label: 'i', tooltip: 'imaginary number' },
                    { content: 'infinity', label: '\\infty', tooltip: 'infinity' },
                    { content: 'true', label: '\\mathbf{T}', tooltip: 'true' },
                    { content: 'false', label: '\\mathbf{F}', tooltip: 'false' },
                    { content: '#N', label: '\\mathbb{N}', tooltip: 'natural numbers' },
                    { content: '#Z', label: '\\mathbb{Z}', tooltip: 'integers' },
                    { content: '#Q', label: '\\mathbb{Q}', tooltip: 'rational numbers' },
                    { content: '#R', label: '\\mathbb{R}', tooltip: 'real numbers' },
                    { content: '#C', label: '\\mathbb{C}', tooltip: 'complex numbers' },
                    { content: '#H', label: '\\mathbb{H}', tooltip: 'quaternion numbers' },
                    { content: '#O', label: '\\mathbb{O}', tooltip: 'octonian numbers' },
                    { content: '#U', label: '\\mathbb{U}', tooltip: 'universal set' },
                    { content: '{}', label: '\\emptyset', tooltip: 'empty set' },
                    { content: '#v0', label: '\\vec{0}', tooltip: 'zero vector' },
                    { content: '#vi', label: '\\hat\\imath', tooltip: 'i unit vector' },
                    { content: '#vj', label: '\\hat\\jmath', tooltip: 'j unit vector' },
                    { content: '#vk', label: '\\hat{k}', tooltip: 'k unit vector' },
                    { content: '#0', label: '\\mathbb{O}', tooltip: 'zero matrix' },
                    { content: '#1', label: '\\mathbb{I}', tooltip: 'one matrix' }
                ]
            },
        
            {
                name: 'Unary',
                buttons: [
                    { content: '+', label: '+', tooltip: 'positive' },
                    { content: '-', label: '-', tooltip: 'negative' },
                    { content: '&pm', label: '\\pm', tooltip: 'positive or negative' },
                    { content: 'exp()', label: '\\exp{}', tooltip: 'natural exponentiation' },
                    { content: 'ln()', label: '\\ln{}', tooltip: 'natural logarithm' },
                    { content: 'sqrt()', label: '\\sqrt{}', tooltip: 'square root' },
                    { content: '!', label: '!', tooltip: 'factorial' },
                    { content: '~', label: '\\neg', tooltip: 'logical negation' },
                    { content: '&d', label: '\\mathrm{d}', tooltip: 'differential' },
                    { content: '&pd', label: '\\partial', tooltip: 'partial differential' },
                    { content: '\'', label: 'f\'', tooltip: 'prime' },
                    { content: '.', label: '\\dot{x}', tooltip: 'dot derivative' },
                    { content: '&v', label: '\\vec{u}', tooltip: 'vector' },
                    { content: '&u', label: '\\hat{u}', tooltip: 'unit vector' }
                ]
            },
        
            {
                name: 'Binary',
                buttons: [
                    { content: '+', label: '+', tooltip: 'addition' },
                    { content: '-', label: '-', tooltip: 'subtraction' },
                    { content: '&pm', label: '\\pm', tooltip: 'plus or minus' },
                    { content: '*', label: '\\cdot', tooltip: 'multiplication' },
                    { content: '/', label: '/', tooltip: 'division' },
                    { content: ' mod ', label: '\\mathrm{mod}', tooltip: 'modulus' },
                    { content: '^', label: '{}^\\wedge', tooltip: 'exponent' },
                    { content: 'log(a,b)', label: '\\log_b{a}', tooltip: 'logarithm with base' },
                    { content: 'root(a,n)', label: '\\sqrt[n]{}', tooltip: 'nth root' },
                    { content: '&_', label: '\\square_\\square', tooltip: 'subscript' },
                    { content: '&^', label: '\\square^\\square', tooltip: 'superscript' },
                    { content: ' union ', label: '\\cup', tooltip: 'union' },
                    { content: ' intersect ', label: '\\cap', tooltip: 'intersection' },
                    { content: '\\', label: '\\setminus', tooltip: 'set difference' },
                    { content: '<->', label: '\\leftrightarrow', tooltip: 'biconditional' },
                    { content: '->', label: '\\rightarrow', tooltip: 'implication' },
                    { content: '&&', label: '\\wedge', tooltip: 'logical and' },
                    { content: '||', label: '\\vee', tooltip: 'logical or' },
                    { content: ' xor ', label: '\\oplus', tooltip: 'logical exclusive or' },
                    { content: ':', label: ':', tooltip: 'such that' },
                    { content: '&.', label: '\\cdot', tooltip: 'dot product' },
                    { content: '&x', label: '\\times', tooltip: 'cross product' },
                    { content: '@', label: '\\circ', tooltip: 'function composition' }
                ]
            },
            
            {
                name: 'Relations',
                buttons: [
                    { content: '=', label: '=', tooltip: 'equal' },
                    { content: '!=', label: '\\ne', tooltip: 'not equal' },
                    { content: '<', label: '<', tooltip: 'less than' },
                    { content: '>', label: '>', tooltip: 'greater than' },
                    { content: '<=', label: '\\le', tooltip: 'less than or equal' },
                    { content: '>=', label: '\\ge', tooltip: 'greater than or equal' },
                    { content: ' propsubset ', label: '\\subset', tooltip: 'proper subset' },
                    { content: ' propsuperset ', label: '\\supset ', tooltip: 'proper superset' },
                    { content: ' subset ', label: '\\subseteq', tooltip: 'subset' },
                    { content: ' superset ', label: '\\supseteq', tooltip: 'super set' },
                    { content: ' in ', label: '\\in', tooltip: 'inclusion' },
                    { content: '===', label: '\\equiv', tooltip: 'equivalent' },
                    { content: '!==', label: '\\not\\equiv', tooltip: 'not equivalent' }
                ]
            },
        
            {
                name: 'Delimiters',
                buttons: [
                    { content: ':', label: ':', tooltip: 'such that' },
                    { content: '( )', label: '(\\,)', tooltip: 'parentheses' },
                    { content: '[ ]', label: '[\\,]', tooltip: 'square brackets (list)' },
                    { content: '{ }', label: '\\{\\,\\}', tooltip: 'curly braces (set)' },
                    { content: '<: :>', label: '\\langle\\,\\rangle', tooltip: 'angle brackets (vector)' },
                    { content: '|: :|', label: '|\\,|', tooltip: 'vertical bars (abs val)' },
                    { content: '||: :||', label: '\\|\\,\\|', tooltip: 'double vertical bars (norm / vector length)' },
                    { content: '&_', label: '\\square_\\square', tooltip: 'subscript' },
                    { content: '&^', label: '\\square^\\square', tooltip: 'superscript' }
                ]
            },
            
            {
                name: 'Intervals',
                buttons: [
                    { content: '(: :)', label: '\\left(\\,\\right)', tooltip: 'open' },
                    { content: '(: :]', label: '\\left(\\,\\right]', tooltip: 'half-open (left)' },
                    { content: '[: :)', label: '\\left[\\,\\right)', tooltip: 'half-open (right)' },
                    { content: '[: :]', label: '\\left[\\,\\right]', tooltip: 'closed' }
                ]
            },
            
            {
                name: 'Trig Functions',
                buttons: [
                    { content: 'sin()', label: '\\sin{}', tooltip: 'sine function' },
                    { content: 'cos()', label: '\\cos{}', tooltip: 'cosine function' },
                    { content: 'tan()', label: '\\tan{}', tooltip: 'tangent function' },
                    { content: 'sec()', label: '\\sec{}', tooltip: 'secant function' },
                    { content: 'csc()', label: '\\csc{}', tooltip: 'cosecant function' },
                    { content: 'cot()', label: '\\cot{}', tooltip: 'cotangent function' },
                    { content: 'arcsin()', label: '\\arcsin{}', tooltip: 'inverse sine function' },
                    { content: 'arccos()', label: '\\arccos{}', tooltip: 'inverse cosine function' },
                    { content: 'arctan()', label: '\\arctan{}', tooltip: 'inverse tangent function' },
                    { content: 'arcsec()', label: '\\mathrm{arcsec}', tooltip: 'inverse secant function' },
                    { content: 'arccsc()', label: '\\mathrm{arccsc}', tooltip: 'inverse cosecant function' },
                    { content: 'arccot()', label: '\\mathrm{arccot}', tooltip: 'inverse cotangent function' },
                    { content: 'sinh()', label: '\\sinh{}', tooltip: 'hyperbolic sine function' },
                    { content: 'cosh()', label: '\\cosh{}', tooltip: 'hyperbolic cosine function' },
                    { content: 'tanh()', label: '\\tanh{}', tooltip: 'hyperbolic tangent function' },
                    { content: 'sech()', label: '\\mathrm{sech}', tooltip: 'hyperbolic secant function' },
                    { content: 'csch()', label: '\\mathrm{csch}', tooltip: 'hyperbolic cosecant function' },
                    { content: 'coth()', label: '\\coth{}', tooltip: 'hyperbolic cotangent function' },
                    { content: 'arcsinh()', label: '\\mathrm{arcsinh}', tooltip: 'inverse hyperbolic sine function' },
                    { content: 'arccosh()', label: '\\mathrm{arccosh}', tooltip: 'inverse hyperbolic cosine function' },
                    { content: 'arctanh()', label: '\\mathrm{arctanh}', tooltip: 'inverse hyperbolic tangent function' },
                    { content: 'arcsech()', label: '\\mathrm{arcsech}', tooltip: 'inverse hyperbolic secant function' },
                    { content: 'arccsch()', label: '\\mathrm{arccsch}', tooltip: 'inverse hyperbolic cosecant function' },
                    { content: 'arccoth()', label: '\\mathrm{arccoth}', tooltip: 'inverse hyperbolic cotangent function' }
                ]
            },
        
            {
                name: 'Functions',
                buttons: [
                    { content: 'abs()', label: '|\,|', tooltip: 'absolute value' },
                    { content: 'sqrt()', label: '\\sqrt{}', tooltip: 'square root' },
                    { content: 'root(a,n)', label: '\\sqrt[n]{}', tooltip: 'nth root' },
                    { content: 'exp()', label: '\\exp{}', tooltip: 'natural exponentiation' },
                    { content: 'ln()', label: '\\ln{}', tooltip: 'natural logarithm' },
                    { content: 'log(a,b)', label: '\\log_b{a}', tooltip: 'logarithm with base' },
                    { content: 'lim(f,x,a)', label: '\\lim_{x\\to a} f', tooltip: 'limit' },
                    { content: 'diff(f,x)', label: '\\frac{\\mathrm{d}f}{\\mathrm{d}x}', tooltip: 'differentiation' },
                    { content: 'pdiff(f,x)', label: '\\frac{\\partial f}{\\partial x}', tooltip: 'partial differentiation' },
                    { content: 'int(f,x)', label: '\\int f \\mathrm{d}x', tooltip: 'indefinite integration' },
                    { content: 'int(f,x,a,b)', label: '\\int_a^b f \\mathrm{d}x', tooltip: 'definite integration' },
                    { content: 'sum(f,i)', label: '\\sum_i f', tooltip: 'sum over domain set' },
                    { content: 'sum(f,i,a,b)', label: '\\sum_{i=a}^b f', tooltip: 'sum over range' },
                    { content: 'prod(f,i)', label: '\\prod_i f', tooltip: 'product over domain set' },
                    { content: 'prod(f,i,a,b)', label: '\\prod_{i=a}^b f', tooltip: 'product over range' },
                    { content: ' forall ', label: '\\forall', tooltip: 'universal quantification ("for all")' },
                    { content: ' exists ', label: '\\exists', tooltip: 'existential quantification ("there exists")' },
                    { content: ' unique ', label: '\\exists !', tooltip: 'unique quantification ("there exists exactly one")' }
                ]
            }
        ]
    },
    
    
    {
        name: 'Topic',
        toolbars: [
            {
                name: 'Arithmetic',
                buttons: [
                    { content: '#i', label: 'i', tooltip: 'imaginary number' },
                    { content: '+', label: '+', tooltip: 'addition/positive' },
                    { content: '-', label: '-', tooltip: 'subtraction/negative' },
                    { content: '&pm', label: '\\pm', tooltip: 'plus or minus / positive or negative' },
                    { content: '*', label: '\\cdot', tooltip: 'multiplication' },
                    { content: '/', label: '/', tooltip: 'division' },
                    { content: '^', label: '{}^\\wedge', tooltip: 'exponent' },
                    { content: 'exp()', label: '\\exp{}', tooltip: 'natural exponentiation' },
                    { content: 'ln()', label: '\\ln{}', tooltip: 'natural logarithm' },
                    { content: 'log(a,b)', label: '\\log_b{a}', tooltip: 'logarithm with base' },
                    { content: 'sqrt()', label: '\\sqrt{}', tooltip: 'square root' },
                    { content: 'root(a,n)', label: '\\sqrt[n]{}', tooltip: 'nth root' },
                    { content: ' mod ', label: '\\mathrm{mod}', tooltip: 'modulus' },
                    { content: '=', label: '=', tooltip: 'equal' },
                    { content: '!=', label: '\\ne', tooltip: 'not equal' },
                    { content: '<', label: '<', tooltip: 'less than' },
                    { content: '>', label: '>', tooltip: 'greater than' },
                    { content: '<=', label: '\\le', tooltip: 'less than or equal' },
                    { content: '>=', label: '\\ge', tooltip: 'greater than or equal' },
                    { content: '( )', label: '(\\,)', tooltip: 'parentheses' },
                    { content: '|: :|', label: '|\\,|', tooltip: 'vertical bars (abs val)' },
                    { content: '!', label: '!', tooltip: 'factorial' }
                ]
            },
            
            {
                name: 'Algebra',
                buttons: [
                    { content: '#N', label: '\\mathbb{N}', tooltip: 'natural numbers' },
                    { content: '#Z', label: '\\mathbb{Z}', tooltip: 'integers' },
                    { content: '#Q', label: '\\mathbb{Q}', tooltip: 'rational numbers' },
                    { content: '#R', label: '\\mathbb{R}', tooltip: 'real numbers' },
                    { content: '#C', label: '\\mathbb{C}', tooltip: 'complex numbers' },
                    { content: '@', label: '\\circ', tooltip: 'function composition' },
                    { content: 'sum(f,i)', label: '\\sum_i f', tooltip: 'sum over domain set' },
                    { content: 'sum(f,i,a,b)', label: '\\sum_{i=a}^b f', tooltip: 'sum over range' },
                    { content: 'prod(f,i)', label: '\\prod_i f', tooltip: 'product over domain set' },
                    { content: 'prod(f,i,a,b)', label: '\\prod_{i=a}^b f', tooltip: 'product over range' }
                ]
            },
            
            {
                name: 'Geometry',
                buttons: [
                    { content: '#pi', label: '\\pi', tooltip: 'pi' },
                    { content: '(: :)', label: '\\left(\\,\\right)', tooltip: 'open interval' },
                    { content: '(: :]', label: '\\left(\\,\\right]', tooltip: 'half-open interval (left)' },
                    { content: '[: :)', label: '\\left[\\,\\right)', tooltip: 'half-open interval (right)' },
                    { content: '[: :]', label: '\\left[\\,\\right]', tooltip: 'closed interval' },
                    { content: '<: :>', label: '\\langle\\,\\rangle', tooltip: 'vector brackets' },
                    { content: '||: :||', label: '\\|\\,\\|', tooltip: 'norm / vector length' },
                    { content: '&v', label: '\\vec{u}', tooltip: 'vector' },
                    { content: '&u', label: '\\hat{u}', tooltip: 'unit vector' },
                    { content: '&.', label: '\\cdot', tooltip: 'dot product' },
                    { content: '&x', label: '\\times', tooltip: 'cross product' }
                ]
            },
            
            {
                name: 'Trigonometry',
                buttons: [
                    { content: 'sin()', label: '\\sin{}', tooltip: 'sine function' },
                    { content: 'cos()', label: '\\cos{}', tooltip: 'cosine function' },
                    { content: 'tan()', label: '\\tan{}', tooltip: 'tangent function' },
                    { content: 'sec()', label: '\\sec{}', tooltip: 'secant function' },
                    { content: 'csc()', label: '\\csc{}', tooltip: 'cosecant function' },
                    { content: 'cot()', label: '\\cot{}', tooltip: 'cotangent function' },
                    { content: 'arcsin()', label: '\\arcsin{}', tooltip: 'inverse sine function' },
                    { content: 'arccos()', label: '\\arccos{}', tooltip: 'inverse cosine function' },
                    { content: 'arctan()', label: '\\arctan{}', tooltip: 'inverse tangent function' },
                    { content: 'arcsec()', label: '\\mathrm{arcsec}', tooltip: 'inverse secant function' },
                    { content: 'arccsc()', label: '\\mathrm{arccsc}', tooltip: 'inverse cosecant function' },
                    { content: 'arccot()', label: '\\mathrm{arccot}', tooltip: 'inverse cotangent function' },
                    { content: 'sinh()', label: '\\sinh{}', tooltip: 'hyperbolic sine function' },
                    { content: 'cosh()', label: '\\cosh{}', tooltip: 'hyperbolic cosine function' },
                    { content: 'tanh()', label: '\\tanh{}', tooltip: 'hyperbolic tangent function' },
                    { content: 'sech()', label: '\\mathrm{sech}', tooltip: 'hyperbolic secant function' },
                    { content: 'csch()', label: '\\mathrm{csch}', tooltip: 'hyperbolic cosecant function' },
                    { content: 'coth()', label: '\\coth{}', tooltip: 'hyperbolic cotangent function' },
                    { content: 'arcsinh()', label: '\\mathrm{arcsinh}', tooltip: 'inverse hyperbolic sine function' },
                    { content: 'arccosh()', label: '\\mathrm{arccosh}', tooltip: 'inverse hyperbolic cosine function' },
                    { content: 'arctanh()', label: '\\mathrm{arctanh}', tooltip: 'inverse hyperbolic tangent function' },
                    { content: 'arcsech()', label: '\\mathrm{arcsech}', tooltip: 'inverse hyperbolic secant function' },
                    { content: 'arccsch()', label: '\\mathrm{arccsch}', tooltip: 'inverse hyperbolic cosecant function' },
                    { content: 'arccoth()', label: '\\mathrm{arccoth}', tooltip: 'inverse hyperbolic cotangent function' }
                ]
            },
        
            {
                name: 'Discrete',
                buttons: [
                    { content: '#N', label: '\\mathbb{N}', tooltip: 'natural numbers' },
                    { content: '#Z', label: '\\mathbb{Z}', tooltip: 'integers' },
                    { content: '!', label: '!', tooltip: 'factorial' },
                    { content: ' mod ', label: '\\mathrm{mod}', tooltip: 'modulus' },
                    { content: 'sum(f,i)', label: '\\sum_i f', tooltip: 'sum over domain set' },
                    { content: 'sum(f,i,a,b)', label: '\\sum_{i=a}^b f', tooltip: 'sum over range' },
                    { content: 'prod(f,i)', label: '\\prod_i f', tooltip: 'product over domain set' },
                    { content: 'prod(f,i,a,b)', label: '\\prod_{i=a}^b f', tooltip: 'product over range' }
                ]
            },
            
            {
                name: 'Calculus',
                buttons: [
                    { content: '#e', label: '\\mathrm{e}', tooltip: 'e' },
                    { content: '#gamma', label: '\\gamma', tooltip: 'gamma constant' },
                    { content: '#v0', label: '\\vec{0}', tooltip: 'zero vector' },
                    { content: '#vi', label: '\\hat\\imath', tooltip: 'i unit vector' },
                    { content: '#vj', label: '\\hat\\jmath', tooltip: 'j unit vector' },
                    { content: '#vk', label: '\\hat{k}', tooltip: 'k unit vector' },
                    { content: 'ln()', label: '\\ln{}', tooltip: 'natural logarithm' },
                    { content: 'exp()', label: '\\exp{}', tooltip: 'natural exponentiation' }
                ]
            },
            
            {
                name: 'Set Theory',
                buttons: [
                    { content: '#U', label: '\\mathbb{U}', tooltip: 'universal set' },
                    { content: '{}', label: '\\emptyset', tooltip: 'empty set' },
                    { content: '#N', label: '\\mathbb{N}', tooltip: 'natural numbers' },
                    { content: '#Z', label: '\\mathbb{Z}', tooltip: 'integers' },
                    { content: '#Q', label: '\\mathbb{Q}', tooltip: 'rational numbers' },
                    { content: '#R', label: '\\mathbb{R}', tooltip: 'real numbers' },
                    { content: '#C', label: '\\mathbb{C}', tooltip: 'complex numbers' },
                    { content: '#H', label: '\\mathbb{H}', tooltip: 'quaternion numbers' },
                    { content: '#O', label: '\\mathbb{O}', tooltip: 'octonian numbers' },
                    { content: ' subset ', label: '\\subseteq', tooltip: 'subset' },
                    { content: ' superset ', label: '\\supseteq', tooltip: 'super set' },
                    { content: ' propsubset ', label: '\\subset', tooltip: 'proper subset' },
                    { content: ' propsuperset ', label: '\\supset ', tooltip: 'proper superset' },
                    { content: ' in ', label: '\\in', tooltip: 'inclusion' },
                    { content: ' union ', label: '\\cup', tooltip: 'union' },
                    { content: ' intersect ', label: '\\cap', tooltip: 'intersection' },
                    { content: '\\', label: '\\setminus', tooltip: 'set difference' },
                    { content: '{ }', label: '\\{\\,\\}', tooltip: 'set delimiter' }
                ]
            },
            
            {
                name: 'Logic',
                buttons: [
                    { content: 'true', label: '\\mathbf{T}', tooltip: 'true' },
                    { content: 'false', label: '\\mathbf{F}', tooltip: 'false' },
                    { content: '===', label: '\\equiv', tooltip: 'equivalent' },
                    { content: '!==', label: '\\not\\equiv', tooltip: 'not equivalent' },
                    { content: ' forall ', label: '\\forall', tooltip: 'universal quantification ("for all")' },
                    { content: ' exists ', label: '\\exists', tooltip: 'existential quantification ("there exists")' },
                    { content: ' unique ', label: '\\exists !', tooltip: 'unique quantification ("there exists exactly one")' },
                    { content: '<->', label: '\\leftrightarrow', tooltip: 'biconditional' },
                    { content: '->', label: '\\rightarrow', tooltip: 'implication' },
                    { content: '&&', label: '\\wedge', tooltip: 'and' },
                    { content: '||', label: '\\vee', tooltip: 'or' },
                    { content: ' xor ', label: '\\oplus', tooltip: 'exclusive or' },
                    { content: '~', label: '\\neg', tooltip: 'negation' }
                ]
            },
        
            {
                name: 'Linear Algebra',
                buttons: [
                    { content: '#v0', label: '\\vec{0}', tooltip: 'zero vector' },
                    { content: '#vi', label: '\\hat\\imath', tooltip: 'i unit vector' },
                    { content: '#vj', label: '\\hat\\jmath', tooltip: 'j unit vector' },
                    { content: '#vk', label: '\\hat{k}', tooltip: 'k unit vector' },
                    { content: '#0', label: '\\mathbb{O}', tooltip: 'zero matrix' },
                    { content: '#1', label: '\\mathbb{I}', tooltip: 'one matrix' },
                    { content: '[ ]', label: '[\\,]', tooltip: 'list/matrix delimiter' },
                    { content: '<: :>', label: '\\langle\\,\\rangle', tooltip: 'vector delimiter' }
                ]
            }
        ]
    }
];