fs = require 'fs'
BUILD_DIR = './build'
DEMO_DIR = './demo'


task 'build:html', 'compile HTML page', ->
    console.log "building #{DEMO_DIR}/index.html..."
    fs.readFile "#{DEMO_DIR}/template.jade", (err, source) ->
        throw err if err
        jade = require 'jade'
        context = require "#{DEMO_DIR}/palettes"
        fs.writeFile "#{DEMO_DIR}/index.html", jade.compile(source)(context)


task 'build:browser', 'merge scripts for inclusion in browser', ->
    browserify = require 'browserify'
    b = browserify "#{BUILD_DIR}/MathLex.js",
        ignore: ['file', 'system']
    fs.writeFileSync "#{BUILD_DIR}/browser/mathlex.raw.js", b.bundle()
