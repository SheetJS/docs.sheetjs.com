---
sidebar_position: 7
hide_table_of_contents: true
title: Writing Files
---

import current from '/version.js';

# Writing Options

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`XLSX.write(wb, write_opts)` attempts to write the workbook `wb`

`XLSX.writeFile(wb, filename, write_opts)` attempts to write `wb` to `filename`.
In browser-based environments, it will attempt to force a client-side download.

`XLSX.writeFileAsync(filename, wb, o, cb)` attempts to write `wb` to `filename`.
If `o` is omitted, the writer will use the third argument as the callback.

The write functions accept an options argument:

| Option Name |  Default | Description                                         |
| :---------- | -------: | :-------------------------------------------------- |
|`type`       |          | Output data encoding (see Output Type below)        |
|`cellDates`  |  `false` | Store dates as type `d` (default is `n`)            |
|`bookSST`    |  `false` | Generate Shared String Table **                     |
|`bookType`   | `"xlsx"` | Type of Workbook (see below for supported formats)  |
|`sheet`      |     `""` | Name of Worksheet for single-sheet formats **       |
|`compression`|  `false` | Use ZIP compression for ZIP-based formats **        |
|`Props`      |          | Override workbook properties when writing **        |
|`themeXLSX`  |          | Override theme XML when writing XLSX/XLSB/XLSM **   |
|`ignoreEC`   |   `true` | Suppress "number as text" errors **                 |
|`numbers`    |          | Payload for NUMBERS export **                       |

- `bookSST` is slower and more memory intensive, but has better compatibility
  with older versions of iOS Numbers
- The raw data is the only thing guaranteed to be saved.  Features not described
  in this README may not be serialized.
- `cellDates` only applies to XLSX output and is not guaranteed to work with
  third-party readers.  Excel itself does not usually write cells with type `d`
  so non-Excel tools may ignore the data or error in the presence of dates.
- `Props` is an object mirroring the workbook `Props` field.  See the table from
  the [Workbook File Properties](../csf/book#file-properties) section.
- if specified, the string from `themeXLSX` will be saved as the primary theme
  for XLSX/XLSB/XLSM files (to `xl/theme/theme1.xml` in the ZIP)
- Due to a bug in the program, some features like "Text to Columns" will crash
  Excel on worksheets where error conditions are ignored.  The writer will mark
  files to ignore the error by default.  Set `ignoreEC` to `false` to suppress.

<details open>
  <summary><b>Exporting NUMBERS files</b> (click to show)</summary>

The NUMBERS writer requires a fairly large base.  The supplementary `xlsx.zahl`
scripts provide support.  `xlsx.zahl.js` is designed for standalone and NodeJS
use, while `xlsx.zahl.mjs` is suitable for ESM.

Adding NUMBERS export support involves two steps:

1) Load the `xlsx.zahl` script

2) Pass the payload into the `numbers` option to `write` or `writeFile`.

<Tabs>
  <TabItem value="browser" label="Browser">

<div><a href={`https://cdn.sheetjs.com/xlsx-${current}/package/dist/xlsx.zahl.js`}>https://cdn.sheetjs.com/xlsx-{current}/package/dist/xlsx.zahl.js</a> is the URL for {current}</div>

<pre><code parentName="pre" {...{"className": "language-html"}}>{`\
<meta charset="utf8">\n\
<body>\n\
<script src="https://cdn.sheetjs.com/xlsx-${current}/package/dist/xlsx.full.min.js"></script>\n\
<script src="https://cdn.sheetjs.com/xlsx-${current}/package/dist/xlsx.zahl.js"></script>\n\
<script>\n\
var wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([\n\
  ["SheetJS", "<3","விரிதாள்"],\n\
  [72,,"Arbeitsblätter"],\n\
  [,62,"数据"],\n\
  [true,false,],\n\
]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");\n\
XLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL_PAYLOAD, compression: true});\n\
</script>\n\
</body>`}</code></pre>

  </TabItem>
  <TabItem value="nodejs" label="NodeJS">

After installing the package:

<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm install --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>

The scripts will be available at `xlsx/dist/xlsx.zahl` (CommonJS) and
`xlsx/dist/xlsx.zahl.mjs` (ESM).

```js
var XLSX = require("xlsx");
var XLSX_ZAHL_PAYLOAD = require("xlsx/dist/xlsx.zahl");
var wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([
  ["SheetJS", "<3","விரிதாள்"],
  [72,,"Arbeitsblätter"],
  [,62,"数据"],
  [true,false,],
]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL_PAYLOAD, compression: true});
```

  </TabItem>
  <TabItem value="bun" label="Bun">

After installing the package:

<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm install --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>

The scripts will be available at `xlsx/dist/xlsx.zahl` (CommonJS) and
`xlsx/dist/xlsx.zahl.mjs` (ESM).

```js
import * as XLSX from "xlsx";
import XLSX_ZAHL_PAYLOAD from "xlsx/dist/xlsx.zahl";
var wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([
  ["SheetJS", "<3","விரிதாள்"],
  [72,,"Arbeitsblätter"],
  [,62,"数据"],
  [true,false,],
]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL_PAYLOAD, compression: true});
```

  </TabItem>
  <TabItem value="deno" label="Deno">

<div><a href={`https://cdn.sheetjs.com/xlsx-${current}/package/dist/xlsx.zahl.mjs`}>https://cdn.sheetjs.com/xlsx-{current}/package/dist/xlsx.zahl.mjs</a> is the URL for {current}</div>

<pre><code parentName="pre" {...{"className": "language-ts"}}>{`\
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-${current}/package/xlsx.mjs';\n\
import XLSX_ZAHL_PAYLOAD from 'https://cdn.sheetjs.com/xlsx-${current}/package/dist/xlsx.zahl.mjs';\n\

var wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([\n\
  ["SheetJS", "<3","விரிதாள்"],\n\
  [72,,"Arbeitsblätter"],\n\
  [,62,"数据"],\n\
  [true,false,],\n\
]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");\n\
XLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL_PAYLOAD, compression: true});\n\
`}</code></pre>

  </TabItem>
</Tabs>


</details>

## Supported Output Formats

For broad compatibility with third-party tools, this library supports many
output formats.  The specific file type is controlled with `bookType` option:

| `bookType` | file ext | container | sheets | Description                     |
| :--------- | -------: | :-------: | :----- |:------------------------------- |
| `xlsx`     | `.xlsx`  |    ZIP    | multi  | Excel 2007+ XML Format          |
| `xlsm`     | `.xlsm`  |    ZIP    | multi  | Excel 2007+ Macro XML Format    |
| `xlsb`     | `.xlsb`  |    ZIP    | multi  | Excel 2007+ Binary Format       |
| `biff8`    | `.xls`   |    CFB    | multi  | Excel 97-2004 Workbook Format   |
| `biff5`    | `.xls`   |    CFB    | multi  | Excel 5.0/95 Workbook Format    |
| `biff4`    | `.xls`   |   none    | single | Excel 4.0 Worksheet Format      |
| `biff3`    | `.xls`   |   none    | single | Excel 3.0 Worksheet Format      |
| `biff2`    | `.xls`   |   none    | single | Excel 2.0 Worksheet Format      |
| `xlml`     | `.xls`   |   none    | multi  | Excel 2003-2004 (SpreadsheetML) |
| `numbers`  |`.numbers`|    ZIP    | single | Numbers 3.0+ Spreadsheet        |
| `ods`      | `.ods`   |    ZIP    | multi  | OpenDocument Spreadsheet        |
| `fods`     | `.fods`  |   none    | multi  | Flat OpenDocument Spreadsheet   |
| `wk3`      | `.wk3`   |   none    | multi  | Lotus Workbook (WK3)            |
| `csv`      | `.csv`   |   none    | single | Comma Separated Values          |
| `txt`      | `.txt`   |   none    | single | UTF-16 Unicode Text (TXT)       |
| `sylk`     | `.sylk`  |   none    | single | Symbolic Link (SYLK)            |
| `html`     | `.html`  |   none    | single | HTML Document                   |
| `dif`      | `.dif`   |   none    | single | Data Interchange Format (DIF)   |
| `dbf`      | `.dbf`   |   none    | single | dBASE II + VFP Extensions (DBF) |
| `wk1`      | `.wk1`   |   none    | single | Lotus Worksheet (WK1)           |
| `rtf`      | `.rtf`   |   none    | single | Rich Text Format (RTF)          |
| `prn`      | `.prn`   |   none    | single | Lotus Formatted Text            |
| `eth`      | `.eth`   |   none    | single | Ethercalc Record Format (ETH)   |

- `compression` only applies to formats with ZIP containers.
- Formats that only support a single sheet require a `sheet` option specifying
  the worksheet.  If the string is empty, the first worksheet is used.
- `writeFile` will automatically guess the output file format based on the file
  extension if `bookType` is not specified.  It will choose the first format in
  the aforementioned table that matches the extension.

## Output Type

The `type` argument for `write` mirrors the `type` argument for `read`:

| `type`     | output                                                          |
|------------|-----------------------------------------------------------------|
| `"base64"` | string: Base64 encoding of the file                             |
| `"binary"` | string: binary string (byte `n` is `data.charCodeAt(n)`)        |
| `"string"` | string: JS string (characters interpreted as UTF8)              |
| `"buffer"` | nodejs Buffer                                                   |
| `"array"`  | ArrayBuffer, fallback array of 8-bit unsigned int               |
| `"file"`   | string: path of file that will be created (nodejs only)         |

- For compatibility with Excel, `csv` output will always include the UTF-8 byte
  order mark.

