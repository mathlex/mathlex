COFFEE = coffee
CAKE = cake
NODE = node
JISON = jison
COMPASS = compass compile
JAVA = java
PDFLATEX = pdflatex

CLOSURE_LIB = ./vendor/google-closure/compiler.jar
YUI_LIB = ./vendor/yui/yuicompressor-2.4.7.jar

BUILD = build
SRC = src


.PHONY: all
all: $(BUILD)/browser/mathlex.js css/normalize.min.css css/style.min.css index.html


$(BUILD):
	mkdir -p $@

$(BUILD)/render: $(BUILD)
	mkdir -p $@

$(BUILD)/browser: $(BUILD)
	mkdir -p $@

$(BUILD)/%.js: $(SRC)/%.coffee $(BUILD)
	$(COFFEE) -c -o $(@D) $<

$(BUILD)/parser.js: $(SRC)/grammar.yy $(BUILD)
	$(JISON) $< -o $@

#Cake
$(BUILD)/browser/mathlex.raw.js: Cakefile $(BUILD)/browser $(addprefix $(BUILD)/,$(addsuffix .js,parser lexer MathLex $(addprefix render/,latex sage text-tree)))
	$(CAKE) build:browser

$(BUILD)/browser/mathlex.opt.js: $(BUILD)/browser/mathlex.raw.js
	$(JAVA) -jar $(CLOSURE_LIB) --js=$< --js_output_file=$@

$(BUILD)/browser/mathlex.js: $(BUILD)/browser/mathlex.opt.js
	cat $< | $(JAVA) -jar $(YUI_LIB) --type=js > $@


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
index.html: Cakefile template.jade palettes.js
	$(CAKE) build:html


.PHONY: docs
docs: doc/Symbols.pdf

doc/Symbols.pdf: doc/Symbols.tex
	cd doc && $(PDFLATEX) Symbols.tex && $(PDFLATEX) Symbols.tex



.PHONY: clean
clean:
	rm -rf $(BUILD) css index.html doc/*.{aux,log,pdf,synctex.gz}
