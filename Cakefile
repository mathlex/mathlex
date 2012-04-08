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


task 'build', 'compile CoffeeScript files', ->
    files = ['grammar', 'lexer', 'main', 'render/latex', 'render/text-tree']
    for file in files
        console.log "compiling src/#{file}.coffee..."
        idx = file.lastIndexOf '/'
        odir = if idx > 0 then "/#{file.substr 0, idx}" else ''
        run 'coffee', ['-c', '-o', BUILD_DIR + odir, "src/#{file}.coffee"]


task 'build:html', 'compile HTML page', ->
    console.log "building index.html..."
    Handlebars = require 'handlebars'
    context = require './palettes.js'
    source = fs.readFileSync './template.html'
    
    Handlebars.registerHelper 'slugify', (str) ->
        str.toLowerCase().replace /\s+/g, '_'
    
    fs.writeFileSync 'index.html', Handlebars.compile(source.toString())(context)

task 'build:frontend', 'compile frontend interface', ->
    console.log "building index.html..."
    Handlebars = require 'handlebars'
    context = require './palettes.js'
    source = fs.readFileSync './template.html'
    
    Handlebars.registerHelper 'slugify', (str) ->
        str.toLowerCase().replace /\s+/g, '_'
    
    fs.writeFileSync 'index.html', Handlebars.compile(source.toString())(context)
    
    console.log "building CSS..."
    less = require 'less'
    files = fs.readdirSync './less'
    run 'mkdir', ['-p', "./css"], ->
        for file in files when file.match /\.less$/
            console.log "compiling #{file}..."
            parser = new less.Parser
                paths: ['./less']
                filename: file
            data = fs.readFileSync "./less/#{file}"
            parser.parse data.toString(), (err, tree) ->
                return console.log err if err
                dest = "./css/#{file.replace /\.less$/, '.min.css'}"
                fs.writeFileSync dest, tree.toCSS { compress: true }


task 'build:parser', 'rebuild Jison parser (run build first)', ->
    require 'jison'
    parser = require("#{BUILD_DIR}/grammar").parser
    console.log "building parser..."
    fs.writeFileSync "#{BUILD_DIR}/parser.js", parser.generate()


task 'build:browser', 'merge scripts for inclusion in browser', ->
    code = ''
    console.log "building browser script..."
    for name in ['lexer', 'parser', 'render/latex', 'render/text-tree', 'main']
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
    code_min = uglify.gen_code uglify.ast_squeeze uglify.ast_mangle parser.parse code
    run 'mkdir', ['-p', "#{BUILD_DIR}/browser"], ->
        fs.writeFileSync "#{BUILD_DIR}/browser/parser.min.js", code_min
        fs.writeFileSync "#{BUILD_DIR}/browser/parser.js", code


task 'clean', 'remove build files', ->
    run 'rm', ['-rf', BUILD_DIR, './css', 'index.html', 'doc/*.{aux,log,pdf,synctex.gz}']
