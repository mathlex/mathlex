unwrap = (ast, recursive = false, rules = Parentheses: 1) ->
    if i = rules[ast[0]]
        if recursive then unwrap ast[i] else ast[i]
    else
        ast

variables = []

render = (ast) ->
    sagecode = switch ast[0]
        when 'Empty' then ""
        when 'Iff' then "((not #{render ast[1]} and not #{render ast[2]}) or (#{render ast[1]} and #{render ast[2]}))"
        # | P | Q | P->Q |
        # |---|---|------|
        # | F | F |  T   |
        # | F | T |  T   |
        # | T | F |  F   |
        # | T | T |  T   |
        # `---'---'------'
        #
        # P->Q is true when p'q' + p'q + pq
        #                   p'(q' + q) + pq
        #                   p' + pq
        # this is correct.
        when 'Implies' then "((not #{render ast[1]}) or (#{render ast[1]} and #{render ast[2]}))" # was this right? It's just bugging me now.
        when 'And' then "(#{render ast[1]} and #{render ast[2]})"
        when 'Xor' then "(#{render ast[1]} ^^ #{render ast[2]})"
        when 'Or' then "(#{render ast[1]} or #{render ast[2]})"
        when 'Not' then "(not #{render ast[1]})"

        when 'Forall' then "all((#{render ast[1]}) for x in #{render ast[2]})"
        when 'Exists' then "any((#{render ast[1]}) for x in #{render ast[2]})"
        when 'Unique' then "[(#{render ast[1]}) for x in #{render ast[2]}].count(True)==1" # Ex: [(x^2>70) for x in xrange(10)].count(True)==1 where ast[1] = x^2>70 and ast[2] is [0..9]

        when 'Equivalent', 'Equal', 'RatioEqual' then "(#{render ast[1]} == #{render ast[2]})"
        when 'NotEquivalent', 'NotEqual' then "(#{render ast[1]} != #{render ast[2]})"
        when 'Congruent' then "" #TODO: congruent
        when 'Similar' then "" #TODO: similar
        when 'Parallel' then "" #TODO: parallel
        when 'Perpendicular' then "" #TODO: perpendicular

        when 'Less' then "#{render ast[1]} < #{render ast[2]}"
        when 'LessEqual' then "#{render ast[1]} <= #{render ast[2]}"
        when 'GreaterEqual' then "#{render ast[1]} >= #{render ast[2]}"
        when 'Greater' then "#{render ast[1]} > #{render ast[2]}"
        when 'Subset' then "Set(#{render ast[1]}).issubset(Set(#{render ast[2]}))"
        when 'Superset' then "Set(#{render ast[1]}).issuperset(Set(#{render ast[2]}))"
        when 'ProperSubset' then "(Set(#{render ast[1]}).issubset(Set(#{render ast[2]})) and Set(#{render ast[1]})!=Set(#{render ast[2]}))"
        when 'ProperSuperset' then "(Set(#{render ast[1]}).issuperset(Set(#{render ast[2]})) and Set(#{render ast[1]})!=Set(#{render ast[2]}))"
        when 'Inclusion' then "#{render ast[1]} in #{render ast[2]}"

        # a|b === b is divisible by a
        when 'Divides' then "(#{render ast[2]})%(#{render ast[1]})==0"
        when 'NotDivides' then "(#{render ast[2]})%(#{render ast[1]})!=0"


        when 'Plus' then "#{render ast[1]} + #{render ast[2]}"
        when 'Minus' then "#{render ast[1]} - #{render ast[2]}"
        when 'Times' then "#{render ast[1]} * #{render ast[2]}"

        # a::b as c::d  <==> a/b == c/d
        when 'Divide', 'Ratio' then "(#{render unwrap ast[1]})/(#{render unwrap ast[2]})"

        when 'Modulus' then "#{render ast[1]}%#{render unwrap ast[2]}"
        when 'Exponent' then "#{render ast[1]}^(#{render unwrap ast[2]})"
#        when 'Subscript' then "show(var(\"#{render ast[1]}_#{render unwrap ast[2]}\"))"
#        when 'Subscript' then "show(var(\"#{render ast[1]}_#{render unwrap ast[2]}\"))"
        when 'DotProduct' then "(#{render ast[1]}).dot_product(#{render ast[2]})"
        when 'CrossProduct' then "(#{render ast[1]}).cross_product(#{render ast[2]})"
        when 'WedgeProduct' then "from sage.tensor.differential_form_element import wedge; wedge(#{render ast[1]}, #{render ast[2]})" #TODO: wedge product
        when 'TensorProduct' then "(#{render ast[1]}).tensor_product(#{render ast[2]})" #TODO: tensor product
        when 'Compose' then "f(x)=#{render ast[1]}; f(#{render ast[2]})"
        when 'Union' then "union(#{render ast[1]}, #{render ast[2]})"
        when 'Intersection' then "Set(#{render ast[1]}).intersection(Set(#{render ast[2]}))"
        when 'SetDiff' then "Set(#{render ast[1]}).difference(Set(#{render ast[2]}))"
        when 'DirectSum' then "DirectSumOfCrystals([#{render ast[1]}, #{render ast[2]}])" #TODO: direct sum
        when 'CartesianProduct' then "CartesianProduct(#{render ast[1]}, #{render ast[2]}).list()"

        when 'Positive' then "+#{render ast[1]}"
        when 'Negative' then "-#{render ast[1]}"
        when 'Partial' then "diff(#{render ast[1]}, #{render ast[2]})" # 1 = func, 2 = var
        when 'Differential' then "diff(#{render ast[1]})"
        when 'Change' then "" #TODO: change (delta)
        when 'Gradient' then "(#{render ast[1]}).gradient()" #TODO: gradient
        when 'Divergence' then "" #TODO: divergence
        when 'Curl' then "" #TODO: curl
        when 'Vectorizer' then render ast[1]
        when 'UnitVectorizer' then "(#{render ast[1]})/(#{render ast[1]}).norm()" # TODO: unit vectorizer
        when 'Factorial' then "factorial(#{render ast[1]})"
        when 'Prime' then "diff(#{render ast[1]})"
        when 'DotDiff' then "diff(#{render ast[1]})"
        when 'Parentheses' then "(#{render ast[1]})"
        when 'AbsVal' then "abs(#{render ast[1]})"
        when 'Norm' then "norm(#{render ast[1]})"

        when 'Range'
            ldelim = if ast[1] then '[' else '('
            include = if ast[1] then '' else '+1'
            rdelim = if ast[4] then ']' else ')'
            include2 = if ast[4] then '+1' else ''
            "range(#{render ast[2]}#{include},#{render ast[3]}#{include2})"
        when 'Vector' # ****
            components = (render component for component in ast[1])
            "vector([#{components.join ","}])"
        when 'EmptySet' then "Set(None)"
        when 'Set'
            elements = (render elem for elem in ast[1])
            "Set([#{elements.join ","}])"
        when 'List'
            elements = (render elem for elem in ast[1])
            "[#{elements.join ","}]"
        when 'SetBuilder' # can use Subsets(), subsets(), or Set()? ***********
            preds = (render pred for pred in ast[2])
            "\\left\\{ #{render ast[1]} ~#{if ast[3] then '|' else ':'}~ #{preds.join " ,\\, "} \\right\\}"
        when 'Bra' then "" #TODO: bra
        when 'Ket' then "" #TODO: ket
        when 'BraKet' then "" #TODO: bra-ket

        when 'Integral'
            bounds = [
                if ast[3].lo? then render ast[3].lo else 'None'
                if ast[3].hi? then render ast[3].hi else 'None'
            ].join ','
            "integral(#{render ast[1]},#{render ast[2]},#{bounds})"

        when 'Function'
            args = (render arg for arg in ast[2])
            if ast[1][0] is 'Variable'
                switch ast[1][1]
                    when 'abs' then "abs(#{render ast[2][0]})"
                    when 'sqrt' then "sqrt(#{render ast[2][0]})"
                    when 'root' then "(#{render ast[2][0]})^(1/#{render ast[2][1]})" # Assuming nth root (correct)
                    when 'sin','cos','tan','csc','sec','cot', 'ln', 'arcsin', 'arccos', 'arctan', 'arccsc', 'arcsec', 'arccot'
                        "#{ast[1][1]}(#{render ast[2][0]})"
                    when 'int'
                        bounds = if ast[2].length == 4 then "#{render ast[2][2]},#{render ast[2][3]}" else ''
                        "integral(#{render ast[2][0]},#{render ast[2][1]},#{bounds})"
                    when 'diff' then "diff(#{render ast[2][0]},#{render ast[2][1]})"
                    when 'pdiff' then "diff(#{render ast[2][0]},#{render ast[2][1]})"

                    when 'log'
                        base = if ast[2].length == 2 then "_{#{render ast[2][1]}}" else ''
                        "log(#{render ast[2][0]},#{base})"
                    when 'exp'
                        "exp(#{render ast[2][0]})"
                    when 'lim', 'limit' then "limit(#{render ast[2][0]}, #{render ast[2][1]}=#{render ast[2][2]})"
                    when 'sum'
                        lowerBound = if ast[2].length == 4 then "#{render ast[2][2]}" else render ast[2][1]
                        upperBound = if ast[2].length == 4 then "#{render ast[2][3]}" else ''
                        "sum(#{render ast[2][0]}, #{render ast[2][1]}, #{lowerBound}, #{upperBound})"
                    when 'prod', 'product'
                        lowerBound = if ast[2].length == 4 then "#{render ast[2][1]} = #{render ast[2][2]}" else render ast[2][1]
                        upperBound = if ast[2].length == 4 then "^{#{render ast[2][3]}}" else ''
                        "\\prod_{#{lowerBound}}#{upperBound} #{render ast[2][0]}" # ***** Can't find documentation yet
                    when 'Gamma' then "gamma(#{render ast[2][0]})"
                    when 'C' then "binomial(#{render ast[2][0]}, #{render ast[2][1]})"
                    when 'P' then "factorial(#{render ast[2][1]})*binomial(#{render ast[2][0]}, #{render ast[2][1]})"
                    when 'floor' then "floor(#{render ast[2][0]})"
                    when 'ceil', 'ceiling' then "ceil(#{render ast[2][0]})"
                    else "#{ast[1][1]} \\left( #{args} \\right)"
            else
                "#{render ast[1]} \\left( #{args.join " ,\\, "} \\right)"

        when 'Literal' then ast[2]
        when 'Variable'
            variables.push if ast[1] not in variables
            ast[1]

        when 'Constant' then switch ast[1]
            when 'p', 'pi' then "pi"
            when 'gamma' then "euler_gamma"
            when 'e' then "e"
            when 'infinity' then "infinity"
            when 'true', 't', 'T' then "True"
            when 'false', 'f', 'F' then "False"
            when 'O' then "\\mathbb{O}" # ***
            when 'H' then "\\mathbb{H}" # ***
            when 'C' then "Set(CC)"
            when 'R' then "Set(RR)"
            when 'Q' then "Set(QQ)"
            when 'Z' then "Set(ZZ)"
            when 'N' then "Set(NN)"
            when 'v0' then "vector([0,0,0])"
            when 'ui', 'vi' then "vector([1,0,0])"
            when 'uj', 'vj' then "vector([0,1,0])"
            when 'uk', 'vk' then "vector([0,0,1])"
            when '0' then "zero_matrix(#{nrows},#{ncols})" # how do we know size ?
            when '1' then "identity_matrix(#{n})" # how do we know `n` (size) ?
            when 'empty' then "Set(none)"
            else ast[1]

        else " (? #{ast[0]} ?) "

exports.render = (ast) ->
    sagecode = render ast
    decls = ("#{name} = var('#{name}');" for name in variables)
    decls.join(" ") + sagecode;
