---
sidebar_position: 5
---

# Data Export

import current from '/version.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Writing Workbooks

### API

_Generate spreadsheet bytes (file) from data_

```js
var data = XLSX.write(workbook, opts);
```

The `write` method attempts to package data from the workbook into a file in
memory.  By default, XLSX files are generated, but that can be controlled with
the `bookType` property of the `opts` argument.  Based on the `type` option,
the data can be stored as a "binary string", JS string, `Uint8Array` or Buffer.

The second `opts` argument is required.  ["Writing Options"](../api/write-options)
covers the supported properties and behaviors.

_Generate and attempt to save file_

```js
XLSX.writeFile(workbook, filename, opts);
```

The `writeFile` method packages the data and attempts to save the new file.  The
export file format is determined by the extension of `filename` (`SheetJS.xlsx`
signals XLSX export, `SheetJS.xlsb` signals XLSB export, etc).

The second `opts` argument is optional.  ["Writing Options"](../api/write-options)
covers the supported properties and behaviors.

_Generate and attempt to save an XLSX file_

```js
XLSX.writeFileXLSX(workbook, filename, opts);
```

The `writeFile` method embeds a number of different export functions.  This is
great for developer experience but not amenable to tree shaking using the
current developer tools.  When only XLSX exports are needed, this method avoids
referencing the other export functions.

The second `opts` argument is optional.  ["Writing Options"](../api/write-options)
covers the supported properties and behaviors.

:::note

The `writeFile` and `writeFileXLSX` methods uses platform-specific APIs to save
files. The APIs do not generally provide feedback on whether files were created.

:::

#### Examples

Here are a few common scenarios (click on each subtitle to see the code).

The [demos](../demos) cover special deployments in more detail.

### Example: Local File

`XLSX.writeFile` supports writing local files in platforms like NodeJS. In other
platforms like React Native, `XLSX.write` should be called with file data.

<Tabs>
  <TabItem value="browser" label="Browser">

`XLSX.writeFile` wraps a few techniques for triggering a file save:

- `URL` browser API creates an object URL for the file, which the library uses
  by creating a link and forcing a click. It is supported in modern browsers.
- `msSaveBlob` is an IE10+ API for triggering a file save.
- `IE_FileSave` uses VBScript and ActiveX to write a file in IE6+ for Windows
  XP and Windows 7.  The shim must be included in the containing HTML page.

There is no standard way to determine if the actual file has been downloaded.

```js
/* output format determined by filename */
XLSX.writeFile(workbook, "out.xlsb");
/* at this point, out.xlsb will have been downloaded */
```

:::caution Web Workers

None of the file writing APIs work from Web Workers.  To generate a file:

1) use `XLSX.write` with type `array` to generate a `Uint8Array`:

```js
// in the web worker, generate the XLSX file as a Uint8Array
const u8 = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
```

2) send the data back to the main thread:

```js
// in the web worker, send the generated data back to the main thread
postMessage({t: "export", v: u8 });
```

3) from the main thread, add an event listener to write to file:

```js
// in the main page
worker.addEventListener('message', function(e) {
  if(e && e.data && e.data.t == "export") {
    e.stopPropagation();
    e.preventDefault();
    // data will be the Uint8Array from the worker
    const data = e.data.v;

    var blob = new Blob([data], {type:"application/octet-stream"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.download = "SheetJSXPort.xlsx";
    a.href = url;
    document.body.appendChild(a);
    a.click();
  }
});
```

:::

<details>
  <summary><b>SWF workaround for Windows 95+</b> (click to show)</summary>

:::warning

Each moving part in this solution has been deprecated years ago:

- Adobe stopped supporting Flash Player at the end of 2020
- Microsoft stopped supporting IE8 in 2019 and stopped supporting IE9 in 2020
- `Downloadify` support ended in 2010 and `SWFObject` support ended in 2016

New projects should strongly consider requiring modern browsers.  This info is
provided on an "as is" basis and there is no realistic way to provide support
given that every related vendor stopped providing support for their software.

:::

`XLSX.writeFile` techniques work for most modern browsers as well as older IE.
For much older browsers, there are workarounds implemented by wrapper libraries.

[`Downloadify`](https://github.com/dcneiner/downloadify) uses a Flash SWF button
to generate local files, suitable for environments where ActiveX is unavailable:

```js
Downloadify.create(id,{
  /* other options are required! read the downloadify docs for more info */
  filename: "test.xlsx",
  data: function() { return XLSX.write(wb, {bookType:"xlsx", type:"base64"}); },
  append: false,
  dataType: "base64"
});
```

The [`oldie` demo](../demos/legacy#internet-explorer) shows an IE-compatible fallback scenario.

</details>

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

`writeFile` uses `fs.writeFileSync` under the hood:

```js
var XLSX = require("xlsx");

/* output format determined by filename */
XLSX.writeFile(workbook, "out.xlsb");
```

For Node ESM, `fs` must be loaded manually:

```js
import * as fs from "fs";
import { writeFile, set_fs } from "xlsx/xlsx.mjs";
set_fs(fs);

/* output format determined by filename */
writeFile(workbook, "out.xlsb");
```

  </TabItem>
  <TabItem value="bun" label="Bun">

As with Node ESM, `fs` must be loaded manually:

```js
import * as fs from "fs";
import { writeFile, set_fs } from "xlsx/xlsx.mjs";
set_fs(fs);

/* output format determined by filename */
writeFile(workbook, "out.xlsb");
```

  </TabItem>
  <TabItem value="deno" label="Deno">

`writeFile` uses `Deno.writeFileSync` under the hood:

<pre><code parentName="pre" {...{"className": "language-ts"}}>{`\
// @deno-types="https://cdn.sheetjs.com/xlsx-${current}/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-${current}/package/xlsx.mjs';

XLSX.writeFile(workbook, "test.xlsx");`}</code></pre>

:::note

Applications writing files must be invoked with the `--allow-write` flag.

:::

  </TabItem>
  <TabItem value="electron" label="Electron">

`writeFile` can be used in the renderer process:

```js
/* From the renderer process */
var XLSX = require("xlsx");

XLSX.writeFile(workbook, "out.xlsb");
```

Electron APIs have changed over time.  The [`electron` demo](../demos/desktop#electron)
shows a complete example and details the required version-specific settings.

  </TabItem>
  <TabItem value="reactnative" label="React Native">

[The React Native Demo](../demos/mobile#rn-file-plugins) covers tested plugins.

  </TabItem>
  <TabItem value="extendscript" label="Photoshop">

`writeFile` wraps the `File` logic in Photoshop and other ExtendScript targets.
The specified path should be an absolute path:

```js
#include "xlsx.extendscript.js"

/* Ask user to select path */
var thisFile = File.saveDialog("Select an output file", "*.xlsx;*.xls");
/* output format determined by filename */
XLSX.writeFile(workbook, thisFile.absoluteURI);
```

The [`extendscript` demo](../demos/extendscript) includes a more complex example.

  </TabItem>
  <TabItem value="headless" label="Headless">

The [`headless` demo](../demos/headless) includes complete
examples of converting HTML TABLE elements to XLSB workbooks using Puppeteer
and other headless automation tools.

Headless browsers may not have access to the filesystem, so `XLSX.writeFile`
may fail.  It is strongly recommended to generate the file bytes in the browser
context, send the bytes to the automation context, and write from automation.

Puppeteer and Playwright are NodeJS modules that support binary strings:

```js
/* from the browser context */
var bin = XLSX.write(workbook, { type:"binary", bookType: "xlsb" });

/* from the automation context */
fs.writeFileSync("SheetJSansHead.xlsb", bin, { encoding: "binary" });
```

PhantomJS `fs.write` supports writing files from the main process.  The mode
`wb` supports binary strings:

```js
/* from the browser context */
var bin = XLSX.write(workbook, { type:"binary", bookType: "xlsb" });

/* from the automation context */
fs.write("SheetJSansHead.xlsb", bin, "wb");
```

  </TabItem>
</Tabs>


### Example: Server Responses

This example focuses on responses to network requests in a server-side platform
like NodeJS. While files can be generated in the web browser, server-side file
generation allows for exact audit trails and has better mobile user support.

:::caution

Production deployments should use a server framework like ExpressJS.  These
snippets use low-level APIs for illustration purposes.

:::

The `Content-Type` header should be set to `application/vnd.ms-excel` for Excel
exports including XLSX. The default `application/octet-stream` can be used, but
iOS will not automatically suggest to open files in Numbers or Excel for iOS

The `Content-Disposition` header instructs browsers to download the response
into a file.  The header can also include the desired file name.

<Tabs>
  <TabItem value="nodejs" label="NodeJS">

NodeJS `http.ServerResponse#end` can accept `Buffer` objects. `XLSX.write` with
`buffer` type returns `Buffer` objects.

```js
/* generate Buffer */
const buf = XLSX.write(wb, { type:"buffer", bookType:"xlsx" });

/* prepare response headers */
res.statusCode = 200;
res.setHeader('Content-Disposition', 'attachment; filename="SheetJSNode.xlsx"');
res.setHeader('Content-Type', 'application/vnd.ms-excel');
res.end(buf);
```

<details><summary><b>Complete Example</b> (click to show)</summary>

Install the library with

```bash
npm i https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
```

Save the following script to `node.js` and run with `node node.js`:

```js title="node.js"
const http = require('http');
const XLSX = require('xlsx');

const hostname = '127.0.0.1';
const port = 7262;

/* fixed sample worksheet */
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
  ["a","b","c"], [1,2,3]
]), "Sheet1");

const server = http.createServer((req, res) => {
  const buf = XLSX.write(wb, { type:"buffer", bookType:"xlsx" });
  res.statusCode = 200;
  res.setHeader('Content-Disposition', 'attachment; filename="SheetJSNode.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.ms-excel');
  res.end(buf);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

</details>

  </TabItem>
  <TabItem value="deno" label="Deno">



  </TabItem>
  <TabItem value="bun" label="Bun">

Bun responses are expected to be `Response` objects. `XLSX.write` with `buffer`
type returns `Buffer` objects that can be used in the `Response` constructor.

```js
/* generate Buffer */
const buf = XLSX.write(wb, { type:"buffer", bookType:"xlsx" });
/* return Response */
return new Response(buf, {
  headers: {
    "Content-Type": "application/vnd.ms-excel",
    "Content-Disposition": 'attachment; filename="SheetJSBun.xlsx"'
  }
});
```

<details><summary><b>Complete Example</b> (click to show)</summary>

Download [`xlsx.mjs`](https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs).
Save the following script to `bun.js` and run with `bun bun.js`.   Open a web
browser and access <http://localhost:7262> to download the exported workbook.

```js title="bun.js"
import * as XLSX from "./xlsx.mjs";

/* fixed sample worksheet */
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
  ["a","b","c"], [1,2,3]
]), "Sheet1");

export default {
  port: 7262,
  fetch(request) {
    /* generate Buffer */
    const buf = XLSX.write(wb, {type:"buffer", bookType:"xlsx"});
    /* return Response */
    return new Response(buf, {
      headers: {
        "Content-Type": "application/vnd.ms-excel",
        "Content-Disposition": 'attachment; filename="SheetJSBun.xlsx"'
      }
    });
  },
};
```

</details>

  </TabItem>
</Tabs>


### Example: Remote File

This example focuses on uploading files ("Ajax" in browser parlance) using APIs
like `XMLHttpRequest` and `fetch` as well as third-party libraries.

<Tabs>
  <TabItem value="browser" label="Browser">

:::caution

Some platforms like Azure and AWS will attempt to parse POST request bodies as
UTF-8 strings before user code can see the data.  This will result in corrupt
data parsed by the server.  There are some workarounds, but the safest approach
is to adjust the server process or Lambda function to accept Base64 strings.

:::

A complete example using XHR is [included in the XHR demo](../demos/network),
along with examples for fetch and wrapper libraries.

Under normal circumstances, a `Blob` can be generated from the `array` output:

```js
/* in this example, send a Blob to the server */
var wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

/* prepare data for POST */
var blob = new Blob([new Uint8Array(wbout)], {type:"application/octet-stream"});
var formdata = new FormData();
formdata.append("file", blob, "test.xlsx");

/* perform POST request */
fetch("/upload", { method: 'POST', body: formdata });
```

When binary data is not supported, Base64 strings should be passed along.  This
will require the server to expect and decode the data:

```js
/* in this example, send a Base64 string to the server */
var wbout = XLSX.write(workbook, { bookType: "xlsx", type: "base64" });

/* prepare data for POST */
var formdata = new FormData();
formdata.append("file", "test.xlsx"); // <-- server expects `file` to hold name
formdata.append("data", wbout); // <-- `data` holds the data encoded in Base64

/* perform POST request */
var req = new XMLHttpRequest();
req.open("POST", "/upload", true);
req.send(formdata);
```

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

`XLSX.write` with `type: "buffer"` will generate a NodeJS `Buffer` which can be
used with standard NodeJS approaches for uploading data.

Node 17.5 and 18.0 have native support for fetch:

```js
const XLSX = require("xlsx");

const buf = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
var blob = new Blob([buf], {type:"application/octet-stream"});
var formdata = new FormData();
formdata.append("file", blob, "test.xlsx");

/* perform POST request */
fetch("https://thisis.a.test/upload", { method: 'POST', body: formdata });
```

  </TabItem>
</Tabs>

## Generating JSON and JS Data

JSON and JS data tend to represent single worksheets. The utility functions in
this section work with single worksheets.

The ["Common Spreadsheet Format"](../csf/general) section describes
the object structure in more detail.  `workbook.SheetNames` is an ordered list
of the worksheet names.  `workbook.Sheets` is an object whose keys are sheet
names and whose values are worksheet objects.

The "first worksheet" is stored at `workbook.Sheets[workbook.SheetNames[0]]`.

### API

_Create an array of JS objects from a worksheet_

```js
var jsa = XLSX.utils.sheet_to_json(worksheet, opts);
```

_Create an array of arrays of JS values from a worksheet_

```js
var aoa = XLSX.utils.sheet_to_json(worksheet, {...opts, header: 1});
```

The `sheet_to_json` utility function walks a workbook in row-major order,
generating an array of objects.  The second `opts` argument controls a number of
export decisions including the type of values (JS values or formatted text). The
["JSON"](../api/utilities#json) section describes the argument in more detail.

By default, `sheet_to_json` scans the first row and uses the values as headers.
With the `header: 1` option, the function exports an array of arrays of values.

#### Examples

### Example: Data Grids

<Tabs>
  <TabItem value="js" label="Vanilla JS">

[`x-spreadsheet`](https://github.com/myliang/x-spreadsheet) is an interactive
data grid for previewing and modifying structured data in the web browser.  The
[demo](../demos/grid#x-spreadsheet) includes a sample script and live demo.

  </TabItem>
  <TabItem value="react" label="React">

[`react-data-grid`](https://adazzle.github.io/react-data-grid) is a data grid
built for React.  It uses two properties: `rows` of data objects and `columns`
which describe the columns.  For the purposes of massaging the data to fit the
`react-data-grid` API it is easiest to start from an array of arrays.

This demo starts by fetching a remote file and using `XLSX.read` to extract:

```js
import { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import { read, utils } from "xlsx";

const url = "https://oss.sheetjs.com/test_files/RkNumber.xls";

export default function App() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {(async () => {
    const wb = read(await (await fetch(url)).arrayBuffer());

    /* use sheet_to_json with header: 1 to generate an array of arrays */
    const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });

    /* see react-data-grid docs to understand the shape of the expected data */
    setColumns(data[0].map((r) => ({ key: r, name: r })));
    setRows(data.slice(1).map((r) => r.reduce((acc, x, i) => {
      acc[data[0][i]] = x;
      return acc;
    }, {})));
  })(); });

  return <DataGrid columns={columns} rows={rows} />;
}
```

  </TabItem>
  <TabItem value="vue" label="VueJS">

[`vue3-table-lite`](https://vue3-lite-table.vercel.app/) is a simple VueJS 3
data table.  It is featured in the [dedicated demo](../demos/grid#vue3-table-lite).

  </TabItem>
</Tabs>

### Example: Data Loading

["Typed Arrays and ML"](../demos/ml) covers strategies for
generating typed arrays and tensors from worksheet data.

<details>
  <summary><b>Populating a database (SQL or no-SQL)</b> (click to show)</summary>

The [`database` demo](../demos/database/) includes examples of working with databases and query results.

</details>




## Generating HTML Tables

#### API

_Generate HTML Table from Worksheet_

```js
var html = XLSX.utils.sheet_to_html(worksheet);
```

The `sheet_to_html` utility function generates HTML code based on the worksheet
data.  Each cell in the worksheet is mapped to a `<TD>` element.  Merged cells
in the worksheet are serialized by setting `colspan` and `rowspan` attributes.

#### Examples

The `sheet_to_html` utility function generates HTML code that can be added to
any DOM element by setting the `innerHTML`:

```js
var container = document.getElementById("tavolo");
container.innerHTML = XLSX.utils.sheet_to_html(worksheet);
```

Combining with `fetch`, constructing a site from a workbook is straightforward:

<Tabs>
  <TabItem value="js" label="Vanilla JS">

This example assigns the `innerHTML` of a DIV element:

```html
<body>
  <style>TABLE { border-collapse: collapse; } TD { border: 1px solid; }</style>
  <div id="tavolo"></div>
  <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
  <script type="text/javascript">
(async() => {
  /* fetch and parse workbook -- see the fetch example for details */
  const workbook = XLSX.read(await (await fetch("sheetjs.xlsx")).arrayBuffer());

  let output = [];
  /* loop through the worksheet names in order */
  workbook.SheetNames.forEach(name => {

    /* generate HTML from the corresponding worksheets */
    const worksheet = workbook.Sheets[name];
    const html = XLSX.utils.sheet_to_html(worksheet);

    /* add a header with the title name followed by the table */
    output.push(`<H3>${name}</H3>${html}`);
  });
  /* write to the DOM at the end */
  tavolo.innerHTML = output.join("\n");
})();
  </script>
</body>
```

  </TabItem>
  <TabItem value="react" label="React">

It is generally recommended to use a React-friendly workflow, but it is possible
to generate HTML and use it in React with `dangerouslySetInnerHTML`:

```jsx
import * as XLSX from 'xlsx';

function Tabeller(props) {
  /* the workbook object is the state */
  const [workbook, setWorkbook] = React.useState(XLSX.utils.book_new());

  /* fetch and update the workbook with an effect */
  React.useEffect(() => { (async() => {
    /* fetch and parse workbook -- see the fetch example for details */
    const wb = XLSX.read(await (await fetch("sheetjs.xlsx")).arrayBuffer());
    setWorkbook(wb);
  })(); });

  return workbook.SheetNames.map(name => (<>
    <h3>name</h3>
    <div dangerouslySetInnerHTML={{
      /* this __html mantra is needed to set the inner HTML */
      __html: XLSX.utils.sheet_to_html(workbook.Sheets[name])
    }} />
  </>));
}
```

The [`react` demo](../demos/react) includes more React examples.

  </TabItem>
  <TabItem value="vue" label="VueJS">

It is generally recommended to use a VueJS-friendly workflow, but it is possible
to generate HTML and use it in VueJS with the `v-html` directive:

```jsx
import { read, utils } from 'xlsx';
import { reactive } from 'vue';

const S5SComponent = {
  mounted() { (async() => {
    /* fetch and parse workbook -- see the fetch example for details */
    const workbook = read(await (await fetch("sheetjs.xlsx")).arrayBuffer());
    /* loop through the worksheet names in order */
    workbook.SheetNames.forEach(name => {
      /* generate HTML from the corresponding worksheets */
      const html = utils.sheet_to_html(workbook.Sheets[name]);
      /* add to state */
      this.wb.wb.push({ name, html });
    });
  })(); },
  /* this state mantra is required for array updates to work */
  setup() { return { wb: reactive({ wb: [] }) }; },
  template: `
  <div v-for="ws in wb.wb" :key="ws.name">
    <h3>{{ ws.name }}</h3>
    <div v-html="ws.html"></div>
  </div>`
};
```

The [`vuejs` demo](../demos/vue) includes more React examples.

  </TabItem>
</Tabs>

## Generating Single-Worksheet Snapshots

The `sheet_to_*` functions accept a worksheet object.

#### API

_Generate a CSV from a single worksheet_

```js
var csv = XLSX.utils.sheet_to_csv(worksheet, opts);
```

This snapshot is designed to replicate the "CSV UTF-8 (`.csv`)" output type.
["Delimiter-Separated Output"](../api/utilities#delimiter-separated-output) describes the
function and the optional `opts` argument in more detail.

_Generate "Text" from a single worksheet_

```js
var txt = XLSX.utils.sheet_to_txt(worksheet, opts);
```

This snapshot is designed to replicate the "UTF-16 Text (`.txt`)" output type.
["Delimiter-Separated Output"](../api/utilities#delimiter-separated-output) describes the
function and the optional `opts` argument in more detail.

_Generate a list of formulae from a single worksheet_

```js
var fmla = XLSX.utils.sheet_to_formulae(worksheet);
```

This snapshot generates an array of entries representing the embedded formulae.
Array formulae are rendered in the form `range=formula` while plain cells are
rendered in the form `cell=formula or value`.  String literals are prefixed with
an apostrophe `'`, consistent with Excel's formula bar display.

["Formulae Output"](../api/utilities#formulae-output) describes the function in more detail.

## Streaming Write

The streaming write functions are available in the `XLSX.stream` object.  They
take the same arguments as the normal write functions but return a NodeJS
Readable Stream.

- `XLSX.stream.to_csv` is the streaming version of `XLSX.utils.sheet_to_csv`.
- `XLSX.stream.to_html` is the streaming version of `XLSX.utils.sheet_to_html`.
- `XLSX.stream.to_json` is the streaming version of `XLSX.utils.sheet_to_json`.

<Tabs>
  <TabItem value="nodejs" label="NodeJS">

:::note

In a CommonJS context, NodeJS Streams and `fs` immediately work with SheetJS:

```js
const XLSX = require("xlsx"); // "just works"
```

In NodeJS ESM, the dependency must be loaded manually:

```js
import * as XLSX from 'xlsx';
import { Readable } from 'stream';

XLSX.stream.set_readable(Readable); // manually load stream helpers
```

Additionally, for file-related operations in NodeJS ESM, `fs` must be loaded:

```js
import * as XLSX from 'xlsx';
import * as fs from 'fs';

XLSX.set_fs(fs); // manually load fs helpers
```

**It is strongly encouraged to use CommonJS in NodeJS whenever possible.**

:::

This example reads a worksheet passed as an argument to the script, pulls the
first worksheet, converts to CSV and writes to `out.csv`:

```js
const workbook = XLSX.readFile(process.argv[2]);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// highlight-next-line
const stream = XLSX.stream.to_csv(worksheet);

const output_file_name = "out.csv";
// highlight-next-line
stream.pipe(fs.createWriteStream(output_file_name));
```

`stream.to_json` uses Object-mode streams. A `Transform` stream can be used to
generate a normal stream for streaming to a file or the screen:

```js
/* to_json returns an object-mode stream */
// highlight-next-line
var stream = XLSX.stream.to_json(worksheet, {raw:true});

/* this Transform stream converts JS objects to text and prints to screen */
var conv = new Transform({writableObjectMode:true});
conv._transform = function(obj, e, cb){ cb(null, JSON.stringify(obj) + "\n"); };
conv.pipe(process.stdout);

// highlight-next-line
stream.pipe(conv);
```

  </TabItem>
  <TabItem value="deno" label="Deno">

Deno does not support NodeJS streams in normal execution, so a wrapper is used.
This demo converts a worksheet to CSV and prints each row to the screen:

```ts
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import {utils, stream, set_cptable} from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';

/* `Readable` will be compatible with how SheetJS uses `stream.Readable` */
function NodeReadableCB(cb:(d:any)=>void) {
  var rd = {
    __done: false,
    _read: function() {},
    push: function(d: any) { if(!this.__done) cb(d); if(d == null) this.__done = true; },
    resume: function pump() {for(var i = 0; i < 10000 && !this.__done; ++i) rd._read(); if(!rd.__done) setTimeout(pump, 0); }
  };
  return rd;
}
function NodeReadable(rd: any) { return function() { return rd; }; }
/* The callback gets each CSV row.  It will be `null` when the stream is drained */
const rt = NodeReadableCB((d: any) => { if(d != null) console.log(d); });
const Readable = NodeReadable(rt);
stream.set_readable(Readable);

/* wire up and start the stream */
const rd = stream.to_csv(worksheet);
rd.resume();
```

  </TabItem>
</Tabs>


<https://sheetaki.now.sh/> pipes write streams to nodejs response.
