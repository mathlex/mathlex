exports.render = render = (ast) ->
    switch ast[0]
        when 'Iff' then "#{render ast[1]} \\longleftrightarrow #{render ast[2]}"
        when 'Implies' then "#{render ast[1]} \\rightarrow #{render ast[2]}"
        when 'And' then "#{render ast[1]} \\wedge #{render ast[2]}"
        when 'Xor' then "#{render ast[1]} \\oplus #{render ast[2]}"
        when 'Or' then "#{render ast[1]} \\vee #{render ast[2]}"
        when 'Not' then "\\neg #{render ast[1]}"

        when 'Forall' then "\\forall #{render ast[1]} \\; #{render ast[2]}"
        when 'Exists' then "\\exists #{render ast[1]} \\; #{render ast[2]}"
        when 'Unique' then "\\exists ! #{render ast[1]} \\; #{render ast[2]}"

        when 'Less' then "#{render ast[1]} < #{render ast[2]}"
        when 'LessEqual' then "#{render ast[1]} \\le #{render ast[2]}"
        when 'Equal' then "#{render ast[1]} = #{render ast[2]}"
        when 'NotEqual' then "#{render ast[1]} \\ne #{render ast[2]}"
        when 'GreaterEqual' then "#{render ast[1]} \\ge #{render ast[2]}"
        when 'Greater' then "#{render ast[1]} > #{render ast[2]}"
        when 'Subset' then "#{render ast[1]} \\subseteq #{render ast[2]}"
        when 'Superset' then "#{render ast[1]} \\supseteq #{render ast[2]}"
        when 'ProperSubset' then "#{render ast[1]} \\subset #{render ast[2]}"
        when 'ProperSuperset' then "#{render ast[1]} \\supset #{render ast[2]}"
        when 'Inclusion' then "#{render ast[1]} \\in #{render ast[2]}"

        when 'Plus' then "#{render ast[1]} + #{render ast[2]}"
        when 'Minus' then "#{render ast[1]} - #{render ast[2]}"
        when 'PlusMinus' then "#{render ast[1]} \\pm #{render ast[2]}"
        when 'Times'
            varOrConstant = (ast, left) ->
                switch ast[0]
                    when 'Times', 'Modulus' then varOrConstant(ast[if left then 2 else 1], left)
                    when 'Factorial', 'Prime', 'Power', 'Subscript' then varOrConstant(ast[1], left)
                    when 'Divide', 'Parentheses', 'AbsVal', 'Vector', 'Variable', 'Constast' then true
                    else false
            op = if varOrConstant(ast[1], true) or varOrConstant(ast[2], false) then " \\, " else " \\cdot "
            (render ast[1]) + op + (render ast[2])
        when 'Divide'
            top = if ast[1][0] is 'Parentheses' then ast[1][1] else ast[1]
            bottom = if ast[2][0] is 'Parentheses' then ast[2][1] else ast[2]
            "\\frac{#{render top}}{#{render bottom}}"
        when 'Modulus' then "#{render ast[1]} \\pmod{#{render ast[2]}}"
        when 'Power' then "#{render ast[1]}^{#{render ast[2]}}"
        when 'Subscript' then "#{render ast[1]}_{#{render ast[2]}}"
        when 'DotProduct' then "#{render ast[1]} \\cdot #{render ast[2]}"
        when 'CrossProduct' then "#{render ast[1]} \\times #{render ast[2]}"
        when 'Compose' then "#{render ast[1]} \\circ #{render ast[2]}"
        when 'Union' then "#{render ast[1]} \\cup #{render ast[2]}"
        when 'Intersection' then "#{render ast[1]} \\cap #{render ast[2]}"
        when 'Positive' then "+#{render ast[1]}"
        when 'Negative' then "-#{render ast[1]}"
        when 'Factorial' then "#{render ast[1]}!"
        when 'Prime' then "#{render ast[1]}'"

        when 'Parentheses' then "\\left( #{render ast[1]} \\right)"
        when 'AbsVal' then "\\left| #{render ast[1]} \\right|"
        when 'Literal' then ast[2]
        when 'Variable' then ast[1]
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
        when 'SetBuilder'
            preds = (render pred for pred in ast[2])
            "\\left\\{ #{render ast[1]} ~|~ #{preds.join " ,\\, "} \\right\\}"

        when 'Function'
            args = (render arg for arg in ast[2])
            if ast[1][0] is 'Variable'
                switch ast[1][1]
                    when 'sqrt' then "\\sqrt{#{render ast[2][0]}}"
                    when 'sin','cos','tan','csc','sec','cot', 'ln' then "\\#{ast[1][1]}{\\left( #{args} \\right)}"
                    when 'arcsin','arccos','arctan','arccsc','arcsec','arccot' then "\\#{ast[1][1].substr 3}^{-1} \\left( #{args} \\right)"
                    when 'int'
                        bounds = if ast[2].length == 4 then "_{#{render ast[2][2]}}^{#{render ast[2][3]}}" else ''
                        "\\int#{bounds} #{render ast[2][0]} \\, \\mathrm{d}#{render ast[2][1]}"
                    when 'diff' then "\\frac{\\mathrm{d}}{\\mathrm{d}#{render ast[2][1]}} \\left( #{render ast[2][0]} \\right)"
                    when 'log'
                        base = if ast[2].length == 2 then "_{#{render ast[2][1]}}" else ''
                        "\\log#{base}{\\left( #{render ast[2][0]} \\right)}"
                    when 'lim', 'limit' then "\\lim_{#{render ast[2][1]} \\to #{render ast[2][2]}} #{render ast[2][0]}"
                    else "#{ast[1][1]} \\left( #{args} \\right)"
            else
                "#{render ast[1]} \\left( #{args.join " ,\\, "} \\right)"

        when 'Constant' then switch ast[1]
            when 'p', 'pi' then "\\pi"
            when 'gamma' then "\\gamma"
            when 'true', '&T', 't', 'T' then "\\mathbf{T}"
            when 'false', '&F', 'f', 'F' then "\\mathbf{F}"
            when 'R' then "\\mathbb{R}"
            when 'Q' then "\\mathbb{Q}"
            when 'Z' then "\\mathbb{Z}"
            when 'N' then "\\mathbb{N}"
            when 'vi' then "\\hat\\imath"
            when 'vj' then "\\hat\\jmath"
            when 'vk' then "\\hat{k}"
            else ast[1]

        else " (? #{ast[0]} ?) "