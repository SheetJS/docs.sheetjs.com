---
sidebar_position: 12
title: Legacy Frameworks
---

import current from '/version.js';

Over the years, many frameworks have been released. Some were popular years ago
but have waned in recent years. There are still many deployments using these
frameworks and it is oftentimes esasier to continue maintenance than to rewrite
using modern web techniques.

SheetJS libraries strive to maintain broad browser and JS engine compatibility.

## Integration

The ["Standalone Browser Scripts"](../../installation/standalone) section has
instructions for obtaining or referencing the standalone scripts.  These are
designed to be referenced with `<script>` tags.

## Frameworks

### KnockoutJS

[KnockoutJS](https://en.wikipedia.org/wiki/Knockout_(web_framework)) was a
popular MVVM framework.

The [Live demo](pathname:///knockout/knockout.html) shows a view model that is
updated with file data and exported to spreadsheets.


#### State

Arrays of arrays are the simplest data structure for representing worksheets.

```js
var aoa = [
  [1, 2], // A1 = 1, B1 = 2
  [3, 4]  // A1 = 3, B1 = 4
];
```

`ko.observableArray` should be used to create the view model:

```js
function ViewModel() {
  /* use an array of arrays */
  this.aoa = ko.observableArray([ [1,2], [3,4] ]);
}
/* create model */
var model = new ViewModel();
ko.applyBindings(model);
```

`XLSX.utils.sheet_to_json` with `header: 1` generates data for the model:

```js
/* starting from a `wb` workbook object, pull first worksheet */
var ws = wb.Sheets[wb.SheetNames[0]];
/* convert the worksheet to an array of arrays */
var aoa = XLSX.utils.sheet_to_json(ws, {header:1});
/* update model */
model.aoa(aoa);
```

`XLSX.utils.aoa_to_sheet` generates worksheets from the model:

```js
var aoa = model.aoa();
var ws = XLSX.utils.aoa_to_sheet(aoa);
```

#### Data Binding

`data-bind="foreach: ..."` provides a simple approach for binding to `TABLE`:

```html
<table data-bind="foreach: aoa">
  <tr data-bind="foreach: $data">
    <td><span data-bind="text: $data"></span></td>
  </tr>
</table>
```

Unfortunately the nested `"foreach: $data"` binding is read-only.  A two-way
binding is possible using the `$parent` and `$index` binding context properties:

```html
<table data-bind="foreach: aoa">
  <tr data-bind="foreach: $data">
    <td><input data-bind="value: $parent[$index()]" /></td>
  </tr>
</table>
```
