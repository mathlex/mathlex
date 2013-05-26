fs = require 'fs'
BUILD_DIR = './build'


task 'build:html', 'compile HTML page', ->
    console.log 'building index.html...'
    fs.readFile './template.jade', (err, source) ->
        throw err if err
        jade = require 'jade'
        context = require './palettes'
        fs.writeFile 'index.html', jade.compile(source)(context)


task 'build:browser', 'merge scripts for inclusion in browser', ->
    browserify = require 'browserify'
    b = browserify "#{BUILD_DIR}/MathLex.js",
        ignore: ['file', 'system']
    fs.writeFileSync "#{BUILD_DIR}/browser/mathlex.raw.js", b.bundle()
