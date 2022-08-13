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
