---
title: Chrome Extensions
---

:::warning

This demo was written using the Manifest V2 extension platform.  Chrome Web
Store will not accept new V2 extensions, but these can be sideloaded using the
"Load unpacked" extension option.

:::

This library is compatible with Chrome and Chromium extensions and should just
work out of the box.  Specific API support is listed in the Chrome extensions
API documentation.

[Right-Click and download the final CRX](pathname:///chromium/SheetJSDemo.crx)

:::caution

New releases of Chrome / Chromium will block with `CRX_REQUIRED_PROOF_MISSING`.

To try the extension:

1) Right-click and select "Save Link As ..." to save the CRX file

2) Open `chrome://extensions/` in the browser and enable Developer mode

3) Click and drag the downloaded CRX file into the Extensions page to install.

:::


## Relevant Operations

### Generating Downloads

The `writeFile` function works in a Chrome or Chromium extension:

```js
XLSX.writeFile(wb, "export.xlsx");
```

Under the hood, it uses the `chrome.downloads` API.  `"downloads"` permission
should be set in `manifest.json`.

### Content Script Table Scraping

`table_to_book` and `table_to_sheet` can help build workbooks from DOM tables:

```js
var tables = document.getElementsByTagName("table");
var wb = XLSX.utils.book_new();
for(var i = 0; i < tables.length; ++i) {
  var ws = XLSX.utils.table_to_sheet(tables[i]);
  XLSX.utils.book_append_sheet(wb, ws, "Table" + i);
}
```

## Demo

The demo extension includes multiple features to demonstrate sample usage.
Production extensions should include proper error handling.

<details><summary><b>Testing Unpacked Extension</b> (click to show)</summary>

1) [Right-Click and download the zip](pathname:///chromium/SheetJSChromiumUnpacked.zip)

2) Create a `SheetJSChromium` folder in your Downloads directory, move the zip
   file into the folder, and extract the zip file.

3) Open `chrome://extensions/` in the browser and enable Developer mode

4) Click "Load Unpacked" and select the `SheetJSChromium` folder.

</details>

### Bookmark Exporter

`chrome.bookmarks` API enables bookmark tree traversal.  The "Export Bookmarks"
button in the extension pop-up recursively walks the bookmark tree, pushes the
bookmark URLs into a data array, and exports into a simple spreadsheet:

```js
/* walk the bookmark tree */
function recurse_bookmarks(data, tree) {
  if(tree.url) data.push({Name: tree.title, Location: tree.url});
  (tree.children||[]).forEach(function(child) { recurse_bookmarks(data, child); });
}

/* get bookmark data */
chrome.bookmarks.getTree(function(res) {
  /* load into an array */
  var data = [];
  res.forEach(function(t) { recurse_bookmarks(data, t); });

  /* create worksheet */
  var ws = XLSX.utils.json_to_sheet(data, { header: ['Name', 'Location'] });

  /* create workbook and export */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Bookmarks');
  XLSX.writeFile(wb, "bookmarks.xlsx");
});
```

### Table Exporter

The `content.js` content script converts a table in the DOM to workbook object
using the `table_to_book` utility function:

```js
// event page script trigger
chrome.tabs.sendMessage(tab.id);
// content script convert
var wb = XLSX.utils.table_to_book(elt);
// event page script callback
XLSX.writeFile(wb, "export.xlsx");
```

Since the workbook object is a plain JS object, the object is sent back to an
event page script which generates the file and attempts a download.
