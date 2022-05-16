---
sidebar_position: 5
---

# Data Export

## Writing Workbooks

#### API

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

The `writeFile` method uses platform-specific APIs to initiate the file save. In
NodeJS, `fs.readFileSync` can create a file.  In the web browser, a download is
attempted using the HTML5 `download` attribute, with fallbacks for IE.

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

#### Examples

<details>
  <summary><b>Local file in a NodeJS server</b> (click to show)</summary>

`writeFile` uses `fs.writeFileSync` in server environments:

```js
var XLSX = require("xlsx");

/* output format determined by filename */
XLSX.writeFile(workbook, "out.xlsb");
```

For Node ESM, the `writeFile` helper is not enabled. Instead, `fs.writeFileSync`
should be used to write the file data to a `Buffer` for use with `XLSX.write`:

```js
import { writeFileSync } from "fs";
import { write } from "xlsx/xlsx.mjs";

const buf = write(workbook, {type: "buffer", bookType: "xlsb"});
/* buf is a Buffer */
const workbook = writeFileSync("out.xlsb", buf);
```

</details>

<details>
  <summary><b>Local file in a Deno application</b> (click to show)</summary>

`writeFile` uses `Deno.writeFileSync` under the hood:

```js
// @deno-types="https://deno.land/x/sheetjs/types/index.d.ts"
import * as XLSX from 'https://deno.land/x/sheetjs/xlsx.mjs'

XLSX.writeFile(workbook, "test.xlsx");
```

Applications writing files must be invoked with the `--allow-write` flag.  The
[`deno` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/deno/) has more examples

</details>

<details>
  <summary><b>Local file in a PhotoShop or InDesign plugin</b> (click to show)</summary>

`writeFile` wraps the `File` logic in Photoshop and other ExtendScript targets.
The specified path should be an absolute path:

```js
#include "xlsx.extendscript.js"

/* output format determined by filename */
XLSX.writeFile(workbook, "out.xlsx");
/* at this point, out.xlsx is a file that you can distribute */
```

The [`extendscript` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/extendscript/) includes a more complex example.

</details>

<details>
  <summary><b>Download a file in the browser to the user machine</b> (click to show)</summary>

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

</details>

<details>
  <summary><b>Download a file in legacy browsers</b> (click to show)</summary>

`XLSX.writeFile` techniques work for most modern browsers as well as older IE.
For much older browsers, there are workarounds implemented by wrapper libraries.

[`FileSaver.js`](https://github.com/eligrey/FileSaver.js/) implements `saveAs`.
Note: `XLSX.writeFile` will automatically call `saveAs` if available.

```js
/* bookType can be any supported output type */
var wopts = { bookType:"xlsx", bookSST:false, type:"array" };

var wbout = XLSX.write(workbook,wopts);

/* the saveAs call downloads a file on the local machine */
saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx");
```

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

The [`oldie` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/oldie/) shows an IE-compatible fallback scenario.

</details>

<details>
  <summary><b>Browser upload file (ajax)</b> (click to show)</summary>

A complete example using XHR is [included in the XHR demo](https://github.com/SheetJS/SheetJS/tree/master/demos/xhr/), along
with examples for fetch and wrapper libraries.  This example assumes the server
can handle Base64-encoded files (see the demo for a basic nodejs server):

```js
/* in this example, send a base64 string to the server */
var wopts = { bookType:"xlsx", bookSST:false, type:"base64" };

var wbout = XLSX.write(workbook,wopts);

var req = new XMLHttpRequest();
req.open("POST", "/upload", true);
var formdata = new FormData();
formdata.append("file", "test.xlsx"); // <-- server expects `file` to hold name
formdata.append("data", wbout); // <-- `data` holds the base64-encoded data
req.send(formdata);
```

</details>

<details>
  <summary><b>PhantomJS (Headless Webkit) File Generation</b> (click to show)</summary>

The [`headless` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/headless/) includes a complete demo to convert HTML
files to XLSB workbooks using [PhantomJS](https://phantomjs.org/). PhantomJS
`fs.write` supports writing files from the main process but has a different
interface from the NodeJS `fs` module:

```js
var XLSX = require('xlsx');
var fs = require('fs');

/* generate a binary string */
var bin = XLSX.write(workbook, { type:"binary", bookType: "xlsx" });
/* write to file */
fs.write("test.xlsx", bin, "wb");
```

Note: The section ["Processing HTML Tables"](./input#processing-html-tables) shows how
to generate a workbook from HTML tables in a page in "Headless WebKit".

</details>



The [included demos](https://github.com/SheetJS/SheetJS/tree/master/demos/) cover mobile apps and other special deployments.

### Writing Examples

- <http://sheetjs.com/demos/table.html> exporting an HTML table
- <http://sheetjs.com/demos/writexlsx.html> generates a simple file

### Streaming Write

The streaming write functions are available in the `XLSX.stream` object.  They
take the same arguments as the normal write functions but return a NodeJS
Readable Stream.

- `XLSX.stream.to_csv` is the streaming version of `XLSX.utils.sheet_to_csv`.
- `XLSX.stream.to_html` is the streaming version of `XLSX.utils.sheet_to_html`.
- `XLSX.stream.to_json` is the streaming version of `XLSX.utils.sheet_to_json`.

<details>
  <summary><b>nodejs convert to CSV and write file</b> (click to show)</summary>

```js
var output_file_name = "out.csv";
var stream = XLSX.stream.to_csv(worksheet);
stream.pipe(fs.createWriteStream(output_file_name));
```

</details>

<details>
  <summary><b>nodejs write JSON stream to screen</b> (click to show)</summary>

```js
/* to_json returns an object-mode stream */
var stream = XLSX.stream.to_json(worksheet, {raw:true});

/* the following stream converts JS objects to text via JSON.stringify */
var conv = new Transform({writableObjectMode:true});
conv._transform = function(obj, e, cb){ cb(null, JSON.stringify(obj) + "\n"); };

stream.pipe(conv); conv.pipe(process.stdout);
```

</details>

<details>
  <summary><b>Exporting NUMBERS files</b> (click to show)</summary>

The NUMBERS writer requires a fairly large base.  The supplementary `xlsx.zahl`
scripts provide support.  `xlsx.zahl.js` is designed for standalone and NodeJS
use, while `xlsx.zahl.mjs` is suitable for ESM.

_Browser_

```html
<meta charset="utf8">
<script src="xlsx.full.min.js"></script>
<script src="xlsx.zahl.js"></script>
<script>
var wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([
  ["SheetJS", "<3","விரிதாள்"],
  [72,,"Arbeitsblätter"],
  [,62,"数据"],
  [true,false,],
]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL, compression: true});
</script>
```

_Node_

```js
var XLSX = require("./xlsx.flow");
var XLSX_ZAHL = require("./dist/xlsx.zahl");
var wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([
  ["SheetJS", "<3","விரிதாள்"],
  [72,,"Arbeitsblätter"],
  [,62,"数据"],
  [true,false,],
]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL, compression: true});
```

_Deno_

```ts
import * as XLSX from './xlsx.mjs';
import XLSX_ZAHL from './dist/xlsx.zahl.mjs';

var wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([
  ["SheetJS", "<3","விரிதாள்"],
  [72,,"Arbeitsblätter"],
  [,62,"数据"],
  [true,false,],
]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "textports.numbers", {numbers: XLSX_ZAHL, compression: true});
```

</details>

<https://github.com/sheetjs/sheetaki> pipes write streams to nodejs response.

### Generating JSON and JS Data

JSON and JS data tend to represent single worksheets. The utility functions in
this section work with single worksheets.

The ["Common Spreadsheet Format"](../csf/general) section describes
the object structure in more detail.  `workbook.SheetNames` is an ordered list
of the worksheet names.  `workbook.Sheets` is an object whose keys are sheet
names and whose values are worksheet objects.

The "first worksheet" is stored at `workbook.Sheets[workbook.SheetNames[0]]`.

#### API

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

[`x-spreadsheet`](https://github.com/myliang/x-spreadsheet) is an interactive
data grid for previewing and modifying structured data in the web browser.  The
[`xspreadsheet` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/xspreadsheet) includes a sample script with the
`stox` function for converting from a workbook to x-spreadsheet data object.
<https://oss.sheetjs.com/sheetjs/x-spreadsheet> is a live demo.

<details>
  <summary><b>Previewing data in a React data grid</b> (click to show)</summary>

[`react-data-grid`](https://npm.im/react-data-grid) is a data grid tailored for
react.  It expects two properties: `rows` of data objects and `columns` which
describe the columns.  For the purposes of massaging the data to fit the react
data grid API it is easiest to start from an array of arrays.

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
    const wb = read(await (await fetch(url)).arrayBuffer(), { WTF: 1 });

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

</details>

<details>
  <summary><b>Previewing data in a VueJS data grid</b> (click to show)</summary>

[`vue3-table-lite`](https://github.com/linmasahiro/vue3-table-lite) is a simple
VueJS 3 data table.  It is featured [in the VueJS demo](https://github.com/SheetJS/SheetJS/tree/master/demos/vue/modify/).

</details>

<details>
  <summary><b>Populating a database (SQL or no-SQL)</b> (click to show)</summary>

The [`database` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/database/) includes examples of working with
databases and query results.

</details>

<details>
  <summary><b>Numerical Computations with TensorFlow.js</b> (click to show)</summary>

`@tensorflow/tfjs` and other libraries expect data in simple arrays, well-suited
for worksheets where each column is a data vector.  That is the transpose of how
most people use spreadsheets, where each row is a vector.

A single `Array#map` can pull individual named rows from `sheet_to_json` export:

```js
const XLSX = require("xlsx");
const tf = require('@tensorflow/tfjs');

const key = "age"; // this is the field we want to pull
const ages = XLSX.utils.sheet_to_json(worksheet).map(r => r[key]);
const tf_data = tf.tensor1d(ages);
```

All fields can be processed at once using a transpose of the 2D tensor generated
with the `sheet_to_json` export with `header: 1`. The first row, if it contains
header labels, should be removed with a slice:

```js
const XLSX = require("xlsx");
const tf = require('@tensorflow/tfjs');

/* array of arrays of the data starting on the second row */
const aoa = XLSX.utils.sheet_to_json(worksheet, {header: 1}).slice(1);
/* dataset in the "correct orientation" */
const tf_dataset = tf.tensor2d(aoa).transpose();
/* pull out each dataset with a slice */
const tf_field0 = tf_dataset.slice([0,0], [1,tensor.shape[1]]).flatten();
const tf_field1 = tf_dataset.slice([1,0], [1,tensor.shape[1]]).flatten();
```

The [`array` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/array/) shows a complete example.

</details>


### Generating HTML Tables

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

<details>
  <summary><b>Vanilla JS + HTML fetch workbook and generate table previews</b> (click to show)</summary>

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

</details>

<details>
  <summary><b>React fetch workbook and generate HTML table previews</b> (click to show)</summary>

It is generally recommended to use a React-friendly workflow, but it is possible
to generate HTML and use it in React with `dangerouslySetInnerHTML`:

```jsx
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

The [`react` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/react) includes more React examples.

</details>

<details>
  <summary><b>VueJS fetch workbook and generate HTML table previews</b> (click to show)</summary>

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

The [`vuejs` demo](https://github.com/SheetJS/SheetJS/tree/master/demos/vue) includes more React examples.

</details>

### Generating Single-Worksheet Snapshots

The `sheet_to_*` functions accept a worksheet object.

#### API

_Generate a CSV from a single worksheet_

```js
var csv = XLSX.utils.sheet_to_csv(worksheet, opts);
```

This snapshot is designed to replicate the "CSV UTF8 (`.csv`)" output type.
["Delimiter-Separated Output"](../api/utilities#delimiter-separated-output) describes the
function and the optional `opts` argument in more detail.

_Generate "Text" from a single worksheet_

```js
var txt = XLSX.utils.sheet_to_txt(worksheet, opts);
```

This snapshot is designed to replicate the "UTF16 Text (`.txt`)" output type.
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
