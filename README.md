# SheetJS CE Docs

Hosted URL: <https://docs.sheetjs.com>

## Development

`docz/version.js` exports a version number for use in docs pages.

Build commands:

```bash
$ make init    # install dependencies
$ make         # build static site
$ make serve   # serve static site

$ make dev     # run dev server
$ make spell   # spell check (.spelling custom dictionary)
$ make graph   # build format graph and legend
```

## Live Demos

**Imports do not work from live codeblocks!**

<https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js> is loaded
on each page, making the `XLSX` variable available to live blocks.

Specific pages can load scripts using the `head` component:

```html
<head>
  <script src="https://cdn.sheetjs.com/xspreadsheet/xlsxspread.min.js"></script>
</head>
```

