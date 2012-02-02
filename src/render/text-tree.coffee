repeat = (str, num) ->
    new Array(num+1).join str

indent = '    '

exports.render = render = (ast, depth) ->
    depth or= 0
    out = repeat indent, depth;
    
    switch ast[0]
        when 'Literal' then out += "#{ast[0]}: #{ast[2]}\n"
        when 'Parentheses' then out = render ast[1], depth
        when 'Set', 'Vector', 'List'
            out += "#{ast[0]}\n"
            out += render elem, depth+1 for elem in ast[1]
        when 'Range'
            out += "#{ast[0]} (#{if ast[1] then 'inclusive' else 'exclusive'}-#{if ast[4] then 'inclusive' else 'exclusive'}):\n"
            out += render ast, depth+1 for ast in ast[2..3]
        when 'Function'
            args = "#{repeat indent, depth+1}Arguments:\n"
            args += render arg, depth+2 for arg in ast[2]
            out += "#{ast[0]}\n#{repeat indent, depth+1}Builder:\n#{render ast[1], depth+2}#{args}"
        when 'Variable', 'Constant'
            out += "#{ast[0]}: #{ast[1]}\n"
        else
            out += "#{ast[0]}\n"
            out += render child, depth+1 for child in ast.slice 1 when child instanceof Array
    out