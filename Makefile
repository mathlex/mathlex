COFFEE = coffee
CAKE = cake
NODE = node
COMPASS = compass compile
JAVA = java
PDFLATEX = pdflatex

CLOSURE_LIB = ./vendor/google-closure/compiler.jar
YUI_LIB = ./vendor/yui/yuicompressor-2.4.7.jar

BUILD = build
SRC = src


.PHONY: all
all: $(BUILD)/browser/parser.opt.min.js css/normalize.min.css css/style.min.css index.html doc/Symbols.pdf


$(BUILD):
	mkdir -p $@

$(BUILD)/render: $(BUILD)
	mkdir -p $@

$(BUILD)/browser: $(BUILD)
	mkdir -p $@


$(BUILD)/grammar.js: $(BUILD) $(SRC)/grammar.coffee
	$(COFFEE) -c -o $(@D) $(SRC)/grammar.coffee

$(BUILD)/lexer.js: $(BUILD) $(SRC)/lexer.coffee
	$(COFFEE) -c -o $(@D) $(SRC)/lexer.coffee

$(BUILD)/main.js: $(BUILD) $(SRC)/main.coffee
	$(COFFEE) -c -o $(@D) $(SRC)/main.coffee

$(BUILD)/render/latex.js: $(BUILD)/render $(SRC)/render/latex.coffee
	$(COFFEE) -c -o $(@D) $(SRC)/render/latex.coffee

$(BUILD)/render/sage.js: $(BUILD)/render $(SRC)/render/sage.coffee
	$(COFFEE) -c -o $(@D) $(SRC)/render/sage.coffee

$(BUILD)/render/text-tree.js: $(BUILD)/render $(SRC)/render/text-tree.coffee
	$(COFFEE) -c -o $(@D) $(SRC)/render/text-tree.coffee

$(BUILD)/parser.js: $(BUILD) $(BUILD)/grammar.js
	$(NODE) -e "require('fs').writeFileSync('$@', require('./$(BUILD)/grammar.js').parser.generate());"

#Cake
$(BUILD)/browser/parser.js: Cakefile $(BUILD)/browser $(addprefix $(BUILD)/,$(addsuffix .js,parser lexer main $(addprefix render/,latex sage text-tree)))
	$(CAKE) build:browser

$(BUILD)/browser/parser.opt.js: $(BUILD)/browser/parser.js
	$(JAVA) -jar $(CLOSURE_LIB) --js=$^ --js_output_file=$@

$(BUILD)/browser/parser.opt.min.js: $(BUILD)/browser/parser.opt.js
	cat $^ | $(JAVA) -jar $(YUI_LIB) --type=js > $@


css:
	mkdir -p $@


css/normalize.css: css scss/normalize.scss
	$(COMPASS) scss/normalize.scss

css/normalize.min.css: css/normalize.css
	cat $^ | $(JAVA) -jar $(YUI_LIB) --type=css > $@

css/style.css: css scss/style.scss
	$(COMPASS) scss/style.scss

css/style.min.css: css/style.css
	cat $^ | $(JAVA) -jar $(YUI_LIB) --type=css > $@


#Cake
index.html: Cakefile template.html palettes.js
	$(CAKE) build:html



doc/Symbols.pdf: doc/Symbols.tex
	cd doc && $(PDFLATEX) Symbols.tex && $(PDFLATEX) Symbols.tex



.PHONY: clean
clean:
	rm -rf $(BUILD) css index.html doc/*.{aux,log,pdf,synctex.gz}
