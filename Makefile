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
DEMO = demo



.PHONY: mathlex
mathlex: $(BUILD)/browser/mathlex.js


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



.PHONY: demo
demo: $(addprefix $(DEMO)/,css/normalize.min.css css/style.min.css index.html)


$(DEMO)/css:
	mkdir -p $@

$(DEMO)/css/normalize.css: $(DEMO)/scss/normalize.scss $(DEMO)/css
	cd $(@D) && $(COMPASS) $<

$(DEMO)/css/style.css: $(DEMO)/css/style.scss, $(DEMO)/css
	cd $(@D) && $(COMPASS) $<

$(DEMO)/css/%.min.css: $(DEMO)/css/%.css
	cat $^ | $(JAVA) -jar $(YUI_LIB) --type=css > $@

#Cake
$(DEMO)/index.html: Cakefile $(DEMO)/template.jade $(DEMO)/palettes.js
	$(CAKE) build:html



.PHONY: docs
docs: doc/Symbols.pdf

doc/Symbols.pdf: doc/Symbols.tex
	cd $(@D) && $(PDFLATEX) $< && $(PDFLATEX) $<



.PHONY: clean
clean:
	rm -rf $(BUILD) $(DEMO)/{css,index.html} doc/*.{aux,log,pdf,synctex.gz}
