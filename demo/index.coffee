require './scss/normalize.scss'
require './scss/style.scss'

$ = require 'jquery'
MathLex = require 'mathlex'

require './js/jquery.textarea-expander'
require './js/cursor'

CURSOR_ID = '{%-CURSOR-%}'

$(document).ready ->
  mathInput  = $ '#math_input'
  mathOutput = $ '#math_output'
  astOutput  = $ '#ast_output'
  sageOutput = $ '#sage_output'
  rawOutput  = $ '#tex_output'
  mjQueue  = MathJax.Hub.queue
  mjOutBox   = null

  mjQueue.Push -> mjOutBox = MathJax.Hub.getAllJax('math_output')[0]

  class ParserProxy
    constructor: -> @memo = {}
    parse: (mlCode) ->
      if mlCode of @memo then @memo[mlCode]
      else @memo[mlCode] = MathLex.parse(mlCode);

  pp = new ParserProxy()

  updateMath = (math) ->
    mathOutput.css {color: '#000'}

    try
      if math.length > 0
        # attempt to parse input and display LaTeX
        ast = pp.parse math
        latex = MathLex.render ast, 'latex'
        mjQueue.Push ['Text', mjOutBox, "\\displaystyle{#{latex}}"]
        rawOutput.html "<pre>#{latex}<\/pre>"
        astOutput.html "<pre>#{MathLex.render ast, 'text-tree'}<\/pre>"
        sageOutput.html "<pre>#{MathLex.render ast, 'sage'}<\/pre>"
      else
        mjQueue.Push ['Text', mjOutBox, "\\displaystyle{\\mathrm{\\LaTeX\\ Output}}"]
        rawOutput.html '<code>Raw LaTeX Output<\/code>'
        astOutput.html '<code>Parse Tree<\/code>'
        sageOutput.html '<code>Sage Output<\/code>'
    catch err
      # if we encounter a parse error, change color of output box
      mathOutput.css {color: '#f00'}
      throw err

  $('code.math a').on 'click', (evt) ->
    math = $(@).text()
    mathInput.val math
    updateMath math

  # keyup binding to input text box
  mathInput.on 'keyup', (evt) -> updateMath $(@).val()
  mathInput.val ''
  #mathInput.focus()

  # clear button
  $('a.delete-icon').on 'click', (evt) ->
    evt.preventDefault()
    mathInput.val ''
    mathInput.TextAreaExpander();
    updateMath ''

  # toolbars
  $('.toolbars .ribbon .tabs a').on 'click', (evt) ->
    evt.preventDefault()
    thiz = $ @
    thiz.toggleClass('open').parent().siblings(thiz.data('target')).toggleClass('open').slideToggle(200)

  $('.toolbar a[data-content]').on 'click', (evt) ->
    evt.preventDefault()
    element = document.getElementById('math_input')
    math = $(@).data('content')

    # is there a cursor position?
    cursorOffset = math.indexOf CURSOR_ID
    math = math.replace CURSOR_ID, ''

    insertPos = insertAtCursor element, math, false

    cursorOffset = math.length if cursorOffset <= 0
    setCursorPosition element, insertPos + cursorOffset

    updateMath mathInput.val()
