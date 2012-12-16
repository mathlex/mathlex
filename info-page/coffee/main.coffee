path = (args...) ->
  arg.replace '@', 'javascripts/lib/syntaxhighlighter/scripts/' for arg in args

SyntaxHighlighter.autoloader.apply null, path(
  'html @shBrushXml.js'
  'js @shBrushJScript.js'
)

SyntaxHighlighter.all()
