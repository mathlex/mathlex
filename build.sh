#!/bin/sh
cake build && cake build:parser && cake build:browser && cake build:frontend
cd doc && pdflatex Symbols.tex && pdflatex Symbols.tex
