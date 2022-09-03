.PHONY: build
build:
	cp formats.png docz/docs/img/formats.png
	cd docz; npx -y pnpm build; cd ..
	rm -rf docs
	mv docz/build/ docs
	cp CNAME docs

.PHONY: init
init:
	cd docz; npm i || npm i --legacy-peer-deps; cd ..

.PHONY: dev
dev:
	cd docz; npm run start; cd ..

.PHONY: serve
serve:
	npx -y http-server docs

.PHONY: spell
spell:
	npx spellchecker-cli -q -d .spelling -f 'docz/**/*.md*' --no-suggestions

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

MDLINT=README.md $(wildcard docz/*.md*) $(wildcard docz/docs/*.md*) $(wildcard docz/docs/*/*.md*)
.PHONY: mdlint
mdlint: $(MDLINT) ## Check markdown documents
	npx alex $^
	npx --package markdown-spellcheck -- mdspell -a -n -x -r --en-us $^

READEPS=$(sort $(wildcard docbits/*.md))
README.md: $(READEPS)
	awk 'FNR==1{p=0}/#/{p=1}p' $^ | tr -d '\15\32' > $@
