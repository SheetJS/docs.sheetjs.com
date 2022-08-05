---
sidebar_position: 1
---

# Data Import

import current from '/version.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Parsing Workbooks

### API

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

The second `opts` argument is optional. ["Parsing Options"](../api/parse-options)
covers the supported properties and behaviors.

:::warning

Browsers generally do not allow reading files by specifying filename (it is a
security risk), and running `XLSX.readFile` in the browser will throw an error.

Deno scripts must be invoked with `--allow-read` to read from the filesystem.


:::

#### Examples

Here are a few common scenarios (click on each subtitle to see the code).

The [demos](../getting-started/demos) cover special deployments in more detail.

### Example: Local File

`XLSX.readFile` supports reading local files in platforms like NodeJS. In other
platforms like React Native, `XLSX.read` should be called with file data.

In-browser processing where users drag-and-drop files or use a file element are
covered in [the "User Submissions" example.](#example-user-submissions)

<Tabs>
  <TabItem value="nodejs" label="NodeJS">

`readFile` uses `fs.readFileSync` under the hood:

```js
var XLSX = require("xlsx");

var workbook = XLSX.readFile("test.xlsx");
```

For Node ESM, `fs` must be loaded manually:

```js
import * as fs from "fs";
import { readFile, set_fs } from "xlsx/xlsx.mjs";
set_fs(fs);

const workbook = readFile("test.xlsx");
```

  </TabItem>
  <TabItem value="electron" label="Electron">

`readFile` can be used in the renderer process:

```js
/* From the renderer process */
var XLSX = require("xlsx");

var workbook = XLSX.readFile(path);
```

Electron APIs have changed over time.  The [`electron` demo](../getting-started/demos/desktop#electron)
shows a complete example and details the required version-specific settings.

  </TabItem>
  <TabItem value="reactnative" label="React Native">

:::caution

React Native does not provide a way to read files from the filesystem.  A
separate third-party library must be used.

Since React Native internals change between releases, libraries may only work
with specific versions of React Native.  Project documentation should be
consulted before picking a library.

:::caution

The [`react` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/react) includes a sample React Native app.

The following libraries have been tested:

- [`react-native-file-access`](https://npm.im/react-native-file-access)

The `base64` encoding returns strings compatible with the `base64` type:

```js
import * as XLSX from "xlsx";
import { FileSystem } from "react-native-file-access";

const b64 = await FileSystem.readFile(path, "base64");
/* b64 is a base64 string */
const workbook = XLSX.read(b64, {type: "base64"});
```

- [`react-native-fs`](https://npm.im/react-native-fs)

The `ascii` encoding returns binary strings compatible with the `binary` type:

```js
import * as XLSX from "xlsx";
import { readFile } from "react-native-fs";

const bstr = await readFile(path, "ascii");
/* bstr is a binary string */
const workbook = XLSX.read(bstr, {type: "binary"});
```

  </TabItem>
  <TabItem value="extendscript" label="Photoshop">

`readFile` wraps the `File` logic in Photoshop and other ExtendScript targets.
The specified path should be an absolute path:

```js
#include "xlsx.extendscript.js"

/* Read test.xlsx from the Documents folder */
var workbook = XLSX.readFile(Folder.myDocuments + "/test.xlsx");
```

For user-configurable paths, `openDialog` can show a file picker:

```js
#include "xlsx.extendscript.js"

/* Ask user to select path */
var thisFile = File.openDialog("Select a spreadsheet");
var workbook = XLSX.readFile(thisFile.absoluteURI);
```

The [`extendscript` demo](../getting-started/demos/extendscript) includes a more complex example.

  </TabItem>
  <TabItem value="deno" label="Deno">

`readFile` uses `Deno.readFileSync` under the hood:

<pre><code parentName="pre" {...{"className": "language-ts"}}>{`\
// @deno-types="https://cdn.sheetjs.com/xlsx-${current}/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-${current}/package/xlsx.mjs';

const workbook = XLSX.readFile("test.xlsx");`}</code></pre>

:::note

Applications reading files must be invoked with the `--allow-read` flag.

:::

  </TabItem>
  <TabItem value="bun" label="Bun">

[Bun `readFileSync`](https://github.com/Jarred-Sumner/bun/issues/256) currently
returns a `Uint8Array`.  The result should be wrapped in a `Buffer`:

```js
import { readFileSync } from 'fs'
import { read } from './xlsx.mjs'

const workbook = read(Buffer.from(readFileSync(path)));
```

  </TabItem>
</Tabs>


### Example: User Submissions

This example focuses on user-submitted files through a drag-and-drop event, HTML
file input element, or network request.

<Tabs>
  <TabItem value="browser" label="Browser">

**For modern websites targeting Chrome 76+**, `File#arrayBuffer` is recommended:

<Tabs>
  <TabItem value="dnd" label="Drag and Drop">

Assume `drop_dom_element` is the DOM element that will listen for changes:

```html
<div id="drop_dom_element">Drop files here</div>
```

The event property is `e.dataTransfer`.  The code snippet highlights the
difference between the drag-and-drop example and the file input example:


```js
// XLSX is a global from the standalone script

async function handleDropAsync(e) {
  e.stopPropagation(); e.preventDefault();
  // highlight-next-line
  const f = e.dataTransfer.files[0];
  /* f is a File */
  const data = await f.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
}
drop_dom_element.addEventListener("drop", handleDropAsync, false);
```

  </TabItem>
  <TabItem value="file" label="HTML File Input Element">

Starting with an HTML INPUT element with `type="file"`:

```html
<input type="file" id="input_dom_element">
```

The event property is `e.target`.  The code snippet highlights the difference
between the drag-and-drop example and the file input example:

```js
// XLSX is a global from the standalone script

async function handleFileAsync(e) {
  // highlight-next-line
  const file = e.target.files[0];
  const data = await file.arrayBuffer();
  /* data is an ArrayBuffer */
  const workbook = XLSX.read(data);

  /* DO SOMETHING WITH workbook HERE */
}
input_dom_element.addEventListener("change", handleFileAsync, false);
```

  </TabItem>
</Tabs>

<https://oss.sheetjs.com/sheetjs/> demonstrates the FileReader technique.


**For maximal compatibility (IE10+)**, the `FileReader` approach is recommended:

<Tabs>
  <TabItem value="dnd" label="Drag and Drop">

Assume `drop_dom_element` is the DOM element that will listen for changes:

```html
<div id="drop_dom_element">Drop files here</div>
```

The event property is `e.dataTransfer`.  The code snippet highlights the
difference between the drag-and-drop example and the file input example:

```js
function handleDrop(e) {
  e.stopPropagation(); e.preventDefault();
  // highlight-next-line
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

  </TabItem>
  <TabItem value="file" label="HTML File Input Element">

Starting with an HTML INPUT element with `type="file"`:

```html
<input type="file" id="input_dom_element">
```

The event property is `e.target`.  The code snippet highlights the difference
between the drag-and-drop example and the file input example:

```js
function handleFile(e) {
  // highlight-next-line
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

  </TabItem>
</Tabs>

The [`oldie` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/oldie/) shows an IE-compatible fallback scenario.

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

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

  </TabItem>
  <TabItem value="deno" label="Deno">

[Drash](https://drash.land/drash/) is a framework for Deno's HTTP server.  In a
`POST` request handler, the body parser can pull file data into a `Uint8Array`:

<pre><code parentName="pre" {...{"className": "language-ts"}}>{`\
// @deno-types="https://cdn.sheetjs.com/xlsx-${current}/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-${current}/package/xlsx.mjs';
/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://cdn.sheetjs.com/xlsx-${current}/package/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);

import * as Drash from "https://deno.land/x/drash@v2.5.4/mod.ts";

class SheetResource extends Drash.Resource {
  public paths = ["/"];

  public POST(request: Drash.Request, response: Drash.Response) {
    // highlight-next-line
    const file = request.bodyParam<Drash.Types.BodyFile>("file");
    if (!file) throw new Error("File is required!");
    // highlight-next-line
    var wb = XLSX.read(file.content, {type: "buffer"});
    var html = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
    return response.html(html);
  }
}

const server = new Drash.Server({ hostname: "", port: 7262, protocol: "http",
  resources: [
    // highlight-next-line
    SheetResource,
  ],
});

server.run();`}</code></pre>

:::note

Deno must be run with the `--allow-net` flag to enable network requests:

```bash
$ deno run --allow-net test-server.ts
```

To test, submit a POST request to http://localhost:7262 including a file:

```bash
curl -X POST -F "file=@test.xlsx" http://localhost:7262/
```

:::


  </TabItem>
</Tabs>


### Example: Remote File

This example focuses on fetching files ("Ajax" in browser parlance) using APIs
like `XMLHttpRequest` and `fetch` as well as third-party libraries.

<Tabs>
  <TabItem value="browser" label="Browser">

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

The [`xhr` demo](../getting-started/demos/network) includes a longer discussion and more examples.

<http://oss.sheetjs.com/sheetjs/ajax.html> shows fallback approaches for IE6+.

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

Node 17.5 and 18.0 have native support for fetch:

```js
const XLSX = require("xlsx");

const url = "http://oss.sheetjs.com/test_files/formula_stress_test.xlsx";
const data = await (await fetch(url)).arrayBuffer();
/* data is an ArrayBuffer */
const workbook = XLSX.read(data);
```

For broader compatibility, third-party modules are recommended.

[`request`](https://npm.im/request) requires a `null` encoding to yield Buffers:

```js
var XLSX = require("xlsx");
var request = require("request");

var url = "http://oss.sheetjs.com/test_files/formula_stress_test.xlsx";
request({url: url, encoding: null}, function(err, resp, body) {
  var workbook = XLSX.read(body);

  /* DO SOMETHING WITH workbook HERE */
});
```

[`axios`](https://axios-http.com/) works the same way in browser and in NodeJS:

```js
const XLSX = require("xlsx");
const axios = require("axios");

const url = "http://oss.sheetjs.com/test_files/formula_stress_test.xlsx";
(async() => {
  const res = await axios.get(url, {responseType: "arraybuffer"});
  /* res.data is a Buffer */
  const workbook = XLSX.read(res.data);

  /* DO SOMETHING WITH workbook HERE */
})();
```

  </TabItem>
  <TabItem value="bun" label="Bun">

Bun has native support for `fetch`.  Using the [NodeJS package](../installation/nodejs):

```js
import * as XLSX from 'xlsx/xlsx.mjs';
/* load the codepage support library for extended support with older formats  */
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);

const url = "http://oss.sheetjs.com/test_files/formula_stress_test.xlsx";
// highlight-next-line
const data = await (await fetch(url)).arrayBuffer();
/* data is an ArrayBuffer */
const workbook = XLSX.read(data);
```

  </TabItem>
  <TabItem value="deno" label="Deno">

Deno has native support for `fetch`.

<pre><code parentName="pre" {...{"className": "language-ts"}}>{`\
// @deno-types="https://cdn.sheetjs.com/xlsx-${current}/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-${current}/package/xlsx.mjs';
/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://cdn.sheetjs.com/xlsx-${current}/package/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);

const url = "http://oss.sheetjs.com/test_files/formula_stress_test.xlsx";
// highlight-next-line
const data = await (await fetch(url)).arrayBuffer();
/* data is an ArrayBuffer */
const workbook = XLSX.read(data);`}</code></pre>

:::note

Deno must be run with the `--allow-net` flag to enable network requests:

```
$ deno run --allow-net test-fetch.ts
```

:::

  </TabItem>
  <TabItem value="electron" label="Electron">

The `net` module in the main process can make HTTP/HTTPS requests to external
resources.  Responses should be manually concatenated using `Buffer.concat`:

```js
const XLSX = require("xlsx");
const { net } = require("electron");

const url = "http://oss.sheetjs.com/test_files/formula_stress_test.xlsx";
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

  </TabItem>
</Tabs>

### Example: Readable Streams

:::caution

The recommended approach is to buffer streams in memory and process once all of
the data has been collected. A proper streaming parse is technically impossible.

<details><summary><b>Technical details</b> (click to show)</summary>

XLSX, XLSB, NUMBERS, and ODS files are ultimately ZIP files that contain binary
and XML entries.  The ZIP file format stores the table of contents ("end of
central directory" record) at the end of the file, so a proper parse of a ZIP
file requires scanning from the end.  Streams do not provide random access into
the data, so the only correct approach involves buffering the entire stream.

XLS, XLR, QPW, and Works 4 for Mac files use the "Compound File Binary Format".
It is a container format that can hold multiple "files" and "folders".  It also
has a table of contents ("directory sectors") but these can be placed anywhere
in the file!  The only correct approach involves buffering enough of the stream
to find the full table of contents, but the added complexity has little benefit
when testing against real-world files generated by various versions of Excel and
other tools.

</details>

:::


<Tabs>
  <TabItem value="browser" label="Browser">

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

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

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

  </TabItem>
  <TabItem value="deno" label="Deno">

In addition to the browser `ReadableStream` API, Deno has its own `Reader`
[interface](https://doc.deno.land/deno/stable/~/Deno.Reader).

For these streams, `std` provides a `readAll` method to collect data into a
`Uint8Array`.  This example reads from a file using `Deno.open` and prints the
worksheet names array:

<pre><code parentName="pre" {...{"className": "language-ts"}}>{`\
// @deno-types="https://cdn.sheetjs.com/xlsx-${current}/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-${current}/package/xlsx.mjs';

import { readAll } from "https://deno.land/std/streams/conversion.ts";

/* Simple Deno.Reader from a file */
const file = await Deno.open("test.xlsx", {read: true});

/* \`content\` will be a Uint8Array holding the full contents of the stream */
const content  = await readAll(file);

/* Since this is a Uint8Array, \`XLSX.read\` "just works" */
const wb = XLSX.read(content);
console.log(wb.SheetNames);`}</code></pre>

  </TabItem>
</Tabs>

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
[demo](https://github.com/sheetjs/sheetjs/tree/master/demos/xspreadsheet)
includes a sample script with the `xtos` function for converting from
x-spreadsheet to a workbook.  Live Demo: <https://oss.sheetjs.com/sheetjs/x-spreadsheet>

["Typed Arrays and ML"](../getting-started/demos/ml) covers strategies for
creating worksheets from ML library exports (datasets stored in Typed Arrays).

<details>
  <summary><b>Records from a database query (SQL or no-SQL)</b> (click to show)</summary>

The [`database` demo](https://github.com/sheetjs/sheetjs/tree/master/demos/database/) includes examples of working with
databases and query results.

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

The [Headless Demo](../getting-started/demos/headless) includes examples of
server-side spreadsheet generation from HTML TABLE elements using headless
Chromium ("Puppeteer") and other browsers ("Playwright")

Here are a few common scenarios (click on each subtitle to see the code):

<details>
  <summary><b>HTML TABLE element in a webpage</b> (click to show)</summary>

```html
<!-- include the standalone script and shim -->
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
