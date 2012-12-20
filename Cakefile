fs = require 'fs'
{spawn, exec} = require 'child_process'

BUILD_DIR = './build'

# run a command inside the shell
run = (prgm, args, cb) ->
    proc = spawn prgm, args
    proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
    proc.on        'exit', (status) ->
        process.exit(1) if status != 0
        cb() if typeof cb is 'function'


task 'build:html', 'compile HTML page', ->
    console.log 'building index.html...'
    jade = require 'jade'
    context = require './palettes'
    source = fs.readFileSync './template.jade'

    fs.writeFileSync 'index.html', jade.compile(source)(context)

# doesn't work
task 'build:newbrowser', 'merge scripts for inclusion in browser', ->
    browserify = require 'browserify'
    b = browserify "#{BUILD_DIR}/main.js"
    fs.writeFileSync "#{BUILD_DIR}/browser/mathlex.js", b.bundle()



task 'build:browser', 'merge scripts for inclusion in browser', ->
    code = ''
    console.log "building browser script..."
    for name in ['lexer', 'parser', 'render/latex', 'render/sage', 'render/text-tree', 'main']
        console.log "consolidating #{name} module..."
        code += """
            require['./#{name}'] = new function() {
                var exports = this;
                #{fs.readFileSync "#{BUILD_DIR}/#{name}.js"}
            };
        """
    code = """
        (function(root) {
            var MathParser = function() {
                function require(path) { return require[path]; }
                #{code}
                return require['./main'];
            }();

            if (typeof define === 'function' && define.amd) {
                define (function() { return MathParser; });
            } else {
                root.MathParser = MathParser;
            }
        }(this));
    """
    {parser, uglify} = require 'uglify-js'
    console.log "compacting code..."
    try
        code_min = uglify.gen_code uglify.ast_squeeze uglify.ast_mangle parser.parse code
    catch e
        console.error e
    run 'mkdir', ['-p', "#{BUILD_DIR}/browser"], ->
        fs.writeFileSync "#{BUILD_DIR}/browser/parser.min.js", code_min
        fs.writeFileSync "#{BUILD_DIR}/browser/parser.js", code
