---
title: Local File Access
---

Reading and writing files require native support.  `readFile` and `writeFile`
include support for some approaches but do not support every API.  When an API
is not supported by `readFile` or `writeFile`, the underlying `read` and
`write` methods can be used.

This demo looks at various web APIs.  More specific approaches for deployments
like mobile apps are covered in their respective demos.

:::note

Some snippets are also available in the "Common Use Cases" section:

- [Data Import](../solutions/input)
- [Data Export](../solutions/output)

:::

:::warning

Not all web APIs are supported in all browsers.  For example, Firefox does not
support the "File System Access API".

Even when a browser technically supports a web API, it may be disabled in the
client browser. Some APIs do not give any feedback.

:::

## Binary Data

Modern browser APIs typically use typed arrays or `Blob` or `File` structures.

_Reading Binary Data_

Given a `Blob` or `File`, the underlying data cannot be read synchronously!

The callback-based approach uses a `FileReader`:

```js
const reader = new FileReader();
reader.onload = function(e) {
  /* e.target.result is an ArrayBuffer */
  const wb = XLSX.read(e.target.result);
  console.log(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
}
reader.readAsArrayBuffer(file);
```

The Promise-based approach uses `Blob#arrayBuffer`:

```js
// usage: const wb = await blob_to_wb(blob);
async function blob_to_wb(blob) {
  return XLSX.read(await blob.arrayBuffer());
}
```

_Writing Binary Data_

`XLSX.write` can generate `Uint8Array` results by passing `type: "buffer"`.  A
`Blob` can be created by using the constructor:

```js
const u8 = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
const blob = new Blob([u8], { type: "application/vnd.ms-excel" });
```

## Web Workers

:::warning

**None of the browser methods work from Web Worker contexts!**

Data operations with the Web APIs must happen in the browser main thread.

:::

Web Workers and main thread can transfer `ArrayBuffer` or `Uint8Array` objects.

When generating a file, the worker will call `XLSX.write` with type `buffer`
and transfer the result to the main thread to initiate a download.

When parsing a file, the main thread will use the web API to read a `File` or
`Blob`, extract the underlying `ArrayBuffer` and transfer to the Web Worker.

## HTML5 Download Attribute

_Writing Files_

`writeFile` will attempt a download in the browser using the attribute.

```js
XLSX.writeFile(wb, "SheetJS.xlsx");
```

## File API

_Reading Files_

In the `change` event of `<input type="file">`, `target` hold a list of files:

```js
async function handleFileAsync(e) {
  /* get first file */
  const file = e.target.files[0];
  /* get raw data */
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);
  /* do something with the workbook here */
  console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
}
input_dom_element.addEventListener("change", handleFileAsync, false);
```

## HTML Drag and Drop API

_Reading Files_

The `dataTransfer` property of the `drop` event holds a list of files:

```js
async function handleDropAsync(e) {
  e.stopPropagation(); e.preventDefault();
  /* get first file */
  const f = e.dataTransfer.files[0];
  /* get raw data */
  const data = await f.arrayBuffer();
  /* data is an ArrayBuffer */
  const wb = XLSX.read(data);
  /* do something with the workbook here */
  console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
}
drop_dom_element.addEventListener("drop", handleDropAsync, false);
```

## File System Access API

_Reading Files_

`window.showOpenFilePicker` shows a file picker and resolves to an array of
file handles. When `multiple: false` is set, the array has one element.

The `getFile` method resolves to a `File` object whose data can be read with
the `arrayBuffer` method:

```js
/* Show picker and get data */
const [hFile] = await window.showOpenFilePicker({
  types: [{
    description: 'Spreadsheets',
    accept: { 'application/vnd.ms-excel': ['.xlsx', '.xls', '.xlsb', /*...*/] }
  }],
  excludeAcceptAllOption: true,
  multiple: false
});
const ab = await (await hFile.getFile()).arrayBuffer();

/* parse */
const wb = XLSX.read(ab);

/* do something with the workbook */
console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
```

_Writing Files_

`window.showSaveFilePicker` shows a file picker and resolves to a file handle.
The `createWritable` method resolves to a `FileSystemWritableFileStream`, which
readily accepts `Uint8Array` data from `XLSX.write`:

```js
/* Show picker and get handle to file */
const hFile = await window.showSaveFilePicker({
  suggestedName: "SheetJS.xlsx",
  types: [
    { description: 'Excel 2007+ (XLSX)', accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] } },
    { description: 'Excel 97-2004 (XLS)', accept: { 'application/vnd.ms-excel': ['.xls'] } },
    { description: 'Excel 2007+ Binary (XLSB)', accept: { 'application/vnd.ms-excel.sheet.binary.macroEnabled.12': ['.xlsb'] } },
    /* note that each MIME type must be unique! */
  ]
});
const wstream = await hFile.createWritable();

/* get extension */
const ext = hFile.name.slice(hFile.name.lastIndexOf(".")+1)
/* write */
wstream.write(XLSX.write(wb, { bookType: ext, type: "buffer" }))
/* close stream to commit file */
wstream.close();
```

### Demo

<details><summary><b>Live Example</b> (click to show) </summary>

This live example reads a file then tries to save as XLSX.

```jsx live
function SheetJSRoundTripFileSystemAPI() { return ( <button onClick={async () => {
  /* Show picker and get data */
  const [rFile] = await window.showOpenFilePicker({
    types: [{
      description: 'Spreadsheets',
      accept: { 'application/vnd.ms-excel': ['.xlsx', '.xls', '.xlsb', /*...*/] }
    }],
    excludeAcceptAllOption: true,
    multiple: false
  });
  const ab = await (await rFile.getFile()).arrayBuffer();

  /* parse */
  const wb = XLSX.read(ab);

  /* Show picker and get handle to file */
  const wFile = await window.showSaveFilePicker({
    suggestedName: "SheetJSRT.xlsx",
    types: [ { description: 'XLSX', accept: { 'application/vnd.ms-excel': ['.xlsx'] } } ]
  });
  console.log(wFile);
  const wstream = await wFile.createWritable();

  /* write */
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  wstream.write(buf);

  /* close stream to commit file */
  wstream.close();

}}>Click to read then save as XLSX</button> ) }
```

</details>

## File and Directory Entries API

In the web browser, the File and Directory Entries API does not project to the
local file system. `cordova-plugin-file` *does* write to device in mobile apps!

_Writing Files_

```js
// Request File System Access
window.requestFileSystem(window.PERSISTENT, 0, (fs) => {
  // Request a handle to "SheetJS.xlsx", making a new file if necessary
  fs.root.getFile("SheetJS.xlsx", {create: true}, entry => {
    // Request a FileWriter for writing data
    entry.createWriter(writer => {
      // The FileWriter API needs an actual Blob
      const u8 = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
      const data = new Blob([u8], { type: "application/vnd.ms-excel" });
      // `onwriteend` is called on success, `onerror` called on error
      writer.onwriteend = () => {}; writer.onerror = () => {};
      // write the data
      writer.write(data);
    });
  });
});
```

## Internet Explorer

Internet Explorer offered proprietary APIs that were not adopted by Chromium.

#### Blob API

_Writing Files_

IE10 and IE11 support `navigator.msSaveBlob`. `writeFile` will use the method.

#### VBScript

_Reading and Writing Files_

Internet Explorer 6-9 with VBScript support `Scripting.FileSystemObject`.  This
is not supported in modern browsers.

This approach is implemented in the library `readFile` and `writeFile` methods.
It requires the shim script to be loaded before the main library script:

```html
<!-- load the shim script first -->
<script src="shim.min.js"></script>
<!-- then load the main script -->
<script src="xlsx.full.min.js"></script>
```

## Other Platforms

### NodeJS

`fs.readFileSync` and `fs.writeFileSync` allow for reading and writing files.

When using `require`, these are supported in `readFile` and `writeFile`:

```js
var XLSX = require("xlsx");
var wb = XLSX.readFile("sheetjs.numbers");
XLSX.writeFile(wb, "sheetjs.xls");
```

[Installation](../getting-started/installation/nodejs) has a special note for
use with NodeJS ECMAScript Modules:

```js
import { readFile, writeFile, set_fs } from 'xlsx';
import * as fs from 'fs';
set_fs(fs);

var wb = XLSX.readFile("sheetjs.numbers");
XLSX.writeFile(wb, "sheetjs.xls");
```

### Deno

`Deno.readFileSync` and `Deno.writeFileSync` are supported by `readFile` and
`writeFile` out of the box:

```js
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';

const wb = XLSX.readFile("sheetjs.numbers");
XLSX.writeFile(wb, "sheetjs.xlsx");
```

### Apps

Desktop and mobile apps have their own specific APIs covered in separate demos:

- [Electron and other desktop apps](./desktop)
- [React Native and other mobile apps](./mobile)

