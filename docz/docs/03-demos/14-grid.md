---
sidebar_position: 14
title: Data Grids and UI
---

Various JavaScript UI components provide a more interactive editing experience.
Most are able to interchange with arrays of arrays or arrays of data objects.
This demo focuses on a few open source data grids.

:::note

[SheetJS Pro](https://sheetjs.com/pro) offers additional features like styling
and images. The UI tools typically support many of these advanced features.

To eliminate any confusion, the live examples linked from this page demonstrate
SheetJS Community Edition data interchange.

:::

## Managed Lifecycle

Many UI components tend to manage the entire lifecycle, providing methods to
import and export data.

The `sheet_to_json` utility function generates arrays of objects, which is
suitable for a number of libraries.  When more advanced shapes are needed,
it is easier to munge the output of an array of arrays.


### Canvas DataGrid

After extensive testing, [`canvas-datagrid`](https://canvas-datagrid.js.org/demo.html)
stood out as a very high-performance grid with an incredibly simple API.

[Click here for a live integration demo.](pathname:///cdg/index.html)

<details><summary><b>Full Exposition</b> (click to show)</summary>

**Obtaining the Library**

The `canvas-datagrid` NodeJS packages include a minified script that can be
directly inserted as a script tag.  The unpkg CDN also serves this script:

```html
<script src="https://unpkg.com/canvas-datagrid/dist/canvas-datagrid.js"></script>
```

**Previewing Data**

The HTML document needs a container element:

```html
<div id="gridctr"></div>
```

Grid initialization is a one-liner:

```js
var grid = canvasDatagrid({
  parentNode: document.getElementById('gridctr'),
  data: []
});
```

For large data sets, it's necessary to constrain the size of the grid.

```js
grid.style.height = '100%';
grid.style.width = '100%';
```

Once the workbook is read and the worksheet is selected, assigning the data
variable automatically updates the view:

```js
grid.data = XLSX.utils.sheet_to_json(ws, {header:1});
```

This demo previews the first worksheet.

**Editing**

`canvas-datagrid` handles the entire edit cycle.  No intervention is necessary.

**Saving Data**

`grid.data` is immediately readable and can be converted back to a worksheet.
Some versions return an array-like object without the length, so a little bit of
preparation may be needed:

```js
/* converts an array of array-like objects into an array of arrays */
function prep(arr) {
  var out = [];
  for(var i = 0; i < arr.length; ++i) {
    if(!arr[i]) continue;
    if(Array.isArray(arr[i])) { out[i] = arr[i]; continue };
    var o = new Array();
    Object.keys(arr[i]).forEach(function(k) { o[+k] = arr[i][k] });
    out[i] = o;
  }
  return out;
}

/* build worksheet from the grid data */
var ws = XLSX.utils.aoa_to_sheet(prep(grid.data));

/* build up workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');

/* generate download */
XLSX.writeFile(wb, "SheetJS.xlsx");
```

**Additional Features**

This demo barely scratches the surface.  The underlying grid component includes
many additional features including massive data streaming, sorting and styling.

</details>


### Angular UI Grid

:::warning

This UI Grid is for AngularJS, not the modern Angular.  New projects should not
use AngularJS.  This demo is included for legacy applications.

The [AngularJS demo](./legacy#angularjs) covers more general strategies.

:::

[Click here for a live integration demo.](pathname:///angularjs/ui-grid.html)

<details><summary><b>Notes</b> (click to show)</summary>

The library does not provide any way to modify the import button, so the demo
includes a simple directive for a HTML File Input control.  It also includes a
sample service for export which adds an item to the export menu.

The demo `SheetJSImportDirective` follows the prescription from the README for
File input controls using `readAsArrayBuffer`, converting to a suitable
representation and updating the scope.

`SheetJSExportService` exposes export functions for `XLSB` and `XLSX`.  Other
file formats can be exported by changing the `bookType` variable.  It grabs
values from the grid, builds an array of arrays, generates a workbook and forces
a download.  By setting the `filename` and `sheetname` options in the `ui-grid`
options, the output can be controlled.

</details>

## Framework Lifecycle

For modern frameworks like React, data grids tend to follow the framework state
and idioms.  The same `sheet_to_json` and `json_to_sheet` / `aoa_to_sheet`
methods are used, but they pull from a shared state object that can be mutated
with other buttons and components on the page.

### React Data Grid

:::note

This demo was tested against `react-data-grid 7.0.0-beta.15`, React 18.2.0,
and `create-react-app` 5.0.1 on 2022 August 16.

:::

[`react-data-grid`](https://github.com/adazzle/react-data-grid) is a data grid
built for React. `react-data-grid` powers <https://sheet.js.org/>

[A complete example is included below.](#rdg-demo)

#### Rows and Columns state

`react-data-grid` state consists of an Array of column metadata and an Array of
row objects. Typically both are defined in state:

```jsx
import DataGrid, { Column } from "react-data-grid";

export default function App() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  return ( <DataGrid columns={columns} rows={rows} onRowsChange={setRows} /> );
}
```

The most generic data representation is an array of arrays. To sate the grid,
the columns must be objects whose `key` property is the stringified number:

```ts
import { WorkSheet, utils } from 'xlsx';
import { textEditor, Column } from "react-data-grid";

type Row = any[];
type AOAColumn = Column<Row>;
type RowCol = { rows: Row[]; columns: AOAColumn[]; };

function ws_to_rdg(ws: WorkSheet): RowCol {
  /* create an array of arrays */
  const rows = utils.sheet_to_json(ws, { header: 1 });

  /* create column array */
  const range = utils.decode_range(ws["!ref"]||"A1");
  const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
    key: String(i), // RDG will access row["0"], row["1"], etc
    name: utils.encode_col(i), // the column labels will be A, B, etc
    editor: textEditor // enable cell editing
  }));

  return { rows, columns }; // these can be fed to setRows / setColumns
}
```

In the other direction, a worksheet can be generated with `aoa_to_sheet`:

```ts
import { WorkSheet, utils } from 'xlsx';

type Row = any[];

function ws_to_rdg(rows: Row[]): WorkSheet {
  return utils.aoa_to_sheet(rows);
}
```

#### RDG Demo

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Create a new TypeScript CRA app:

```bash
npx create-react-app sheetjs-cra --template typescript
cd sheetjs-cra
```

2) Install dependencies:

```bash
npm i -S https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz react-data-grid
```

3) Replace the contents of `src/App.tsx` with the following code.  Note: a copy
to clipboard button will show up if you move your mouse over the code.  The
notable SheetJS-specific code is highlighted below:

```tsx title="src/App.tsx"
import React, { useEffect, useState, ChangeEvent } from "react";
import DataGrid, { textEditor, Column } from "react-data-grid";
import { read, utils, WorkSheet, writeFile } from "xlsx";

import './App.css';

type DataSet = { [index: string]: WorkSheet; };
type Row = any[];
type AOAColumn = Column<Row>;
type RowCol = { rows: Row[]; columns: AOAColumn[]; };

/* this method returns `rows` and `columns` data for sheet change */
const getRowsCols = ( data: DataSet, sheetName: string ): RowCol => ({
  rows: utils.sheet_to_json<Row>(data[sheetName], {header:1}),
  columns: Array.from({
    length: utils.decode_range(data[sheetName]["!ref"]||"A1").e.c + 1
  }, (_, i) => ({ key: String(i), name: utils.encode_col(i), editor: textEditor }))
});

export default function App() {
  const [rows, setRows] = useState<Row[]>([]); // data rows
  const [columns, setColumns] = useState<AOAColumn[]>([]); // columns
  const [workBook, setWorkBook] = useState<DataSet>({} as DataSet); // workbook
  const [sheets, setSheets] = useState<string[]>([]); // list of sheet names
  const [current, setCurrent] = useState<string>(""); // selected sheet

  /* called when sheet dropdown is changed */
  function selectSheet(name: string) {
    // highlight-start
    /* update workbook cache in case the current worksheet was changed */
    workBook[current] = utils.aoa_to_sheet(rows);
    // highlight-end

    /* get data for desired sheet and update state */
    const { rows: new_rows, columns: new_columns } = getRowsCols(workBook, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  /* this method handles refreshing the state with new workbook data */
  async function handleAB(file: ArrayBuffer): Promise<void> {
    // highlight-start
    /* read file data */
    const data = read(file);
    // highlight-end

    /* update workbook state */
    setWorkBook(data.Sheets);
    setSheets(data.SheetNames);

    /* select the first worksheet */
    const name = data.SheetNames[0];
    const { rows: new_rows, columns: new_columns } = getRowsCols(data.Sheets, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  /* called when file input element is used to select a new file */
  async function handleFile(ev: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = await ev.target.files?.[0]?.arrayBuffer();
    if(file) await handleAB(file);
  }

  /* when page is loaded, fetch and processs worksheet */
  useEffect(() => { (async () => {
      const f = await fetch("https://sheetjs.com/pres.numbers");
      await handleAB(await f.arrayBuffer());
  })(); }, []);

  /* method is called when one of the save buttons is clicked */
  function saveFile(ext: string): void {
    /* update current worksheet in case changes were made */
    workBook[current] = utils.aoa_to_sheet(rows);

    // highlight-start
    /* construct workbook and loop through worksheets */
    const wb = utils.book_new();
    sheets.forEach((n) => { utils.book_append_sheet(wb, workBook[n], n); });
    // highlight-end

    /* generate a file and download it */
    writeFile(wb, "sheet." + ext);
  }

  return (
    <>
      <h3>SheetJS × React-Data-Grid Demo</h3>
      <input type="file" onChange={handleFile} />
      {sheets.length > 0 && ( <>
        <p>Use the dropdown to switch to a worksheet:&nbsp;
          <select onChange={async (e) => selectSheet(sheets[+(e.target.value)])}>
            {sheets.map((sheet, idx) => (<option key={sheet} value={idx}>{sheet}</option>))}
          </select>
        </p>
        <div className="flex-cont"><b>Current Sheet: {current}</b></div>
        <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
        <p>Click one of the buttons to create a new file with the modified data</p>
        <div className="flex-cont">{["xlsx", "xlsb", "xls"].map((ext) => (
          <button key={ext} onClick={() => saveFile(ext)}>export [.{ext}]</button>
        ))}</div>
      </>)}
    </>
  );
}
```

4) run `npm start`.  When you load the dev page in the browser, it will attempt
to fetch <https://sheetjs.com/pres.numbers> and load the data.

</details>

The following screenshot was taken from the demo:

![react-data-grid screenshot](pathname:///react/rdg1.png)
