---
sidebar_position: 1
---

# Data Import

## Parsing Workbooks

#### API

_Extract data from spreadsheet bytes_

```js
var workbook = XLSX.read(data, opts);
```

The `read` method can extract data from spreadsheet bytes stored in a JS string,
"binary string", NodeJS buffer or typed array (`Uint8Array` or `ArrayBuffer`).


_Read spreadsheet bytes from a local file and extract data_

```js
var workbook = XLSX.readFile(filename, opts);
```

The `readFile` method attempts to read a spreadsheet file at the supplied path.
Browsers generally do not allow reading files in this way (it is deemed a
security risk), and attempts to read files in this way will throw an error.

The second `opts` argument is optional. ["Parsing Options"](../api/parse-options)
covers the supported properties and behaviors.

#### Examples

Here are a few common scenarios (click on each subtitle to see the code):

<details>
  <summary><b>Local file in a NodeJS server</b> (click to show)</summary>

`readFile` uses `fs.readFileSync` under the hood:

```js
var XLSX = require("xlsx");

var workbook = XLSX.readFile("test.xlsx");
```

For Node ESM, the `readFile` helper is not enabled. Instead, `fs.readFileSync`
should be used to read the file data as a `Buffer` for use with `XLSX.read`:

```js
import { readFileSync } from "fs";
import { read } from "xlsx/xlsx.mjs";

const buf = readFileSync("test.xlsx");
/* buf is a Buffer */
const workbook = read(buf);
```

</details>

<details>
  <summary><b>Local file in a Deno application</b> (click to show)</summary>

`readFile` uses `Deno.readFileSync` under the hood:

```js
// @deno-types="https://deno.land/x/sheetjs/types/index.d.ts"
import * as XLSX from 'https://deno.land/x/sheetjs/xlsx.mjs'

const workbook = XLSX.readFile("test.xlsx");
```

Applications reading files must be invoked with the `--allow-read` flag.  The
[`deno` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/deno/) has more examples

</details>

<details>
  <summary><b>User-submitted file in a web page ("Drag-and-Drop")</b> (click to show)</summary>

For modern websites targeting Chrome 76+, `File#arrayBuffer` is recommended:

```js
// XLSX is a global from the standalone script

async function handleDropAsync(e) {
  e.stopPropagation(); e.preventDefault();
  const f = e.dataTransfer.files[0];
  /* f is a File */
  const data = await f.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
}
drop_dom_element.addEventListener("drop", handleDropAsync, false);
```

For maximal compatibility, the `FileReader` API should be used:

```js
function handleDrop(e) {
  e.stopPropagation(); e.preventDefault();
  var f = e.dataTransfer.files[0];
  /* f is a File */
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */
    var workbook = XLSX.read(data);

    /* DO SOMETHING WITH workbook HERE */
  };
  reader.readAsArrayBuffer(f);
}
drop_dom_element.addEventListener("drop", handleDrop, false);
```

<https://oss.sheetjs.com/sheetjs/> demonstrates the FileReader technique.

</details>

<details>
  <summary><b>User-submitted file with an HTML INPUT element</b> (click to show)</summary>

Starting with an HTML INPUT element with `type="file"`:

```html
<input type="file" id="input_dom_element">
```

For modern websites targeting Chrome 76+, `Blob#arrayBuffer` is recommended:

```js
// XLSX is a global from the standalone script

async function handleFileAsync(e) {
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
}
input_dom_element.addEventListener("change", handleFileAsync, false);
```

For broader support (including IE10+), the `FileReader` approach is recommended:

```js
function handleFile(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */
    var workbook = XLSX.read(e.target.result);

    /* DO SOMETHING WITH workbook HERE */
  };
  reader.readAsArrayBuffer(file);
}
input_dom_element.addEventListener("change", handleFile, false);
```

The [`oldie` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/oldie/) shows an IE-compatible fallback scenario.

</details>

<details>
  <summary><b>Fetching a file in the web browser ("Ajax")</b> (click to show)</summary>

For modern websites targeting Chrome 42+, `fetch` is recommended:

```js
// XLSX is a global from the standalone script

(async() => {
  const url = "http://oss.sheetjs.com/test_files/formula_stress_test.xlsx";
  const data = await (await fetch(url)).arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
})();
```

For broader support, the `XMLHttpRequest` approach is recommended:

```js
var url = "http://oss.sheetjs.com/test_files/formula_stress_test.xlsx";

/* set up async GET request */
var req = new XMLHttpRequest();
req.open("GET", url, true);
req.responseType = "arraybuffer";

req.onload = function(e) {
  var workbook = XLSX.read(req.response);

  /* DO SOMETHING WITH workbook HERE */
};

req.send();
```

The [`xhr` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/xhr/) includes a longer discussion and more examples.

<http://oss.sheetjs.com/sheetjs/ajax.html> shows fallback approaches for IE6+.

</details>

<details>
  <summary><b>Local file in a PhotoShop or InDesign plugin</b> (click to show)</summary>

`readFile` wraps the `File` logic in Photoshop and other ExtendScript targets.
The specified path should be an absolute path:

```js
#include "xlsx.extendscript.js"

/* Read test.xlsx from the Documents folder */
var workbook = XLSX.readFile(Folder.myDocuments + "/test.xlsx");
```

The [`extendscript` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/extendscript/) includes a more complex example.

</details>

<details>
  <summary><b>Local file in an Electron app</b> (click to show)</summary>

`readFile` can be used in the renderer process:

```js
/* From the renderer process */
var XLSX = require("xlsx");

var workbook = XLSX.readFile(path);
```

Electron APIs have changed over time.  The [`electron` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/electron/)
shows a complete example and details the required version-specific settings.

</details>

<details>
  <summary><b>Local file in a mobile app with React Native</b> (click to show)</summary>

The [`react` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/react) includes a sample React Native app.

Since React Native does not provide a way to read files from the filesystem, a
third-party library must be used.  The following libraries have been tested:

- [`react-native-file-access`](https://npm.im/react-native-file-access)

The `base64` encoding returns strings compatible with the `base64` type:

```js
import XLSX from "xlsx";
import { FileSystem } from "react-native-file-access";

const b64 = await FileSystem.readFile(path, "base64");
/* b64 is a base64 string */
const workbook = XLSX.read(b64, {type: "base64"});
```

- [`react-native-fs`](https://npm.im/react-native-fs)

The `ascii` encoding returns binary strings compatible with the `binary` type:

```js
import XLSX from "xlsx";
import { readFile } from "react-native-fs";

const bstr = await readFile(path, "ascii");
/* bstr is a binary string */
const workbook = XLSX.read(bstr, {type: "binary"});
```

</details>

<details>
  <summary><b>NodeJS Server File Uploads</b> (click to show)</summary>

`read` can accept a NodeJS buffer.  `readFile` can read files generated by a
HTTP POST request body parser like [`formidable`](https://npm.im/formidable):

```js
const XLSX = require("xlsx");
const http = require("http");
const formidable = require("formidable");

const server = http.createServer((req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    /* grab the first file */
    const f = Object.entries(files)[0][1];
    const path = f.filepath;
    const workbook = XLSX.readFile(path);

    /* DO SOMETHING WITH workbook HERE */
  });
}).listen(process.env.PORT || 7262);
```

The [`server` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/server) has more advanced examples.

</details>

<details>
  <summary><b>Download files in a NodeJS process</b> (click to show)</summary>

Node 17.5 and 18.0 have native support for fetch:

```js
const XLSX = require("xlsx");

const data = await (await fetch(url)).arrayBuffer();
/* data is an ArrayBuffer */
const workbook = XLSX.read(data);
```

For broader compatibility, third-party modules are recommended.

[`request`](https://npm.im/request) requires a `null` encoding to yield Buffers:

```js
var XLSX = require("xlsx");
var request = require("request");

request({url: url, encoding: null}, function(err, resp, body) {
  var workbook = XLSX.read(body);

  /* DO SOMETHING WITH workbook HERE */
});
```

[`axios`](https://npm.im/axios) works the same way in browser and in NodeJS:

```js
const XLSX = require("xlsx");
const axios = require("axios");

(async() => {
  const res = await axios.get(url, {responseType: "arraybuffer"});
  /* res.data is a Buffer */
  const workbook = XLSX.read(res.data);

  /* DO SOMETHING WITH workbook HERE */
})();
```

</details>

<details>
  <summary><b>Download files in an Electron app</b> (click to show)</summary>

The `net` module in the main process can make HTTP/HTTPS requests to external
resources.  Responses should be manually concatenated using `Buffer.concat`:

```js
const XLSX = require("xlsx");
const { net } = require("electron");

const req = net.request(url);
req.on("response", (res) => {
  const bufs = []; // this array will collect all of the buffers
  res.on("data", (chunk) => { bufs.push(chunk); });
  res.on("end", () => {
    const workbook = XLSX.read(Buffer.concat(bufs));

    /* DO SOMETHING WITH workbook HERE */
  });
});
req.end();
```

</details>

<details>
  <summary><b>Readable Streams in NodeJS</b> (click to show)</summary>

When dealing with Readable Streams, the easiest approach is to buffer the stream
and process the whole thing at the end:

```js
var fs = require("fs");
var XLSX = require("xlsx");

function process_RS(stream, cb) {
  var buffers = [];
  stream.on("data", function(data) { buffers.push(data); });
  stream.on("end", function() {
    var buffer = Buffer.concat(buffers);
    var workbook = XLSX.read(buffer, {type:"buffer"});

    /* DO SOMETHING WITH workbook IN THE CALLBACK */
    cb(workbook);
  });
}
```

</details>

<details>
  <summary><b>ReadableStream in the browser</b> (click to show)</summary>

When dealing with `ReadableStream`, the easiest approach is to buffer the stream
and process the whole thing at the end:

```js
// XLSX is a global from the standalone script

async function process_RS(stream) {
  /* collect data */
  const buffers = [];
  const reader = stream.getReader();
  for(;;) {
    const res = await reader.read();
    if(res.value) buffers.push(res.value);
    if(res.done) break;
  }

  /* concat */
  const out = new Uint8Array(buffers.reduce((acc, v) => acc + v.length, 0));

  let off = 0;
  for(const u8 of buffers) {
    out.set(u8, off);
    off += u8.length;
  }

  return out;
}

const data = await process_RS(stream);
/* data is Uint8Array */
const workbook = XLSX.read(data, {type: 'array'});
```

</details>

More detailed examples are covered in the [included demos](https://github.com/SheetJS/SheetJS/tree/master/demos/)

## Processing JSON and JS Data

JSON and JS data tend to represent single worksheets.  This section will use a
few utility functions to generate workbooks.

_Create a new Workbook_

```js
var workbook = XLSX.utils.book_new();
```

The `book_new` utility function creates an empty workbook with no worksheets.

Spreadsheet software generally require at least one worksheet and enforce the
requirement in the user interface.  This library enforces the requirement at
write time, throwing errors if an empty workbook is passed to write functions.


#### API

_Create a worksheet from an array of arrays of JS values_

```js
var worksheet = XLSX.utils.aoa_to_sheet(aoa, opts);
```

The `aoa_to_sheet` utility function walks an "array of arrays" in row-major
order, generating a worksheet object.  The following snippet generates a sheet
with cell `A1` set to the string `A1`, cell `B1` set to `B1`, etc:

```js
var worksheet = XLSX.utils.aoa_to_sheet([
  ["A1", "B1", "C1"],
  ["A2", "B2", "C2"],
  ["A3", "B3", "C3"]
]);
```

["Array of Arrays Input"](../api/utilities#array-of-arrays-input) describes the function and the
optional `opts` argument in more detail.


_Create a worksheet from an array of JS objects_

```js
var worksheet = XLSX.utils.json_to_sheet(jsa, opts);
```

The `json_to_sheet` utility function walks an array of JS objects in order,
generating a worksheet object.  By default, it will generate a header row and
one row per object in the array.  The optional `opts` argument has settings to
control the column order and header output.

["Array of Objects Input"](../api/utilities#array-of-objects-input) describes the function and
the optional `opts` argument in more detail.

#### Examples

["Complete Example"](../example) contains a detailed example "Get Data
from a JSON Endpoint and Generate a Workbook"


[`x-spreadsheet`](https://github.com/myliang/x-spreadsheet) is an interactive
data grid for previewing and modifying structured data in the web browser.  The
[`xspreadsheet` demo](https://github.com/sheetjs/sheetjs/tree/master/demos/xspreadsheet) includes a sample script with the
`xtos` function for converting from x-spreadsheet data object to a workbook.
<https://oss.sheetjs.com/sheetjs/x-spreadsheet> is a live demo.

<details>
  <summary><b>Records from a database query (SQL or no-SQL)</b> (click to show)</summary>

The [`database` demo](https://github.com/sheetjs/sheetjs/tree/master/demos/database/) includes examples of working with
databases and query results.

</details>


<details>
  <summary><b>Numerical Computations with TensorFlow.js</b> (click to show)</summary>

`@tensorflow/tfjs` and other libraries expect data in simple arrays, well-suited
for worksheets where each column is a data vector.  That is the transpose of how
most people use spreadsheets, where each row is a vector.

When recovering data from `tfjs`, the returned data points are stored in a typed
array.  An array of arrays can be constructed with loops. `Array#unshift` can
prepend a title row before the conversion:

```js
const XLSX = require("xlsx");
const tf = require('@tensorflow/tfjs');

/* suppose xs and ys are vectors (1D tensors) -> tfarr will be a typed array */
const tfdata = tf.stack([xs, ys]).transpose();
const shape = tfdata.shape;
const tfarr = tfdata.dataSync();

/* construct the array of arrays */
const aoa = [];
for(let j = 0; j < shape[0]; ++j) {
  aoa[j] = [];
  for(let i = 0; i < shape[1]; ++i) aoa[j][i] = tfarr[j * shape[1] + i];
}
/* add headers to the top */
aoa.unshift(["x", "y"]);

/* generate worksheet */
const worksheet = XLSX.utils.aoa_to_sheet(aoa);
```

The [`array` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/array/) shows a complete example.

</details>


## Processing HTML Tables

#### API

_Create a worksheet by scraping an HTML TABLE in the page_

```js
var worksheet = XLSX.utils.table_to_sheet(dom_element, opts);
```

The `table_to_sheet` utility function takes a DOM TABLE element and iterates
through the rows to generate a worksheet.  The `opts` argument is optional.
["HTML Table Input"](../api/utilities#html-table-input) describes the function in more detail.



_Create a workbook by scraping an HTML TABLE in the page_

```js
var workbook = XLSX.utils.table_to_book(dom_element, opts);
```

The `table_to_book` utility function follows the same logic as `table_to_sheet`.
After generating a worksheet, it creates a blank workbook and appends the
spreadsheet.

The options argument supports the same options as `table_to_sheet`, with the
addition of a `sheet` property to control the worksheet name.  If the property
is missing or no options are specified, the default name `Sheet1` is used.

#### Examples

Here are a few common scenarios (click on each subtitle to see the code):

<details>
  <summary><b>HTML TABLE element in a webpage</b> (click to show)</summary>

```html
<!-- include the standalone script and shim.  this uses the UNPKG CDN -->
<script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js"></script>
<script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>

<!-- example table with id attribute -->
<table id="tableau">
  <tr><td>Sheet</td><td>JS</td></tr>
  <tr><td>12345</td><td>67</td></tr>
</table>

<!-- this block should appear after the table HTML and the standalone script -->
<script type="text/javascript">
  var workbook = XLSX.utils.table_to_book(document.getElementById("tableau"));

  /* DO SOMETHING WITH workbook HERE */
</script>
```

Multiple tables on a web page can be converted to individual worksheets:

```js
/* create new workbook */
var workbook = XLSX.utils.book_new();

/* convert table "table1" to worksheet named "Sheet1" */
var sheet1 = XLSX.utils.table_to_sheet(document.getElementById("table1"));
XLSX.utils.book_append_sheet(workbook, sheet1, "Sheet1");

/* convert table "table2" to worksheet named "Sheet2" */
var sheet2 = XLSX.utils.table_to_sheet(document.getElementById("table2"));
XLSX.utils.book_append_sheet(workbook, sheet2, "Sheet2");

/* workbook now has 2 worksheets */
```

Alternatively, the HTML code can be extracted and parsed:

```js
var htmlstr = document.getElementById("tableau").outerHTML;
var workbook = XLSX.read(htmlstr, {type:"string"});
```

</details>

<details>
  <summary><b>Chrome/Chromium Extension</b> (click to show)</summary>

The [`chrome` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/chrome/) shows a complete example and details the
required permissions and other settings.

In an extension, it is recommended to generate the workbook in a content script
and pass the object back to the extension:

```js
/* in the worker script */
chrome.runtime.onMessage.addListener(function(msg, sender, cb) {
  /* pass a message like { sheetjs: true } from the extension to scrape */
  if(!msg || !msg.sheetjs) return;
  /* create a new workbook */
  var workbook = XLSX.utils.book_new();
  /* loop through each table element */
  var tables = document.getElementsByTagName("table")
  for(var i = 0; i < tables.length; ++i) {
    var worksheet = XLSX.utils.table_to_sheet(tables[i]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table" + i);
  }
  /* pass back to the extension */
  return cb(workbook);
});
```

</details>

<details>
  <summary><b>Server-Side HTML Tables with Headless Chrome</b> (click to show)</summary>

The [`headless` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/headless/) includes a complete demo to convert HTML
files to XLSB workbooks.  The core idea is to add the script to the page, parse
the table in the page context, generate a `base64` workbook and send it back
for further processing:

```js
const XLSX = require("xlsx");
const { readFileSync } = require("fs"), puppeteer = require("puppeteer");

const url = `https://sheetjs.com/demos/table`;

/* get the standalone build source (node_modules/xlsx/dist/xlsx.full.min.js) */
const lib = readFileSync(require.resolve("xlsx/dist/xlsx.full.min.js"), "utf8");

(async() => {
  /* start browser and go to web page */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: "networkidle2"});

  /* inject library */
  await page.addScriptTag({content: lib});

  /* this function `s5s` will be called by the script below, receiving the Base64-encoded file */
  await page.exposeFunction("s5s", async(b64) => {
    const workbook = XLSX.read(b64, {type: "base64" });

    /* DO SOMETHING WITH workbook HERE */
  });

  /* generate XLSB file in webpage context and send back result */
  await page.addScriptTag({content: `
    /* call table_to_book on first table */
    var workbook = XLSX.utils.table_to_book(document.querySelector("TABLE"));

    /* generate XLSX file */
    var b64 = XLSX.write(workbook, {type: "base64", bookType: "xlsb"});

    /* call "s5s" hook exposed from the node process */
    window.s5s(b64);
  `});

  /* cleanup */
  await browser.close();
})();
```

</details>

<details>
  <summary><b>Server-Side HTML Tables with Headless WebKit</b> (click to show)</summary>

The [`headless` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/headless/) includes a complete demo to convert HTML
files to XLSB workbooks using [PhantomJS](https://phantomjs.org/). The core idea
is to add the script to the page, parse the table in the page context, generate
a `binary` workbook and send it back for further processing:

```js
var XLSX = require('xlsx');
var page = require('webpage').create();

/* this code will be run in the page */
var code = [ "function(){",
  /* call table_to_book on first table */
  "var wb = XLSX.utils.table_to_book(document.body.getElementsByTagName('table')[0]);",

  /* generate XLSB file and return binary string */
  "return XLSX.write(wb, {type: 'binary', bookType: 'xlsb'});",
"}" ].join("");

page.open('https://sheetjs.com/demos/table', function() {
  /* Load the browser script from the UNPKG CDN */
  page.includeJs("https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js", function() {
    /* The code will return an XLSB file encoded as binary string */
    var bin = page.evaluateJavaScript(code);

    var workbook = XLSX.read(bin, {type: "binary"});
    /* DO SOMETHING WITH workbook HERE */

    phantom.exit();
  });
});
```

</details>

<details>
  <summary><b>NodeJS HTML Tables without a browser</b> (click to show)</summary>

NodeJS does not include a DOM implementation and Puppeteer requires a hefty
Chromium build.  [`jsdom`](https://npm.im/jsdom) is a lightweight alternative:

```js
const XLSX = require("xlsx");
const { readFileSync } = require("fs");
const { JSDOM } = require("jsdom");

/* obtain HTML string.  This example reads from test.html */
const html_str = fs.readFileSync("test.html", "utf8");
/* get first TABLE element */
const doc = new JSDOM(html_str).window.document.querySelector("table");
/* generate workbook */
const workbook = XLSX.utils.table_to_book(doc);
```

</details>
