var CRSR = '{%-CURSOR-%}';

module.exports.palettes = [
    {
        name: 'Syntax',
        toolbars: [
            {
                name: 'Constants',
                buttonGroups: [
                    [
                        { content: '#pi', label: '\\pi', tooltip: 'pi' },
                        { content: '#tau', label: '\\tau', tooltip: 'tau = 2*pi' },
                        { content: '#e', label: '\\mathrm{e}', tooltip: 'e' },
                        { content: '#gamma', label: '\\gamma', tooltip: 'gamma constant' },
                        { content: 'infinity', label: '\\infty', tooltip: 'infinity' },
                        { content: '#i', label: 'i', tooltip: 'imaginary unit' },
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
                        { content: '#ui', label: '\\hat\\imath', tooltip: 'x unit vector' },
                        { content: '#uj', label: '\\hat\\jmath', tooltip: 'y unit vector' },
                        { content: '#uk', label: '\\hat{k}', tooltip: 'z unit vector' },
                        { content: '#0', label: '\\mathbf{0}', tooltip: 'zero matrix' },
                        { content: '#1', label: '\\mathbf{I}', tooltip: 'identity/unit matrix' }
                    ]
                ]
            },

            {
                name: 'Greek',
                buttonGroups: [
                    [
                        { content: 'alpha', label: '\\alpha', tooltip: 'alpha' },
                        { content: 'beta', label: '\\beta', tooltip: 'beta' },
                        { content: 'gamma', label: '\\gamma', tooltip: 'gamma' },
                        { content: 'delta', label: '\\delta', tooltip: 'delta' },
                        { content: 'epsilon', label: '\\epsilon', tooltip: 'epsilon' },
                        { content: 'vepsilon', label: '\\varepsilon', tooltip: 'epsilon (alt)' },
                        { content: 'zeta', label: '\\zeta', tooltip: 'zeta' },
                        { content: 'eta', label: '\\eta', tooltip: 'eta' },
                        { content: 'theta', label: '\\theta', tooltip: 'theta' },
                        { content: 'vtheta', label: '\\vartheta', tooltip: 'theta (alt)' },
                        { content: 'iota', label: '\\iota', tooltip: 'iota' },
                        { content: 'kappa', label: '\\kappa', tooltip: 'kappa' },
                        { content: 'lambda', label: '\\lambda', tooltip: 'lambda' },
                        { content: 'mu', label: '\\mu', tooltip: 'mu' },
                        { content: 'nu', label: '\\nu', tooltip: 'nu' },
                        { content: 'xi', label: '\\xi', tooltip: 'xi' },
                        { content: 'omicron', label: 'o', tooltip: 'omicron' },
                        { content: 'pi', label: '\\pi', tooltip: 'pi' },
                        { content: 'pomega', label: '\\varpi', tooltip: 'pi (alt) "pomega"' },
                        { content: 'rho', label: '\\rho', tooltip: 'rho' },
                        { content: 'vrho', label: '\\varrho', tooltip: 'rho (alt)' },
                        { content: 'sigma', label: '\\sigma', tooltip: 'sigma' },
                        { content: 'vsigma', label: '\\varsigma', tooltip: 'sigma (alt)' },
                        { content: 'tau', label: '\\tau', tooltip: 'tau' },
                        { content: 'upsilon', label: '\\upsilon', tooltip: 'upsilon' },
                        { content: 'phi', label: '\\phi', tooltip: 'phi' },
                        { content: 'vphi', label: '\\varphi', tooltip: 'phi (alt)' },
                        { content: 'chi', label: '\\chi', tooltip: 'chi' },
                        { content: 'psi', label: '\\psi', tooltip: 'psi' },
                        { content: 'omega', label: '\\omega', tooltip: 'omega' }
                    ],
                    [
                        { content: 'Alpha', label: 'A', tooltip: 'alpha' },
                        { content: 'Beta', label: 'B', tooltip: 'beta' },
                        { content: 'Gamma', label: '\\Gamma', tooltip: 'gamma' },
                        { content: 'Delta', label: '\\Delta', tooltip: 'delta' },
                        { content: 'Epsilon', label: 'E', tooltip: 'epsilon' },
                        { content: 'Zeta', label: 'Z', tooltip: 'zeta' },
                        { content: 'Eta', label: 'H', tooltip: 'eta' },
                        { content: 'Theta', label: '\\Theta', tooltip: 'theta' },
                        { content: 'Iota', label: 'I', tooltip: 'iota' },
                        { content: 'Kappa', label: 'K', tooltip: 'kappa' },
                        { content: 'Lambda', label: '\\Lambda', tooltip: 'lambda' },
                        { content: 'Mu', label: 'M', tooltip: 'mu' },
                        { content: 'Nu', label: 'N', tooltip: 'nu' },
                        { content: 'Xi', label: '\\Xi', tooltip: 'xi' },
                        { content: 'Omicron', label: 'O', tooltip: 'omicron' },
                        { content: 'Pi', label: '\\Pi', tooltip: 'pi' },
                        { content: 'Rho', label: 'P', tooltip: 'rho' },
                        { content: 'Sigma', label: '\\Sigma', tooltip: 'sigma' },
                        { content: 'Tau', label: 'T', tooltip: 'tau' },
                        { content: 'Upsilon', label: '\\Upsilon', tooltip: 'upsilon' },
                        { content: 'Phi', label: '\\Phi', tooltip: 'phi' },
                        { content: 'Chi', label: 'X', tooltip: 'chi' },
                        { content: 'Psi', label: '\\Psi', tooltip: 'psi' },
                        { content: 'Omega', label: '\\Omega', tooltip: 'omega' }
                    ]
                ]
            },

            {
                name: 'Unary',
                buttonGroups: [
                    [
                        { content: '+', label: '+', tooltip: 'positive' },
                        { content: '-', label: '-', tooltip: 'negative' },
                        { content: '+/-', label: '\\pm', tooltip: 'positive or negative' },
                        { content: '-/+', label: '\\mp', tooltip: 'negative or positive' },
                        { content: 'sqrt('+CRSR+')', label: '\\sqrt{}', tooltip: 'square root' },
                        { content: '|: '+CRSR+' :|', label: '\\left| \\Box \\right|', tooltip: 'absolute value'},
                        { content: '!', label: '!', tooltip: 'factorial' },
                        { content: 'exp('+CRSR+')', label: '\\exp{}', tooltip: 'natural exponentiation' },
                        { content: 'ln('+CRSR+')', label: '\\ln{}', tooltip: 'natural log' },
                        { content: '&Re', label: '\\Re', tooltip: 'real part' },
                        { content: '&Im', label: '\\Im', tooltip: 'imaginary part' },
                        { content: '~', label: '\\neg', tooltip: 'logical negation' },
                        { content: 'f \'', label: 'f\'', tooltip: 'prime derivative' },
                        { content: 'x .', label: '\\dot{x}', tooltip: 'dot derivative' },
                        { content: '&D', label: '\\Delta', tooltip: 'coordinate difference' },
                        { content: '&d', label: '\\mathrm{d}', tooltip: 'differential' },
                        { content: '&pd', label: '\\partial', tooltip: 'partial differential' },
                        { content: '&v u', label: '\\vec{u}', tooltip: 'vector' },
                        { content: '&u u', label: '\\hat{u}', tooltip: 'unit vector' },
                        { content: '&del', label: '\\vec\\nabla', tooltip: 'gradient' },
                        { content: '&del.', label: '\\vec\\nabla \\cdot', tooltip: 'divergence' },
                        { content: '&delx', label: '\\vec\\nabla \\times', tooltip: 'curl' }
                    ]
                ]
            },

            {
                name: 'Binary',
                buttonGroups: [
                    [
                        { content: '+', label: '+', tooltip: 'plus' },
                        { content: '-', label: '-', tooltip: 'minus' },
                        { content: '+/-', label: '\\pm', tooltip: 'plus or minus' },
                        { content: '-/+', label: '\\mp', tooltip: 'minus or plus' },
                        { content: '*', label: '*', tooltip: 'times' },
                        { content: '/', label: '/', tooltip: 'divided by' },
                        { content: '^', label: '{}^\\wedge', tooltip: 'power' },
                        { content: 'root(a,n)', label: '\\sqrt[n]{}', tooltip: 'nth root' },
                        { content: 'log(a,b)', label: '\\log_b{a}', tooltip: 'log with base' },
                        { content: '&:', label: ':', tooltip: 'ratio' },
                        { content: ' mod ', label: '\\mathrm{mod}', tooltip: 'modulus' },
                        { content: 'n choose r', label: '\\binom{n}{r}', tooltip: 'binomial coefficient' },
                        { content: 'P(n, r)', label: 'P(n,r)', tooltip: 'permutation' },
                        { content: '@', label: '\\circ', tooltip: 'function composition' },
                        { content: '@@', label: 'f^{\circ n}', tooltip: 'function self-composition' },
                        { content: '&.', label: '\\cdot', tooltip: 'dot product' },
                        { content: '&x', label: '\\times', tooltip: 'cross product' },
                        { content: '&w', label: '\\wedge', tooltip: 'wedge product' },
                        { content: '&ox', label: '\\otimes', tooltip: 'tensor product' },
                        { content: '&*', label: '\\times', tooltip: 'cartesian product' },
                        { content: '&o+', label: '\\oplus', tooltip: 'direct sum' },
                        { content: '&_', label: '\\square_\\square', tooltip: 'subscript' },
                        { content: '&^', label: '\\square^\\square', tooltip: 'superscript' },
                        { content: ' union ', label: '\\cup', tooltip: 'union' },
                        { content: ' intersect ', label: '\\cap', tooltip: 'intersection' },
                        { content: '\\', label: '\\setminus', tooltip: 'set difference' }
                    ]
                ]
            },

            {
                name: 'Logical Connectives',
                buttonGroups: [
                    [
                        { content: '&&', label: '\\wedge', tooltip: 'logical and' },
                        { content: '||', label: '\\vee', tooltip: 'logical or' },
                        { content: ' xor ', label: '\\veebar', tooltip: 'logical exclusive or' },
                        { content: '->', label: '\\rightarrow', tooltip: 'implies' },
                        { content: '<-', label: '\\leftarrow', tooltip: 'implied by' },
                        { content: '<->', label: '\\leftrightarrow', tooltip: 'if and only if' },
                        { content: ':', label: ':', tooltip: 'such that' },
                        { content: ' forall '+CRSR+' -> ', label: '\\forall', tooltip: 'universal quantification ("for all")' },
                        { content: ' exists '+CRSR+' : ', label: '\\exists', tooltip: 'existential quantification ("there exists")' },
                        { content: ' unique '+CRSR+' : ', label: '\\exists !', tooltip: 'unique quantification ("there exists a unique")' }
                    ]
                ]
            },

            {
                name: 'Relations',
                buttonGroups: [
                    [
                        { content: '=', label: '=', tooltip: 'equal' },
                        { content: '/=', label: '\\ne', tooltip: 'not equal' },
                        { content: '<', label: '<', tooltip: 'less than' },
                        { content: '>', label: '>', tooltip: 'greater than' },
                        { content: '<=', label: '\\le', tooltip: 'less than or equal' },
                        { content: '>=', label: '\\ge', tooltip: 'greater than or equal' },
                        { content: '|', label: '\\mid', tooltip: 'divides' },
                        { content: '/|', label: '\\nmid', tooltip: 'does not divide' },
                        { content: ' :: ', label: '::', tooltip: 'ratio equality' },
                        { content: '~=', label: '\\cong', tooltip: 'congruent'},
                        { content: '~', label: '\\sim', tooltip: 'similar' },
                        { content: ' parallel ', label: '\\parallel', tooltip: 'parallel' },
                        { content: ' perp ', label: '\\perp', tooltip: 'perpendicular' },
                        { content: ' subset ', label: '\\subseteq', tooltip: 'subset' },
                        { content: ' superset ', label: '\\supseteq', tooltip: 'super set' },
                        { content: ' propsubset ', label: '\\subset', tooltip: 'proper subset' },
                        { content: ' propsuperset ', label: '\\supset ', tooltip: 'proper superset' },
                        { content: ' in ', label: '\\in', tooltip: 'inclusion' },
                        { content: '===', label: '\\equiv', tooltip: 'equivalent' },
                        { content: '/==', label: '\\not\\equiv', tooltip: 'not equivalent' }
                    ]
                ]
            },

            {
                name: 'Delimiters',
                buttonGroups: [
                    [
                        { content: '('+CRSR+')', label: '(\\,)', tooltip: 'parentheses' },
                        { content: '{'+CRSR+'}', label: '\\{\\,\\}', tooltip: 'curly braces (set)' },
                        { content: '['+CRSR+']', label: '[\\,]', tooltip: 'square brackets (list)' },
                        { content: '<: '+CRSR+' :>', label: '\\langle\\,\\rangle', tooltip: 'angle brackets (vector)' },
                        { content: '|: '+CRSR+' :|', label: '|\\,|', tooltip: 'vertical bars (abs val, length, det, norm)' },
                        { content: '||: '+CRSR+' :||', label: '\\|\\,\\|', tooltip: 'double vertical bars (norm, length)' },
                        { content: 'floor('+CRSR+')', label: '\\left\\lfloor\\,\\right\\rfloor', tooltip: 'floor' },
                        { content: 'ceil('+CRSR+')', label: '\\left\\lceil\\,\\right\\rceil', tooltip: 'ceiling' },
                        { content: ':', label: ':', tooltip: 'such that' },
                        { content: '&_', label: '\\square_\\square', tooltip: 'subscript' },
                        { content: '&^', label: '\\square^\\square', tooltip: 'superscript' },
                        { content: '<: '+CRSR+' |  :>', label: '\\left\\langle\\,\\mid\\,\\right\\rangle', tooltip: 'bra-ket' },
                        { content: '< '+CRSR+' |', label: '\\left\\langle\\,\\right|', tooltip: 'bra' },
                        { content: '| '+CRSR+' >', label: '\\left|\\,\\right\\rangle', tooltip: 'ket' }
                    ]
                ]
            },

            {
                name: 'Intervals',
                buttonGroups: [
                    [
                        { content: '(: '+CRSR+' :)', label: '\\left(\\,\\right)', tooltip: 'open' },
                        { content: '(: '+CRSR+' :]', label: '\\left(\\,\\right]', tooltip: 'half-open (left)' },
                        { content: '[: '+CRSR+' :)', label: '\\left[\\,\\right)', tooltip: 'half-open (right)' },
                        { content: '[: '+CRSR+' :]', label: '\\left[\\,\\right]', tooltip: 'closed' }
                    ]
                ]
            },

            {
                name: 'Trig Functions',
                buttonGroups: [
                    [
                        { content: 'sin('+CRSR+')', label: '\\sin{}', tooltip: 'sine function' },
                        { content: 'cos('+CRSR+')', label: '\\cos{}', tooltip: 'cosine function' },
                        { content: 'tan('+CRSR+')', label: '\\tan{}', tooltip: 'tangent function' },
                        { content: 'sec('+CRSR+')', label: '\\sec{}', tooltip: 'secant function' },
                        { content: 'csc('+CRSR+')', label: '\\csc{}', tooltip: 'cosecant function' },
                        { content: 'cot('+CRSR+')', label: '\\cot{}', tooltip: 'cotangent function' },
                        { content: 'arcsin('+CRSR+')', label: '\\arcsin{}', tooltip: 'inverse sine function' },
                        { content: 'arccos('+CRSR+')', label: '\\arccos{}', tooltip: 'inverse cosine function' },
                        { content: 'arctan('+CRSR+')', label: '\\arctan{}', tooltip: 'inverse tangent function' },
                        { content: 'arcsec('+CRSR+')', label: '\\mathrm{arcsec}', tooltip: 'inverse secant function' },
                        { content: 'arccsc('+CRSR+')', label: '\\mathrm{arccsc}', tooltip: 'inverse cosecant function' },
                        { content: 'arccot('+CRSR+')', label: '\\mathrm{arccot}', tooltip: 'inverse cotangent function' },
                    ],
                    [
                        { content: 'sinh('+CRSR+')', label: '\\sinh{}', tooltip: 'hyperbolic sine function' },
                        { content: 'cosh('+CRSR+')', label: '\\cosh{}', tooltip: 'hyperbolic cosine function' },
                        { content: 'tanh('+CRSR+')', label: '\\tanh{}', tooltip: 'hyperbolic tangent function' },
                        { content: 'sech('+CRSR+')', label: '\\mathrm{sech}', tooltip: 'hyperbolic secant function' },
                        { content: 'csch('+CRSR+')', label: '\\mathrm{csch}', tooltip: 'hyperbolic cosecant function' },
                        { content: 'coth('+CRSR+')', label: '\\coth{}', tooltip: 'hyperbolic cotangent function' },
                        { content: 'arcsinh('+CRSR+')', label: '\\mathrm{arcsinh}', tooltip: 'inverse hyperbolic sine function' },
                        { content: 'arccosh('+CRSR+')', label: '\\mathrm{arccosh}', tooltip: 'inverse hyperbolic cosine function' },
                        { content: 'arctanh('+CRSR+')', label: '\\mathrm{arctanh}', tooltip: 'inverse hyperbolic tangent function' },
                        { content: 'arcsech('+CRSR+')', label: '\\mathrm{arcsech}', tooltip: 'inverse hyperbolic secant function' },
                        { content: 'arccsch('+CRSR+')', label: '\\mathrm{arccsch}', tooltip: 'inverse hyperbolic cosecant function' },
                        { content: 'arccoth('+CRSR+')', label: '\\mathrm{arccoth}', tooltip: 'inverse hyperbolic cotangent function' }
                    ]
                ]
            },

            {
                name: 'Functions',
                buttonGroups: [
                    [
                        { content: 'abs('+CRSR+')', label: '|\\,|', tooltip: 'absolute value' },
                        { content: 'floor('+CRSR+')', label: '\\left\\lfloor\\,\\right\\rfloor', tooltip: 'floor' },
                        { content: 'ceil('+CRSR+')', label: '\\left\\lceil\\,\\right\\rceil', tooltip: 'ceiling' },
                        { content: 'sqrt('+CRSR+')', label: '\\sqrt{}', tooltip: 'square root' },
                        { content: 'root(a'+CRSR+',n)', label: '\\sqrt[n]{}', tooltip: 'nth root' },
                        { content: 'exp('+CRSR+')', label: '\\exp{}', tooltip: 'natural exponentiation' },
                        { content: 'ln('+CRSR+')', label: '\\ln{}', tooltip: 'natural log' },
                        { content: 'log(a'+CRSR+',n)', label: '\\log_n{a}', tooltip: 'log with base' },
                        { content: 'C(n'+CRSR+',r)', label: '\\binom{c}{r}', tooltip: 'bonimal coefficient (choose/combination)' },
                        { content: 'P(n'+CRSR+',r)', label: 'P(n,r)', tooltip: 'permutation' },
                        { content: '&lim &_(x=a) f', label: '\\displaystyle\\lim_{x\\to a} f', tooltip: 'limit' },
                        { content: '&df'+CRSR+'/&dx', label: '\\frac{\\mathrm{d}f}{\\mathrm{d}x}', tooltip: 'differentiation' },
                        { content: '&pdf'+CRSR+'/&pdx', label: '\\frac{\\partial f}{\\partial x}', tooltip: 'partial differentiation' },
                        { content: 'grad(&vf'+CRSR+')', label: '\\mathrm{grad}{\\left( \\vec{f} \\right)}', tooltip: 'gradient' },
                        { content: 'div(&vF'+CRSR+')', label: '\\mathrm{div}{\\left( \\vec{F} \\right)}', tooltip: 'divergence' },
                        { content: 'curl(&vF'+CRSR+')', label: '\\mathrm{curl}{\\left( \\vec{F} \\right)}', tooltip: 'curl' },
                        { content: '&int f'+CRSR+' &dx', label: '\\int f \\mathrm{d}x', tooltip: 'indefinite integration' },
                        { content: '&int &_a &^b f'+CRSR+' &dx', label: '\\int_a^b f \\mathrm{d}x', tooltip: 'definite integration' },
                        { content: '&sum &_i f', label: '\\sum_i f', tooltip: 'sum over domain set' },
                        { content: '&sum &_(i=m) &^n f', label: '\\sum_{i=m}^n f', tooltip: 'sum over range' },
                        { content: '&prod &_i f', label: '\\prod_i f', tooltip: 'product over domain set' },
                        { content: '&prod &_(i=m) &^n f', label: '\\prod_{i=m}^n f', tooltip: 'product over range' },
                        { content: '&Union &_i f', label: '\\bigcup_i f', tooltip: 'union over domain set' },
                        { content: '&Union &_(i=m) &^n f', label: '\\bigcup_{i=m}^n f', tooltip: 'union over range' },
                        { content: '&Intersect &_i f', label: '\\bigcap_i f', tooltip: 'intersection over domain set' },
                        { content: '&Intersect &_(i=m) &^n f', label: '\\bigcap_{i=m}^n f', tooltip: 'intersection over range' }
                    ]
                ]
            }
        ]
    },


    {
        name: 'Topic',
        toolbars: [
            {
                name: 'Arithmetic',
                buttonGroups: [
                    [
                        { content: '+', label: '+', tooltip: 'plus/positive' },
                        { content: '-', label: '-', tooltip: 'minus/negative' },
                        { content: '+/-', label: '\\pm', tooltip: 'plus or minus / positive or negative' },
                        { content: '-/+', label: '\\mp', tooltip: 'minus or plus / negative or positive' },
                        { content: '*', label: '*', tooltip: 'times' },
                        { content: '/', label: '/', tooltip: 'divided by' },
                        { content: '^', label: '{}^\\wedge', tooltip: 'power' },
                        { content: 'sqrt('+CRSR+')', label: '\\sqrt{}', tooltip: 'square root' },
                        { content: 'root(a'+CRSR+',n)', label: '\\sqrt[n]{}', tooltip: 'nth root' },
                        { content: 'log(a'+CRSR+',n)', label: '\\log_n{a}', tooltip: 'log with base' },
                        { content: 'exp('+CRSR+')', label: '\\exp{}', tooltip: 'natural exponentiation' },
                        { content: 'ln('+CRSR+')', label: '\\ln{}', tooltip: 'natural log' },
                        { content: '|: '+CRSR+' :|', label: '|\\,|', tooltip: 'absolute value' },
                        { content: '!', label: '!', tooltip: 'factorial' },
                        { content: '#i', label: 'i', tooltip: 'imaginary unit' },
                        { content: '&Re', label: '\\Re', tooltip: 'real part' },
                        { content: '&Im', label: '\\Im', tooltip: 'imaginary part' },
                        { content: '&:', label: ':', tooltip: 'ratio' },
                        { content: '::', label: '::', tooltip: 'ratio equality' },
                        { content: '=', label: '=', tooltip: 'equal' },
                        { content: '/=', label: '\\ne', tooltip: 'not equal' },
                        { content: '<', label: '<', tooltip: 'less than' },
                        { content: '>', label: '>', tooltip: 'greater than' },
                        { content: '<=', label: '\\le', tooltip: 'less than or equal' },
                        { content: '>=', label: '\\ge', tooltip: 'greater than or equal' },
                        { content: '('+CRSR+')', label: '(\\,)', tooltip: 'parentheses' }
                    ]
                ]
            },

            {
                name: 'Algebra',
                buttonGroups: [
                    [
                        { content: '#N', label: '\\mathbb{N}', tooltip: 'natural numbers' },
                        { content: '#Z', label: '\\mathbb{Z}', tooltip: 'integers' },
                        { content: '#Q', label: '\\mathbb{Q}', tooltip: 'rational numbers' },
                        { content: '#R', label: '\\mathbb{R}', tooltip: 'real numbers' },
                        { content: '#C', label: '\\mathbb{C}', tooltip: 'complex numbers' },
                        { content: '@', label: '\\circ', tooltip: 'function composition' },
                        { content: '@@', label: 'f^{\circ n}', tooltip: 'function self-composition' },
                        { content: '&sum &_i f', label: '\\sum_i f', tooltip: 'sum over domain set' },
                        { content: '&sum &_(i=m) &^n f', label: '\\sum_{i=m}^n f', tooltip: 'sum over range' },
                        { content: '&prod &_i f', label: '\\prod_i f', tooltip: 'product over domain set' },
                        { content: '&prod &_(i=m) &^n f', label: '\\prod_{i=m}^n f', tooltip: 'product over range' }
                    ]
                ]
            },

            {
                name: 'Geometry',
                buttonGroups: [
                    [
                        { content: '#pi', label: '\\pi', tooltip: 'pi' },
                        { content: '#tau', label: '\\tau', tooltip: 'tau = 2*pi' },
                        { content: '(: '+CRSR+' :)', label: '\\left(\\,\\right)', tooltip: 'open interval' },
                        { content: '(: '+CRSR+' :]', label: '\\left(\\,\\right]', tooltip: 'half-open interval (left)' },
                        { content: '[: '+CRSR+' :)', label: '\\left[\\,\\right)', tooltip: 'half-open interval (right)' },
                        { content: '[: '+CRSR+' :]', label: '\\left[\\,\\right]', tooltip: 'closed interval' },
                        { content: '~=', label: '\\cong', tooltip: 'congruent' },
                        { content: '~', label: '\\sim', tooltip: 'similar' },
                        { content: ' para ', label: '\\parallel', tooltip: 'parallel' },
                        { content: ' perp ', label: '\\perp', tooltip: 'perpendicular' },
                        { content: '<: '+CRSR+' :>', label: '\\langle\\,\\rangle', tooltip: 'vector brackets' },
                        { content: '&v u', label: '\\vec{u}', tooltip: 'vector' },
                        { content: '&u u', label: '\\hat{u}', tooltip: 'unit vector' },
                        { content: '|: '+CRSR+' :|', label: '|\\,|', tooltip: 'vector length' },
                        { content: '||: '+CRSR+' :||', label: '\\|\\,\\|', tooltip: 'norm / vector length' },
                        { content: '#v0', label: '\\vec{0}', tooltip: 'zero vector' },
                        { content: '#ui', label: '\\hat\\imath', tooltip: 'i unit vector' },
                        { content: '#uj', label: '\\hat\\jmath', tooltip: 'j unit vector' },
                        { content: '#uk', label: '\\hat{k}', tooltip: 'k unit vector' },
                        { content: '&.', label: '\\cdot', tooltip: 'dot product' },
                        { content: '&x', label: '\\times', tooltip: 'cross product' }
                    ]
                ]
            },

            {
                name: 'Trigonometry',
                buttonGroups: [
                    [
                        { content: 'sin('+CRSR+')', label: '\\sin{}', tooltip: 'sine function' },
                        { content: 'cos('+CRSR+')', label: '\\cos{}', tooltip: 'cosine function' },
                        { content: 'tan('+CRSR+')', label: '\\tan{}', tooltip: 'tangent function' },
                        { content: 'sec('+CRSR+')', label: '\\sec{}', tooltip: 'secant function' },
                        { content: 'csc('+CRSR+')', label: '\\csc{}', tooltip: 'cosecant function' },
                        { content: 'cot('+CRSR+')', label: '\\cot{}', tooltip: 'cotangent function' },
                        { content: 'arcsin('+CRSR+')', label: '\\arcsin{}', tooltip: 'inverse sine function' },
                        { content: 'arccos('+CRSR+')', label: '\\arccos{}', tooltip: 'inverse cosine function' },
                        { content: 'arctan('+CRSR+')', label: '\\arctan{}', tooltip: 'inverse tangent function' },
                        { content: 'arcsec('+CRSR+')', label: '\\mathrm{arcsec}', tooltip: 'inverse secant function' },
                        { content: 'arccsc('+CRSR+')', label: '\\mathrm{arccsc}', tooltip: 'inverse cosecant function' },
                        { content: 'arccot('+CRSR+')', label: '\\mathrm{arccot}', tooltip: 'inverse cotangent function' },
                    ],
                    [
                        { content: 'sinh('+CRSR+')', label: '\\sinh{}', tooltip: 'hyperbolic sine function' },
                        { content: 'cosh('+CRSR+')', label: '\\cosh{}', tooltip: 'hyperbolic cosine function' },
                        { content: 'tanh('+CRSR+')', label: '\\tanh{}', tooltip: 'hyperbolic tangent function' },
                        { content: 'sech('+CRSR+')', label: '\\mathrm{sech}', tooltip: 'hyperbolic secant function' },
                        { content: 'csch('+CRSR+')', label: '\\mathrm{csch}', tooltip: 'hyperbolic cosecant function' },
                        { content: 'coth('+CRSR+')', label: '\\coth{}', tooltip: 'hyperbolic cotangent function' },
                        { content: 'arcsinh('+CRSR+')', label: '\\mathrm{arcsinh}', tooltip: 'inverse hyperbolic sine function' },
                        { content: 'arccosh('+CRSR+')', label: '\\mathrm{arccosh}', tooltip: 'inverse hyperbolic cosine function' },
                        { content: 'arctanh('+CRSR+')', label: '\\mathrm{arctanh}', tooltip: 'inverse hyperbolic tangent function' },
                        { content: 'arcsech('+CRSR+')', label: '\\mathrm{arcsech}', tooltip: 'inverse hyperbolic secant function' },
                        { content: 'arccsch('+CRSR+')', label: '\\mathrm{arccsch}', tooltip: 'inverse hyperbolic cosecant function' },
                        { content: 'arccoth('+CRSR+')', label: '\\mathrm{arccoth}', tooltip: 'inverse hyperbolic cotangent function' }
                    ]
                ]
            },

            {
                name: 'Discrete',
                buttonGroups: [
                    [
                        { content: '#N', label: '\\mathbb{N}', tooltip: 'natural numbers' },
                        { content: '#Z', label: '\\mathbb{Z}', tooltip: 'integers' },
                        { content: '!', label: '!', tooltip: 'factorial' },
                        { content: 'floor('+CRSR+')', label: '\\left\\lfloor\\,\\right\\rfloor', tooltip: 'floor' },
                        { content: 'ceil('+CRSR+')', label: '\\left\\lceil\\,\\right\\rceil', tooltip: 'ceiling' },
                        { content: ' mod ', label: '\\mathrm{mod}', tooltip: 'modulus' },
                        { content: '|', label: '\\mid', tooltip: 'divides' },
                        { content: '/|', label: '\\nmid', tooltip: 'does not divide' },
                        { content: 'n choose r', label: '\\binom{c}{r}', tooltip: 'bonimal coefficient (choose/combination)' },
                        { content: 'P(n,r)', label: 'P(n,r)', tooltip: 'permutation' },
                        { content: '&sum &_i f', label: '\\sum_i f', tooltip: 'sum over domain set' },
                        { content: '&sum &_(i=m) &^n f', label: '\\sum_{i=m}^n f', tooltip: 'sum over range' },
                        { content: '&prod &_i f', label: '\\prod_i f', tooltip: 'product over domain set' },
                        { content: '&prod &_(i=m) &^n f', label: '\\prod_{i=m}^n f', tooltip: 'product over range' },
                        { content: '&Union &_i f', label: '\\bigcup_i f', tooltip: 'union over domain set' },
                        { content: '&Union &_(i=m) &^n f', label: '\\bigcup_{i=m}^n f', tooltip: 'union over range' },
                        { content: '&Intersect &_i f', label: '\\bigcap_i f', tooltip: 'intersection over domain set' },
                        { content: '&Intersect &_(i=m) &^n f', label: '\\bigcap_{i=m}^n f', tooltip: 'intersection over range' }
                    ]
                ]
            },

            {
                name: 'Calculus',
                buttonGroups: [
                    [
                        { content: '#pi', label: '\\pi', tooltip: 'pi' },
                        { content: '#tau', label: '\\tau', tooltip: 'tau = 2*pi' },
                        { content: '#e', label: '\\mathrm{e}', tooltip: 'e' },
                        { content: '#gamma', label: '\\gamma', tooltip: 'gamma constant' },
                        { content: ' infinity ', label: '\\infty', tooltip: 'infinity' },
                        { content: '&lim &_(x->a) f', label: '\\displaystyle\\lim_{x\\to a} f', tooltip: 'limit' },
                        { content: '&df'+CRSR+'/&dx', label: '\\frac{\\mathrm{d}f}{\\mathrm{d}x}', tooltip: 'derivative' },
                        { content: '&pdf'+CRSR+'/&pdx', label: '\\frac{\\partial f}{\\partial x}', tooltip: 'partial derivative' },
                        { content: '\'', label: 'f\'', tooltip: 'prime derivative' },
                        { content: '.', label: '\\dot{x}', tooltip: 'dot derivative' },
                        { content: '&D', label: '\\Delta', tooltip: 'change' },
                        { content: '&d', label: '\\mathrm{d}', tooltip: 'differential' },
                        { content: '&pd', label: '\\partial', tooltip: 'partial differential' },
                        { content: '&sum &_(i=1) &^n f(x&_i)*&Dx&_i', label: '\\sum_{i=1}^n f(x_i) \\Delta x_i', tooltip: 'finite sum' },
                        { content: '&int f'+CRSR+' &dx', label: '\\int f \\mathrm{d}x', tooltip: 'indefinite integration' },
                        { content: '&int &_a &^b f'+CRSR+' &dx', label: '\\int_a^b f \\mathrm{d}x', tooltip: 'definite integration' },
                        { content: '&sum &_(i=1) &^infinity a&_i', label: '\\sum_{i=1}^\\infty a_i', tooltip: 'infinite series' },
                        { content: '&.', label: '\\cdot', tooltip: 'dot product' },
                        { content: '&x', label: '\\times', tooltip: 'cross product' },
                        { content: '&w', label: '\\wedge', tooltip: 'wedge product' },
                        { content: '&del', label: '\\vec\\nabla', tooltip: 'gradient' },
                        { content: '&del.', label: '\\vec\\nabla \\cdot', tooltip: 'divergence' },
                        { content: '&delx', label: '\\vec\\nabla \\times', tooltip: 'curl' }
                    ]
                ]
            },

            {
                name: 'Logic',
                buttonGroups: [
                    [
                        { content: 'true', label: '\\mathbf{T}', tooltip: 'true' },
                        { content: 'false', label: '\\mathbf{F}', tooltip: 'false' },
                        { content: ' and ', label: '\\wedge', tooltip: 'and' },
                        { content: ' or ', label: '\\vee', tooltip: 'or' },
                        { content: ' xor ', label: '\\veebar', tooltip: 'exclusive or' },
                        { content: '~', label: '\\neg', tooltip: 'negation' },
                        { content: '->', label: '\\rightarrow', tooltip: 'implies' },
                        { content: '<-', label: '\\leftarrow', tooltip: 'implied by' },
                        { content: '<->', label: '\\leftrightarrow', tooltip: 'if and only if' },
                        { content: '===', label: '\\equiv', tooltip: 'equivalent' },
                        { content: '/==', label: '\\not\\equiv', tooltip: 'not equivalent' },
                        { content: ' forall '+CRSR+' -> ', label: '\\forall', tooltip: 'universal quantification ("for all")' },
                        { content: ' exists '+CRSR+' : ', label: '\\exists', tooltip: 'existential quantification ("there exists")' },
                        { content: ' unique '+CRSR+' : ', label: '\\exists !', tooltip: 'unique quantification ("there exists a unique")' }
                    ]
                ]
            },

            {
                name: 'Set Theory',
                buttonGroups: [
                    [
                        { content: '{ '+CRSR+' }', label: '\\{\\,\\}', tooltip: 'set delimiter' },
                        { content: ':', label: ':', tooltip: 'such that' },
                        { content: '#U', label: '\\mathbb{U}', tooltip: 'universal set' },
                        { content: '{}', label: '\\emptyset', tooltip: 'empty set' },
                        { content: '#N', label: '\\mathbb{N}', tooltip: 'natural numbers' },
                        { content: '#Z', label: '\\mathbb{Z}', tooltip: 'integer ring' },
                        { content: '#Q', label: '\\mathbb{Q}', tooltip: 'rational field' },
                        { content: '#R', label: '\\mathbb{R}', tooltip: 'real field' },
                        { content: '#C', label: '\\mathbb{C}', tooltip: 'complex field' },
                        { content: '#H', label: '\\mathbb{H}', tooltip: 'quaternion ring' },
                        { content: '#O', label: '\\mathbb{O}', tooltip: 'octonian algebra' },
                        { content: ' subset ', label: '\\subseteq', tooltip: 'subset' },
                        { content: ' superset ', label: '\\supseteq', tooltip: 'super set' },
                        { content: ' propsubset ', label: '\\subset', tooltip: 'proper subset' },
                        { content: ' propsuperset ', label: '\\supset ', tooltip: 'proper superset' },
                        { content: ' in ', label: '\\in', tooltip: 'inclusion' },
                        { content: ' union ', label: '\\cup', tooltip: 'union' },
                        { content: ' intersect ', label: '\\cap', tooltip: 'intersection' },
                        { content: '\\', label: '\\setminus', tooltip: 'set difference' },
                        { content: '&*', label: '\\times', tooltip: 'cartesian product' },
                        { content: '&o+', label: '\\oplus', tooltip: 'direct sum' },
                        { content: '&Union &_i f', label: '\\bigcup_i f', tooltip: 'union over domain set' },
                        { content: '&Union &_(i=m) &^n f', label: '\\bigcup_{i=m}^n f', tooltip: 'union over range' },
                        { content: '&Intersect &_i f', label: '\\bigcap_i f', tooltip: 'intersection over domain set' },
                        { content: '&Intersect &_(i=m) &^n f', label: '\\bigcap_{i=m}^n f', tooltip: 'intersection over range' }
                    ]
                ]
            },

            {
                name: 'Linear Algebra',
                buttonGroups: [
                    [
                        { content: '<: '+CRSR+' :>', label: '\\langle\\,\\rangle', tooltip: 'vector delimiter' },
                        { content: '#v0', label: '\\vec{0}', tooltip: 'zero vector' },
                        { content: '#ui', label: '\\hat\\imath', tooltip: 'x unit vector' },
                        { content: '#uj', label: '\\hat\\jmath', tooltip: 'y unit vector' },
                        { content: '#uk', label: '\\hat{k}', tooltip: 'z unit vector' },
                        { content: '[ '+CRSR+' ]', label: '[\\,]', tooltip: 'list/matrix delimiter' },
                        { content: '#0', label: '\\mathbf{0}', tooltip: 'zero matrix' },
                        { content: '#1', label: '\\mathbf{I}', tooltip: 'identity/unit matrix' }
                    ]
                ]
            }
        ]
    }
];
