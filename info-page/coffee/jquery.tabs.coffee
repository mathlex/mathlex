$ = jQuery

$.fn.tabs = (options) -> @each ->
  thiz = $ @
  thiz.find('nav li a').on 'click', (evt) ->
    evt.preventDefault()
    thiz = $ @
    thiz.closest('nav').find('a').removeClass 'current'
    thiz.closest('nav').siblings('.content').children().hide()
    $(thiz.addClass('current').attr('href')).show()
  $(thiz.find('nav li:first-child a').addClass('current').attr('href')).show()
