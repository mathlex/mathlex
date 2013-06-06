$ ->
  $('#power-button').on 'click', (evt) ->
    evt.preventDefault()
    if localStorage.theme is 'dark'
      localStorage.theme = 'light'
      $('body').removeClass('dark').addClass('light');
    else
      localStorage.theme = 'dark'
      $('body').removeClass('light').addClass('dark');

  if localStorage.theme? and localStorage.theme is 'light'
    $('body').addClass('light').removeClass('dark');
  else
    $('body').addClass('dark').removeClass('light');

  path = (args...) ->
    args = (arg.replace '@', '%syntaxhighlighter/scripts/' for arg in args)
    arg.replace '%', "#{PATH_PREFIX}javascripts/lib/" for arg in args

  if SyntaxHighlighter?
    SyntaxHighlighter.autoloader.apply null, path(
      'html @shBrushXml.js'
      'js @shBrushJScript.js'
      'shell @shBrushBash.js'
      'coffeescript %shBrushCoffeeScript.js'
      'python @shBrushPython.js'
      'latex %shBrushLatex.js'
    )

    $.extend SyntaxHighlighter.defaults,
      toolbar: false

    SyntaxHighlighter.all()
