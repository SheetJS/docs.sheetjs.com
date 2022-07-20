---
sidebar_position: 6
---

# Clipboard Data

Spreadsheet software like Excel typically support copying and pasting cells and
data. This is implemented through the Clipboard ("Pasteboard" in OSX parlance).

When copying a selection of cells, Excel for Windows stores a screenshot of the
selected cells as an image.  It also creates and stores a number of strings and
files for the various formats, including TSV, CSV, HTML, RTF, SYLK, DIF, XLSB,
XLS (both '97-2004 and '95), and SpreadsheetML 2003.

Not all Clipboard APIs offer access to all clipboard types.

## Browser Reading (paste)

Clipboard data can be read from a `paste` event, accessible from the event
`clipboardData` property:

```js
document.onpaste = function(e) {
  /* get TSV */
  var str = e.clipboardData.getData('text/html');
  /* parse */
  var wb = XLSX.read(str, {type: "string"});
  /* DO SOMETHING WITH wb HERE */
};
```

`getData` accepts one argument: the desired MIME type. Chrome 103 supports:

| MIME type    | Data format                |
|:-------------|:---------------------------|
| `text/plain` | TSV (tab separated values) |
| `text/html`  | HTML                       |
| `text/rtf`   | RTF (rich text format)     |

`getData` returns a string compatible with the `string` type for `XLSX.read`.

### Live Demo

Open a file in Excel, copy some cells, then come back to this window.  Click on
"RESULT" below and paste (Control+V for Windows, Command+V for Mac).

```jsx live
function Clipboard() {
  const [csvs, setCSVs] = React.useState([ "", "", "" ]);

  /* Set up paste handler */
  React.useEffect(async() => {
    document.onpaste = function(e) {
      /* this demo will read 3 different clipboard data types */
      var mime_arr = [ 'text/plain', 'text/html', 'text/rtf' ];
      /* get clipboard data for each type */
      var data_arr = mime_arr.map(mime => e.clipboardData.getData(mime));
      /* parse each data string into a workbook */
      var wb_arr = data_arr.map(str => XLSX.read(str, {type: "string"}));
      /* get first worksheet from each workbook */
      var ws_arr = wb_arr.map(wb => wb.Sheets[wb.SheetNames[0]]);
      /* generate CSV for each "first worksheet" */
      var result = ws_arr.map(ws => XLSX.utils.sheet_to_csv(ws));
      setCSVs(result);
    };
  }, []);

  return (
    <>
      {csvs[0] && (<pre><b>Data from clipboard TSV  (text/plain)</b><br/>{csvs[0]}</pre>)}
      {csvs[1] && (<pre><b>Data from clipboard HTML (text/html)</b><br/>{csvs[1]}</pre>)}
      {csvs[2] && (<pre><b>Data from clipboard RTF  (text/rtf)</b><br/>{csvs[2]}</pre>)}
      {csvs.every(x => !x) && <b>Copy data in Excel, click here, and paste (Control+V)</b>}
    </>
  );
}
```

## Browser Writing (copy)

Clipboard data can be written from a `copy` event, accessible from the event
`clipboardData` property:

```js
document.oncopy = function(e) {
  /* get HTML of first worksheet in workbook */
  var str = XLSX.write(wb, {type: "string", bookType: "html"});
  /* set HTML clipboard data */
  e.clipboardData.setData('text/html', str);

  /* prevent the browser from copying the normal data */
  e.preventDefault();
};
```

`setData` accepts two arguments: MIME type and new data. Chrome 103 supports:

| MIME type    | Data format                |
|:-------------|:---------------------------|
| `text/plain` | TSV (tab separated values) |
| `text/html`  | HTML                       |

Browsers do not currently support assigning to the `text/rtf` clipboard type.

### Live Demo

This demo creates a simple workbook from the following HTML table:

<table id="srcdata">
  <tr><td>SheetJS</td><td>Clipboard</td><td>Demo</td></tr>
  <tr><td>bookType</td><td>RTF</td></tr>
  <tr><td>source</td><td>HTML Table</td></tr>
</table>

Create a new file in Excel then come back to this window.  Select the text
below and copy (Control+C for Windows, Command+C for Mac).  Go back to the
excel

```jsx live
function Clipboard() {
  /* Set up copy handler */
  React.useEffect(async() => {
    document.oncopy = function(e) {
      /* generate workbook from table */
      var wb = XLSX.utils.table_to_book(document.getElementById("srcdata"));
      /* get HTML of first worksheet in workbook */
      var str = XLSX.write(wb, {type: "string", bookType: "html"});
      /* set HTML clipboard data */
      e.clipboardData.setData('text/html', str);
      /* prevent the browser from copying the normal data */
      e.preventDefault();
    };
  }, []);

  return (
    <b>Select this text, copy (Control+C), and paste in Excel</b>
  );
}
```

## Electron

Electron [Clipboard API](https://www.electronjs.org/docs/latest/api/clipboard)
supports HTML and RTF clipboards.

There are special methods for specific clipboard types:

| File Type | Read Clipboard Data  | Write Clipboard Data  |
|:----------|:---------------------|:----------------------|
| RTF       | `clipboard.readRTF`  | `clipboard.writeRTF`  |
| TSV       | `clipboard.readText` | `clipboard.writeText` |
| HTML      | `clipboard.readHTML` | `clipboard.writeHTML` |

Each method operates on JS strings.

:::caution Experimental Buffer Clipboard Support

Electron additionally supports binary operations using `Buffer` objects.  This
support is considered "experimental" and is not guaranteed to work on any
platform.  Issues should be raised with the Electron project

On the `macOS` platform, some versions of Excel store a packaged file with key
`dyn.ah62d4qmxhk4d425try1g44pdsm11g55gsu1en5pcqzwc4y5tsz3gg3k`.  The package is
a simple CFB file that can be parsed:

```js
const { clipboard } = require('electron')
const XLSX = require("xlsx");
const buf = clipboard.readBuffer('dyn.ah62d4qmxhk4d425try1g44pdsm11g55gsu1en5pcqzwc4y5tsz3gg3k');
const cfb = XLSX.CFB.read(rtf, {type: "buffer"});
const pkg = XLSX.CFB.find(cfb, "Package").content;
const wb = XLSX.read(pkg);
```

:::