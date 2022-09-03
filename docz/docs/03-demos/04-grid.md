---
title: Data Grids and Tables
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
it is easier to process an array of arrays.


### x-spreadsheet

With a familiar UI, [`x-spreadsheet`](https://myliang.github.io/x-spreadsheet/)
is an excellent choice for developers looking for a modern editor.

[Click here for a live integration demo.](pathname:///xspreadsheet/)

<details><summary><b>Full Exposition</b> (click to show)</summary>

**Obtaining the Library**

The `x-data-spreadsheet` NodeJS packages include a minified script that can be
directly inserted as a script tag.  The unpkg CDN also serves this script:

```html
<!-- x-spreadsheet stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/x-data-spreadsheet/dist/xspreadsheet.css"/>
<!-- x-spreadsheet library -->
<script src="https://unpkg.com/x-data-spreadsheet/dist/xspreadsheet.js"></script>
```

**Previewing and Editing Data**

The HTML document needs a container element:

```html
<div id="gridctr"></div>
```

Grid initialization is a one-liner:

```js
var grid = x_spreadsheet(document.getElementById("gridctr"));
```

`x-spreadsheet` handles the entire edit cycle. No intervention is necessary.

**SheetJS and x-spreadsheet**

The integration library can be downloaded from the SheetJS CDN:

[Development Use](https://cdn.sheetjs.com/xspreadsheet/xlsxspread.js)

[Production Use](https://cdn.sheetjs.com/xspreadsheet/xlsxspread.min.js)


When used in a browser tag, it exposes two functions: `xtos` and `stox`.

- `stox(worksheet)` returns a data structure suitable for `grid.loadData`
- `xtos(data)` accepts the result of `grid.getData` and generates a workbook

_Reading Data_

The following snippet fetches a spreadsheet and loads the grid:

```js
(async() => {
  const ab = await (await fetch("https://sheetjs.com/pres.numbers")).arrayBuffer();
  grid.loadData(stox(XLSX.read(ab)));
})();
```

The same pattern can be used in file input elements and other data sources.

_Writing Data_

The following snippet exports the grid data to a file:

```js
/* build workbook from the grid data */
XLSX.writeFile(xtos(grid.getData()), "SheetJS.xlsx");
```

**Additional Features**

This demo barely scratches the surface.  The underlying grid component includes
many additional features that work with [SheetJS Pro](https://sheetjs.com/pro).

</details>

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


### Tabulator

[Tabulator](http://tabulator.info/docs/5.3/download#xlsx) includes deep support
through a special Export button.  It handles the SheetJS operations internally.


### Angular UI Grid

:::warning

This UI Grid is for AngularJS, not the modern Angular.  New projects should not
use AngularJS.  This demo is included for legacy applications.

The [AngularJS demo](./legacy#angularjs) covers more general strategies.

:::

[Click here for a live integration demo.](pathname:///angularjs/ui-grid.html)

<details><summary><b>Notes</b> (click to show)</summary>

The library does not provide any way to modify the import button, so the demo
includes a simple directive for a File Input HTML element.  It also includes a
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
columns must be objects whose `key` property is the index converted to string:

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

:::caution

When the demo was last refreshed, row array objects were preserved.  This was
not the case in a later release.  The row arrays must be re-created.

The snippet defines a `arrayify` function that creates arrays if necessary.

:::

```ts
import { WorkSheet, utils } from 'xlsx';

type Row = any[];

// highlight-start
function arrayify(rows: any[]): Row[] {
  return rows.map(row => {
    var length = Object.keys(row).length;
    for(; length > 0; --length) if(row[length-1] != null) break;
    return Array.from({length, ...row});
  });
}
// highlight-end

function rdg_to_ws(rows: Row[]): WorkSheet {
  return utils.aoa_to_sheet(arrayify(rows));
}
```

```ts
import { WorkSheet, utils } from 'xlsx';

type Row = any[];

function rdg_to_ws(rows: Row[]): WorkSheet {
  return utils.aoa_to_sheet(rows);
}
```

<!-- spellchecker-disable -->

#### RDG Demo

<!-- spellchecker-enable -->

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Create a new TypeScript `create-react-app` app:

```bash
npx create-react-app sheetjs-cra --template typescript
cd sheetjs-cra
```

2) Install dependencies:

```bash
npm i -S https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz react-data-grid
```

3) Download [`App.tsx`](pathname:///rdg/App.tsx) and replace `src/App.tsx`.

4) run `npm start`.  When you load the page in the browser, it will attempt to
   fetch <https://sheetjs.com/pres.numbers> and load the data.

The following screenshot was taken from the demo:

![react-data-grid screenshot](pathname:///rdg/rdg1.png)

</details>

### Material UI Data Grid

Material UI Data Grid and React Data Grid share many state patterns and idioms.
Differences from ["React Data Grid"](#react-data-grid) will be highlighted.

[A complete example is included below.](#muidg-demo)

:::warning

Despite presenting an editable UI, Material UI Data Grid version `5.17.0` does
not update the state when values are changed. The demo uses the React Data Grid
editable structure in the hopes that a future version does support state.

Until the issues are resolved, "React Data Grid" is an excellent choice.

:::

**Rows and Columns State**

The analogue of `Column` is `GridColDef`.  The simple structure looks like:

```js
// highlight-next-line
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function App() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  return ( <DataGrid columns={columns} rows={rows} onRowsChange={setRows} /> );
}
```

The most generic data representation is an array of arrays. To sate the grid,
columns must be objects whose `field` property is the index converted to string:

```ts
import { WorkSheet, utils } from 'xlsx';
// highlight-next-line
import { GridColDef } from "@mui/x-data-grid";

type Row = any[];
type RowCol = { rows: Row[]; columns: GridColDef[]; };

function ws_to_muidg(ws: WorkSheet): RowCol {
  /* create an array of arrays */
  const rows = utils.sheet_to_json(ws, { header: 1 });

  /* create column array */
  const range = utils.decode_range(ws["!ref"]||"A1");
  const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
    // highlight-start
    field: String(i), // MUIDG will access row["0"], row["1"], etc
    headerName: utils.encode_col(i), // the column labels will be A, B, etc
    editable: true // enable cell editing
    // highlight-end
  }));

  return { rows, columns }; // these can be fed to setRows / setColumns
}
```

In the other direction, a worksheet can be generated with `aoa_to_sheet`:

:::caution

`x-data-grid` does not properly preserve row array objects, so the row arrays
must be re-created.  The snippet defines a `arrayify` function.

:::

```ts
import { WorkSheet, utils } from 'xlsx';

type Row = any[];

// highlight-start
function arrayify(rows: any[]): Row[] {
  return rows.map(row => {
    var length = Object.keys(row).length;
    for(; length > 0; --length) if(row[length-1] != null) break;
    return Array.from({length, ...row});
  });
}
// highlight-end

function muidg_to_ws(rows: Row[]): WorkSheet {
  return utils.aoa_to_sheet(arrayify(rows));
}
```

<!-- spellchecker-disable -->

#### MUIDG Demo

<!-- spellchecker-enable -->

<details><summary><b>Complete Example</b> (click to show)</summary>

0) [Follow the React Data Grid demo](#rdg-demo) and generate the sample app.

1) Install dependencies:

```bash
npm i -S https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz @mui/x-data-grid @emotion/react @emotion/styled
```

2) Download [`App.tsx`](pathname:///muidg/App.tsx) and replace `src/App.tsx`.

3) run `npm start`.  When you load the page in the browser, it will attempt to
   fetch <https://sheetjs.com/pres.numbers> and load the data.

</details>

<!-- spellchecker-disable -->

### vue3-table-lite

<!-- spellchecker-enable -->

:::note

This demo was tested against `vue3-table-lite 1.2.4`, VueJS `3.2.37`, ViteJS
3.0.7, and `@vitejs/plugin-vue` 3.0.3 on 2022 August 18

:::

[`vue3-table-lite`](https://vue3-lite-table.vercel.app/) is a VueJS data grid.

[A complete example is included below.](#vuejs-demo)

#### Rows and Columns Bindings

`vue3-table-lite` presents two attribute bindings: an array of column metadata
(`columns`) and an array of objects representing the displayed data (`rows`).
Typically both are `ref` objects:


```html
<script setup lang="ts">
import { ref } from "vue";
import VueTableLite from "vue3-table-lite/ts";

/* rows */
type Row = any[];
const rows = ref<Row[]>([]);

/* columns */
type Column = { field: string; label: string; };
const columns = ref<Column[]>([]);
</script>

<template>
  <vue-table-lite :columns="columns" :rows="rows"></vue-table-lite>
</template>
```

These can be mutated through the `value` property in VueJS lifecycle methods:

```ts
import { onMounted } from "vue";
onMounted(() => {
  columns.value = [ { field: "name", label: "Names" }];
  rows.value = [ { name: "SheetJS" }, { name: "VueJS" } ];
})
```

The most generic data representation is an array of arrays. To sate the grid,
columns must be objects whose `field` property is the index converted to string:

```js
import { ref } from "vue";
import { utils } from 'xlsx';

/* generate row and column data */
function ws_to_vte(ws) {
  /* create an array of arrays */
  const rows = utils.sheet_to_json(ws, { header: 1 });

  /* create column array */
  const range = utils.decode_range(ws["!ref"]||"A1");
  const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
    field: String(i), // VTE will access row["0"], row["1"], etc
    label: utils.encode_col(i), // the column labels will be A, B, etc
  }));

  return { rows, columns };
}

const rows = ref([]);
const columns = ref([]);

/* update refs */
function update_refs(ws) {
  const data = ws_to_vte(ws);
  rows.value = data.rows;
  columns.value = data.columns;
}
```

In the other direction, a worksheet can be generated with `aoa_to_sheet`:

```js
import { utils } from 'xlsx';

const rows = ref([]);

function vte_to_ws(rows) {
  return utils.aoa_to_sheet(rows.value);
}
```

#### VueJS Demo

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Create a new ViteJS App using the VueJS + TypeScript template:

```bash
npm create vite@latest sheetjs-vue -- --template vue-ts
cd sheetjs-vue
```

2) Install dependencies:

```bash
npm i
npm i -S https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz vue3-table-lite
```

3) Download [`src/App.vue`](pathname:///vtl/App.vue) and replace the contents:

```bash
cd src
rm -f App.vue
curl -LO https://docs.sheetjs.com/vtl/App.vue
cd ..
```

4) run `npm run dev`.  When you load the page in the browser, it will try to
   fetch <https://sheetjs.com/pres.numbers> and load the data.

</details>

## Standard HTML Tables

Many UI components present styled HTML tables.  Data can be extracted from the
tables given a reference to the underlying TABLE element:

```js
function export_html_table(table) {
  const wb = XLSX.utils.table_to_book(table);
  XLSX.writeFile(wb, "HTMLTable.xlsx");
} // yes, it's that easy!
```

:::info

SheetJS CE is focused on data preservation and will extract values from tables.

[SheetJS Pro](https://sheetjs.com/pro) offers styling support when reading from
TABLE elements and when writing to XLSX and other spreadsheet formats.

:::

### Fixed Tables

When the page has a raw HTML table, the easiest solution is to attach an `id`:

```html
<table id="xport"><tr><td>SheetJS</td></tr></table>
<script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js"></script>
<script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
<script>
/* as long as this script appears after the table, it will be visible */
var tbl = document.getElementById("xport");
const wb = XLSX.utils.table_to_book(tbl);
XLSX.writeFile(wb, "HTMLTable.xlsx");
</script>
```

When programmatically constructing the table in the browser, retain a reference:

```js
var tbl = document.createElement("TABLE");
tbl.insertRow(0).insertCell(0).innerHTML = "SheetJS";
document.body.appendChild(tbl);
const wb = XLSX.utils.table_to_book(tbl);
XLSX.writeFile(wb, "HTMLFlicker.xlsx");
document.body.removeChild(tbl);
```

### React

The typical solution is to attach a Ref to the table element.  The `current`
property will be a live reference which plays nice with `table_to_book`:

```jsx
// highlight-next-line
import { useRef } from "react";

export default function ReactTable() {
// highlight-next-line
  const tbl = useRef(null);

  return ( <>
    <button onClick={() => {
      // highlight-next-line
      const wb = XLSX.utils.table_to_book(tbl.current);
      XLSX.writeFile(wb, "ReactTable.xlsx");
    }}>Export</button>
    // highlight-next-line
    <table ref={tbl}>
    {/* ... TR and TD/TH elements ... */}
    </table>
  </>);
}
```

### Material UI Table

The `Table` component abstracts the `<table>` element in HTML.

```tsx
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
// ...
// highlight-next-line
import { useRef } from "react";

// ...
export default function BasicTable() {
// highlight-next-line
  const tbl = useRef<HTMLTableElement>(null);
  return (<>
    <button onClick={() => {
      const wb = utils.table_to_book(tbl.current);
      writeFileXLSX(wb, "SheetJSMaterialUI.xlsx");
    }}>Export</button>
    <TableContainer {...}>
// highlight-next-line
      <Table {...} ref={tbl}>
      {/* ... material ui table machinations ... */}
      </Table>
    </TableContainer>
  <>);
}
```

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Create a new TypeScript `create-react-app` app:

```bash
npx create-react-app sheetjs-mui --template typescript
cd sheetjs-mui
```

2) Install dependencies:

```bash
npm i -S https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz @mui/material
```

3) Replace `src/App.tsx` with the following code. This is based on the official
Material UI Table example.  Differences are highlighted.

```tsx title="src/App.tsx"
// highlight-start
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { utils, writeFileXLSX } from 'xlsx';
// highlight-end
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  // highlight-start
  const tbl = useRef<HTMLTableElement>(null);
  return ( <>
    <button onClick={() => {
      const wb = utils.table_to_book(tbl.current);
      writeFileXLSX(wb, "SheetJSMaterialUI.xlsx");
    }}>Export</button>
    // highlight-end
    <TableContainer component={Paper}>
      // highlight-next-line
      <Table sx={{ minWidth: 650 }} aria-label="simple table" ref={tbl}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // highlight-next-line
  </> );
}
```

4) run `npm start`.  Click the "Export" button and inspect the generated file.

</details>
