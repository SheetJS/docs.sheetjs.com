---
sidebar_position: 1
hide_table_of_contents: true
title: Overview
---

# SheetJS CE

![License](https://img.shields.io/github/license/SheetJS/sheetjs)
[![Build Status](https://img.shields.io/github/workflow/status/sheetjs/sheetjs/Tests:%20node.js)](https://github.com/SheetJS/sheetjs/actions)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/SheetJS/sheetjs)](https://snyk.io/test/github/SheetJS/sheetjs)
[![npm Downloads](https://img.shields.io/npm/dm/xlsx.svg)](https://cdn.sheetjs.com/)
[![GitHub stars](https://img.shields.io/github/stars/SheetJS/sheetjs?style=social)](https://github.com/SheetJS/sheetjs)

SheetJS Community Edition offers battle-tested open-source solutions for
extracting useful data from almost any complex spreadsheet and generating new
spreadsheets that will work with legacy and modern software alike.

[SheetJS Pro](https://sheetjs.com/pro) offers solutions beyond data processing:
Edit complex templates with ease; let out your inner Picasso with styling; make
custom sheets with images/graphs/PivotTables; evaluate formula expressions and
port calculations to web apps; automate common spreadsheet tasks, and much more!

## Simple Examples

The code editors are live -- feel free to edit! They use ReactJS components and
run entirely in the web browser.

### Export an HTML Table to Excel XLSX

<details><summary><b>How to add to your site</b> (click to show)</summary>

1) Make sure your table has an ID:

```html
<table id="TableToExport">
```

2) Include a reference to the SheetJS Library in your page:

```html
<script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
```

3) Add a button that users will click to generate an export

```html
<button id="sheetjsexport"><b>Export as XLSX</b></button>
```

4) Add an event handler for the `click` event to create a workbook and download:

```html
<script>
document.getElementById("sheetjsexport").addEventListener('click', function() {
  /* Create worksheet from HTML DOM TABLE */
  var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
  /* Export to file (start a download) */
  XLSX.writeFile(wb, "SheetJSTable.xlsx");
});
</script>
```

</details>

<details><summary><b>How to automate with NodeJS</b> (click to show)</summary>

[The "Headless Automation" demo](http://localhost:3000/docs/demos/headless)
includes complete examples using the `puppeteer` and `playwright` libraries.

</details>

<details open><summary><b>Live Example</b> (click to hide)</summary>

```jsx live
/* The live editor requires this function wrapper */
function Table2XLSX(props) {

  /* Callback invoked when the button is clicked */
  const xport = React.useCallback(async () => {
      /* Create worksheet from HTML DOM TABLE */
      const table = document.getElementById("Table2XLSX");
      const wb = XLSX.utils.table_to_book(table);

      /* Export to file (start a download) */
      XLSX.writeFile(wb, "SheetJSTable.xlsx");
  });

  return (<>
    <table id="Table2XLSX"><tbody>
      <tr><td colSpan="3">SheetJS Table Export</td></tr>
      <tr><td>Author</td><td>ID</td><td>你好!</td></tr>
      <tr><td>SheetJS</td><td>7262</td><td>வணக்கம்!</td></tr>
      <tr><td colSpan="3">
        <a href="//sheetjs.com">Powered by SheetJS</a>
      </td></tr>
    </tbody></table>
    <button onClick={xport}><b>Export XLSX!</b></button>
  </>);
}
```

<a href="https://sheetjs.com/pro">SheetJS Pro Basic</a> extends this export with
support for CSS styling and rich text.

</details>

### Download and Preview a Numbers workbook

<details><summary><b>How to add to your site</b> (click to show)</summary>

1) Create a container DIV for the table:

```html
<div id="TableContainer"></div>
```

2) Include a reference to the SheetJS Library in your page:

```html
<script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
```

3) Add a script block to download and update the page:

```html
<script>
(async() => {
  const f = await fetch(URL_TO_DOWNLOAD); // replace with the URL of the file
  const ab = await f.arrayBuffer();

  /* Parse file and get first worksheet */
  const wb = XLSX.read(ab);
  const ws = wb.Sheets[wb.SheetNames[0]];

  /* Generate HTML */
  var output = document.getElementById("TableContainer");
  output.innerHTML = XLSX.utils.sheet_to_html(ws);
})();
</script>
```

</details>

<details><summary><b>Live Example</b> (click to show)</summary>

```jsx live
/* The live editor requires this function wrapper */
function Numbers2HTML(props) {
  const [html, setHTML] = React.useState("");

  /* Fetch and update HTML */
  React.useEffect(async() => {
    /* Fetch file */
    const f = await fetch("https://sheetjs.com/pres.numbers");
    const ab = await f.arrayBuffer();

    /* Parse file */
    const wb = XLSX.read(ab);
    const ws = wb.Sheets[wb.SheetNames[0]];

    /* Generate HTML */
    setHTML(XLSX.utils.sheet_to_html(ws));
  }, []);

  return (<div dangerouslySetInnerHTML={{__html: html}}/>);
}
```

<a href="https://sheetjs.com/pro">SheetJS Pro Basic</a> extends this import with
support for CSS styling and rich text.

</details>

### Preview a workbook on your device

<details open><summary><b>Live Example</b> (click to hide)</summary>

This example starts from a CSV string.  Use the File Input element to select
a workbook to load.  Use the "Export XLSX" button to write the table to XLSX.

```jsx live
/* The live editor requires this function wrapper */
function Tabeller(props) {
  const [__html, setHTML] = React.useState("");

  /* Load sample data once */
  React.useEffect(() => {
    /* Starting CSV data -- change data here */
    const csv = `\
This,is,a,Test
வணக்கம்,สวัสดี,你好,가지마
1,2,3,4`;

    /* Parse CSV into a workbook object */
    const wb = XLSX.read(csv, {type: "string"});

    /* Get the worksheet (default name "Sheet1") */
    const ws = wb.Sheets.Sheet1;

    /* Create HTML table */
    setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));
  }, []);

  return (<>
    {/* Import Button */}
    <input type="file" onChange={async(e) => {
      /* get data as an ArrayBuffer */
      const file = e.target.files[0];
      const data = await file.arrayBuffer();

      /* parse and load first worksheet */
      const wb = XLSX.read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];
      setHTML(XLSX.utils.sheet_to_html(ws, { id: "tabeller" }));
    }}/>

    {/* Export Button */}
    <button onClick={() => {

      /* Create worksheet from HTML DOM TABLE */
      const table = document.getElementById("tabeller");
      const wb = XLSX.utils.table_to_book(table);

      /* Export to file (start a download) */
      XLSX.writeFile(wb, "SheetJSIntro.xlsx");
    }}><b>Export XLSX!</b></button>

    {/* Show HTML preview */}
    <div dangerouslySetInnerHTML={{__html}}/>
  </>);
}
```

</details>


### Browser Testing

[![Build Status](https://saucelabs.com/browser-matrix/sheetjs.svg)](https://saucelabs.com/u/sheetjs)

### Supported File Formats

![graph of format support](./img/formats.png)

![graph legend](./img/legend.png)
