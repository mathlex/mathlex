unwrap = (ast, recursive = false, rules = Parentheses: 1) ->
    if i = rules[ast[0]]
        if recursive then unwrap ast[i] else ast[i]
    else
        ast

LEFT = 'left'
RIGHT = 'right'

implicitMultiplication = (ast, immediateDir) ->
    node = unwrap ast, true,
        Times: if immediateDir is LEFT then 2 else 1
        Modulus: if immediateDir is LEFT then 2 else 1
        Vectorizer: 1
        Factorial: 1
        Prime: 1
        Exponent: 1
        Superscript: 1
        Subscript: 1

    node[0] in ['Divide', 'Parentheses', 'AbsVal', 'Vector', 'Vectorizer', 'Variable', 'Constant', 'Function']


exports.render = render = (ast) ->
    switch ast[0]
        when 'Empty' then "{}"
        when 'Iff' then "#{render ast[1]} \\leftrightarrow #{render ast[2]}"
        when 'Implies'
            if ast[3]
                "#{render ast[2]} \\leftarrow #{render ast[1]}"
            else
                "#{render ast[1]} \\rightarrow #{render ast[2]}"
        when 'And' then "#{render ast[1]} \\wedge #{render ast[2]}"
        when 'Xor' then "#{render ast[1]} \\veebar #{render ast[2]}"
        when 'Or' then "#{render ast[1]} \\vee #{render ast[2]}"
        when 'Not' then "\\neg #{render ast[1]}"

        when 'Forall' then "\\forall #{render ast[1]} \\; #{render ast[2]}"
        when 'Exists' then "\\exists #{render ast[1]} \\; #{render ast[2]}"
        when 'Unique' then "\\exists ! #{render ast[1]} \\; #{render ast[2]}"

        when 'Equivalent' then "#{render ast[1]} \\equiv #{render ast[2]}"
        when 'NotEquivalent' then "#{render ast[1]} \\not\\equiv #{render ast[2]}"

        when 'Less' then "#{render ast[1]} < #{render ast[2]}"
        when 'LessEqual' then "#{render ast[1]} \\le #{render ast[2]}"
        when 'Equal' then "#{render ast[1]} = #{render ast[2]}"
        when 'NotEqual' then "#{render ast[1]} \\ne #{render ast[2]}"
        when 'RatioEqual' then "#{render ast[1]} :: #{render ast[2]}"
        when 'Congruent' then "#{render ast[1]} \\cong #{render ast[2]}"
        when 'Similar' then "#{render ast[1]} \\sim #{render ast[2]}"
        when 'Parallel' then "#{render ast[1]} \\parallel #{render ast[2]}"
        when 'Perpendicular' then "#{render ast[1]} \\perp #{render ast[2]}"
        when 'GreaterEqual' then "#{render ast[1]} \\ge #{render ast[2]}"
        when 'Greater' then "#{render ast[1]} > #{render ast[2]}"
        when 'Subset' then "#{render ast[1]} \\subseteq #{render ast[2]}"
        when 'Superset' then "#{render ast[1]} \\supseteq #{render ast[2]}"
        when 'ProperSubset' then "#{render ast[1]} \\subset #{render ast[2]}"
        when 'ProperSuperset' then "#{render ast[1]} \\supset #{render ast[2]}"
        when 'Inclusion' then "#{render ast[1]} \\in #{render ast[2]}"
        when 'Divides' then "#{render ast[1]} \\mid #{render ast[2]}"
        when 'NotDivides' then "#{render ast[1]} \\nmid #{render ast[2]}"

        when 'Plus' then "#{render ast[1]} + #{render ast[2]}"
        when 'Minus' then "#{render ast[1]} - #{render ast[2]}"
        when 'PlusMinus' then "#{render ast[1]} \\pm #{render ast[2]}"
        when 'MinusPlus' then "#{render ast[1]} \\mp #{render ast[2]}"
        when 'Times'
            op = if implicitMultiplication(ast[1], LEFT) or implicitMultiplication(ast[2], RIGHT) then " \\, " else " \\cdot "
            (render ast[1]) + op + (render ast[2])
        when 'Divide'
            if ast[3]
                "\\frac{#{render unwrap ast[1]}}{#{render unwrap ast[2]}}"
            else
                "#{render ast[1]} / #{render ast[2]}"
        when 'Ratio' then "#{render ast[1]} : #{render ast[2]}"
        when 'Modulus' then "#{render ast[1]} \\pmod{#{render unwrap ast[2]}}"
        when 'Exponent' then "#{render ast[1]}^{#{render unwrap ast[2]}}"
        when 'Superscript'
            rhs = unwrap ast[2]
            if rhs[0] is 'List'
                elements = (render elem for elem in rhs[1])
                sup = elements.join " ,\\, "
            else
                sup = render rhs
            "#{render ast[1]}{}^{#{sup}}"
        when 'Subscript'
            rhs = unwrap ast[2]
            if rhs[0] is 'List'
                elements = (render elem for elem in rhs[1])
                sub = elements.join " ,\\, "
            else
                sub = render rhs
            "#{render ast[1]}{}_{#{sub}}"
        when 'DotProduct' then "#{render ast[1]} \\cdot #{render ast[2]}"
        when 'CrossProduct' then "#{render ast[1]} \\times #{render ast[2]}"
        when 'WedgeProduct' then "#{render ast[1]} \\wedge #{render ast[2]}"
        when 'TensorProduct' then "#{render ast[1]} \\otimes #{render ast[2]}"
        when 'Compose' then "#{render ast[1]} \\circ #{render ast[2]}"
        when 'Union' then "#{render ast[1]} \\cup #{render ast[2]}"
        when 'Intersection' then "#{render ast[1]} \\cap #{render ast[2]}"
        when 'SetDiff' then "#{render ast[1]} \\setminus #{render ast[2]}"
        when 'DirectSum' then "#{render ast[1]} \\oplus #{render ast[2]}"
        when 'CartesianProduct' then "#{render ast[1]} \\times #{render ast[2]}"

        when 'Positive' then "+#{render ast[1]}"
        when 'Negative' then "-#{render ast[1]}"
        when 'PosNeg' then "\\pm #{render ast[1]}"
        when 'NegPos' then "\\mp #{render ast[1]}"
        when 'Partial' then "\\partial #{render ast[1]}"
        when 'Differential' then "\\mathrm{d} #{render ast[1]}"
        when 'Change' then "\\Delta #{render ast[1]}"
        when 'Gradient' then "\\vec\\nabla #{render ast[1]}"
        when 'Divergence' then "\\vec\\nabla \\cdot #{render ast[1]}"
        when 'Curl' then "\\vec\\nabla \\times #{render ast[1]}"
        when 'Vectorizer'
            nextNode = unwrap ast[1], true
            if nextNode[0] is 'Variable' and nextNode[1].length is 1
                "\\vec{#{render nextNode}}"
            else
                "\\overrightarrow{#{render nextNode}}"
        when 'UnitVectorizer' then "\\hat{#{render ast[1]}}"
        when 'Factorial' then "#{render ast[1]}!"
        when 'Prime' then "#{render ast[1]}'"
        when 'DotDiff'
            depth = 1
            node = ast[1]
            start = end = ""
            while node[0] == 'DotDiff'
                depth += 1
                if depth == 4
                    start += "\\ddddot{"
                    end += "}"
                    depth = 0
                node = node[1]
            inside = start + (render node) + end
            switch depth
                when 0 then inside
                when 1 then "\\dot{#{inside}}"
                when 2 then "\\ddot{#{inside}}"
                when 3 then "\\dddot{#{inside}}"

        when 'Parentheses' then "\\left( #{render ast[1]} \\right)"
        when 'AbsVal' then "\\left| #{render ast[1]} \\right|"
        when 'Norm' then "\\left\\| #{render ast[1]} \\right\\|"

        when 'Range'
            ldelim = if ast[1] then '[' else '('
            rdelim = if ast[4] then ']' else ')'
            "\\left#{ldelim} #{render ast[2]} ,\\, #{render ast[3]} \\right#{rdelim}"
        when 'Vector'
            components = (render component for component in ast[1])
            "\\left\\langle #{components.join ",\\,"} \\right\\rangle"
        when 'EmptySet' then "\\emptyset"
        when 'Set'
            elements = (render elem for elem in ast[1])
            "\\left\\{ #{elements.join " ,\\, "} \\right\\}"
        when 'List'
            elements = (render elem for elem in ast[1])
            "\\left[ #{elements.join " ,\\, "} \\right]"
        when 'SetBuilder'
            preds = (render pred for pred in ast[2])
            "\\left\\{ #{render ast[1]} ~:~ #{preds.join " ,\\, "} \\right\\}"
        when 'Bra' then "\\left\\langle #{render ast[1]} \\right|"
        when 'Ket' then "\\left| #{render ast[1]} \\right\\rangle"
        when 'BraKet' then "\\left\\langle #{render ast[1]} \\mid #{render ast[2]} \\right\\rangle"

        when 'Integral'
            bounds = [
                if ast[3].lo? then "_{#{render unwrap ast[3].lo}}" else ""
                if ast[3].hi? then "^{#{render unwrap ast[3].hi}}" else ""
            ].join ''
            "\\int#{bounds} #{render ast[1]} \\, \\mathrm{d}#{render ast[2]}"

        when 'Function'
            args = (render arg for arg in ast[2])
            if ast[1][0] is 'Variable'
                switch ast[1][1]
                    when 'abs' then "\\left| #{render ast[2][0]} \\right|"
                    when 'sqrt' then "\\sqrt{#{render ast[2][0]}}"
                    when 'root' then "\\sqrt[#{render ast[2][1]}]{#{render ast[2][0]}}"
                    when 'sin','cos','tan','csc','sec','cot', 'ln', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'coth'
                        "\\#{ast[1][1]}{\\left( #{args} \\right)}"
                    when 'arccsc', 'arcsec', 'arccot', 'csch', 'sech', 'arcsinh', 'arccosh', 'arctanh', 'arccsch', 'arcsech', 'arccoth', 'acsc', 'asec', 'acot', 'csch', 'sech', 'asinh', 'acosh', 'atanh', 'acsch', 'asech', 'acoth'
                        "\\mathrm{#{ast[1][1]}}{\\left( #{args} \\right)}"
                    when 'int', 'integral', 'Int', 'Integral'
                        bounds = if ast[2].length == 4 then "_{#{render ast[2][2]}}^{#{render ast[2][3]}}" else ''
                        "\\int#{bounds} #{render ast[2][0]} \\, \\mathrm{d}#{render ast[2][1]}"
                    when 'diff'
                        if ast[2][0][0] in ['Variable', 'Constant']
                            "\\frac{\\mathrm{d}#{render ast[2][0]}}{\\mathrm{d}#{render ast[2][1]}}"
                        else
                            "\\frac{\\mathrm{d}}{\\mathrm{d}#{render ast[2][1]}} \\left( #{render ast[2][0]} \\right)"
                    when 'pdiff'
                        if ast[2][0][0] in ['Variable', 'Constant']
                            "\\frac{\\partial #{render ast[2][0]}}{\\partial #{render ast[2][1]}}"
                        else
                            "\\frac{\\partial}{\\partial #{render ast[2][1]}} \\left( #{render ast[2][0]} \\right)"
                    when 'grad', 'div', 'curl'
                        "\\mathrm{#{ast[1][1]}}{\\left( #{args} \\right)}"
                    when 'log'
                        base = if ast[2].length == 2 then "_{#{render ast[2][1]}}" else ''
                        "\\log#{base}{\\left( #{render ast[2][0]} \\right)}"
                    when 'exp'
                        "\\exp{\\left( #{render ast[2][0]} \\right)}"
                    when 'lim', 'limit' then "\\lim_{#{render ast[2][1]} \\to #{render ast[2][2]}} #{render ast[2][0]}"
                    when 'sum'
                        lowerBound = if ast[2].length == 4 then "#{render ast[2][1]} = #{render ast[2][2]}" else render ast[2][1]
                        upperBound = if ast[2].length == 4 then "^{#{render ast[2][3]}}" else ''
                        "\\sum_{#{lowerBound}}#{upperBound} #{render ast[2][0]}"
                    when 'prod', 'product'
                        lowerBound = if ast[2].length == 4 then "#{render ast[2][1]} = #{render ast[2][2]}" else render ast[2][1]
                        upperBound = if ast[2].length == 4 then "^{#{render ast[2][3]}}" else ''
                        "\\prod_{#{lowerBound}}#{upperBound} #{render ast[2][0]}"
                    when 'Gamma' then "\\Gamma{\\left( #{render ast[2][0]} \\right)}"
                    when 'C' then "\\binom{#{render ast[2][0]}}{#{render ast[2][1]}}"
                    when 'floor' then "\\left\\lfloor #{render ast[2][0]} \\right\\rfloor"
                    when 'ceil', 'ceiling' then "\\left\\lceil #{render ast[2][0]} \\right\\rceil"
                    else "#{ast[1][1]} \\left( #{args} \\right)"
            else
                "#{render ast[1]} \\left( #{args.join " ,\\, "} \\right)"

        when 'Literal' then ast[2]
        when 'Variable' then switch ast[1]
            when 'Alpha' then "A"
            when 'alpha' then "\\alpha"
            when 'Beta' then "B"
            when 'beta' then "\\beta"
            when 'Gamma' then "\\Gamma"
            when 'gamma' then "\\gamma"
            when 'Delta' then "\\Delta"
            when 'delta' then "\\delta"
            when 'Epsilon' then "E"
            when 'epsilon' then "\\epsilon"
            when 'vepsilon', 'epsilonv', 'varepsilon', 'epsilonvar' then "\\varepsilon"
            when 'Zeta' then "Z"
            when 'zeta' then "\\zeta"
            when 'Eta' then "H"
            when 'eta' then "\\eta"
            when 'Theta' then "\\Theta"
            when 'theta' then "\\theta"
            when 'vtheta', 'thetav', 'vartheta', 'thetavar' then "\\vartheta"
            when 'Iota' then "I"
            when 'iota' then "\\iota"
            when 'Kappa' then "K"
            when 'kappa' then "\\kappa"
            when 'Lambda' then "\\Lambda"
            when 'lambda' then "\\lambda"
            when 'Mu' then "M"
            when 'mu' then "\\mu"
            when 'Nu' then "N"
            when 'nu' then "\\nu"
            when 'Xi' then "\\Xi"
            when 'xi' then "\\xi"
            when 'Omicron' then "O"
            when 'omicron' then "o"
            when 'Pi' then "\\Pi"
            when 'pi' then "\\pi"
            when 'vpi', 'piv', 'varpi', 'pivar', 'pomega' then "\\varpi"
            when 'Rho' then "P"
            when 'rho' then "\\rho"
            when 'vrho', 'rhov', 'varrho', 'rhovar' then "\\varrho"
            when 'Sigma' then "\\Sigma"
            when 'sigma' then "\\sigma"
            when 'vsigma', 'sigmav', 'varsigma', 'sigmavar' then "\\varsigma"
            when 'Tau' then "T"
            when 'tau' then "\\tau"
            when 'Upsilon' then "\\Upsilon"
            when 'upsilon' then "\\upsilon"
            when 'Phi' then "\\Phi"
            when 'phi' then "\\phi"
            when 'vphi', 'phiv', 'varphi', 'phivar' then "\\varphi"
            when 'Chi' then "X"
            when 'chi' then "\\chi"
            when 'Psi' then "\\Psi"
            when 'psi' then "\\psi"
            when 'Omega' then "\\Omega"
            when 'omega' then "\\omega"
            else ast[1].replace /_/g, '\\_'

        when 'Constant' then switch ast[1]
            when 't', 'tau' then "\\tau"
            when 'p', 'pi' then "\\pi"
            when 'gamma' then "\\gamma"
            when 'e' then "\\mathrm{e}"
            when 'infinity' then "\\infty"
            when 'true', 'T' then "\\mathbf{T}"
            when 'false', 'F' then "\\mathbf{F}"
            when 'O' then "\\mathbb{O}"
            when 'H' then "\\mathbb{H}"
            when 'C' then "\\mathbb{C}"
            when 'R' then "\\mathbb{R}"
            when 'Q' then "\\mathbb{Q}"
            when 'Z' then "\\mathbb{Z}"
            when 'N' then "\\mathbb{N}"
            when 'U' then "\\mathbb{U}"
            when 'v0' then "\\vec{0}"
            when 'vi', 'ui' then "\\hat\\imath"
            when 'vj', 'uj' then "\\hat\\jmath"
            when 'vk', 'uk' then "\\hat{k}"
            when '0' then "\\mathbf{O}"
            when '1' then "\\mathbf{I}"
            when 'I' then "I"
            when 'empty' then "\\emptyset"
            else ast[1]

        else " (? #{ast[0]} ?) "
