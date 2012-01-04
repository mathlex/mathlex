repeat = (str, num) ->
    new Array(num+1).join str

indent = '    '

exports.render = render = (ast, depth) ->
    depth or= 0
    out = repeat indent, depth;
    
    switch ast[0]
        when 'Literal' then out += "#{ast[0]}: #{ast[2]}\n"
        when 'Parentheses' then out = render ast[1], depth
        when 'Set', 'Vector'
            out += "#{ast[0]}\n"
            out += render elem, depth+1 for elem in ast[1]
        when 'Function'
            args = "#{repeat indent, depth+1}Arguments:\n"
            args += render arg, depth+2 for arg in ast[2]
            out += "#{ast[0]}\n#{repeat indent, depth+1}Builder:\n#{render ast[1], depth+2}#{args}"
        when 'Variable', 'Constant'
            out += "#{ast[0]}: #{ast[1]}\n"
        else
            out += "#{ast[0]}\n"
            out += render child, depth+1 for child in ast.splice 1
    out