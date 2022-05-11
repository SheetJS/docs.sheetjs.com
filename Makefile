.PHONY: index
index: readme ## Rebuild site
	sed -i .bak 's/](d/](https:\/\/github.com\/SheetJS\/SheetJS\/tree\/master\/d/g' README.md
	grip --title "SheetJS Community Edition" --export README.md
	mv README.html index.html
	git add README.md index.html *.png
	#mv js-xlsx/README.md .
	#git add README.md

.PHONY: readme
readme: README.md
	markdown-toc -i README.md

.PHONY: graph
graph: formats.png legend.png ## Rebuild format conversion graph
misc/formats.svg: misc/formats.dot
	circo -Tsvg -o$@ $<
misc/legend.svg: misc/legend.dot
	dot -Tsvg -o$@ $<
formats.png legend.png: %.png: misc/%.svg
	node misc/coarsify.js misc/$*.svg misc/$*.svg.svg
	npx svgexport misc/$*.svg.svg $@ 0.5x

MDLINT=README.md
.PHONY: mdlint
mdlint: $(MDLINT) ## Check markdown documents
	npx alex $^
	npx --package markdown-spellcheck -- mdspell -a -n -x -r --en-us $^

READEPS=$(sort $(wildcard docbits/*.md))
README.md: $(READEPS)
	awk 'FNR==1{p=0}/#/{p=1}p' $^ | tr -d '\15\32' > $@
