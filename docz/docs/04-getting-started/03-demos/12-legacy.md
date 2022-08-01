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

### AngularJS

[AngularJS](https://en.wikipedia.org/wiki/AngularJS) was a front-end MVC
framework that was abandoned by Google in 2022. It should not be confused with
"Angular" the modern framework.

The [Live demo](pathname:///angularjs/index.html) shows a simple table that is
updated with file data and exported to spreadsheets.

This demo uses AngularJS 1.5.0.

<details><summary><b>Full Exposition</b> (click to show)</summary>

**Array of Objects**

A common data table is often stored as an array of objects:

```js
$scope.data = [
  { Name: "Bill Clinton", Index: 42 },
  { Name: "GeorgeW Bush", Index: 43 },
  { Name: "Barack Obama", Index: 44 },
  { Name: "Donald Trump", Index: 45 }
];
```

This neatly maps to a table with `ng-repeat`:

```html
<table id="sjs-table">
  <tr><th>Name</th><th>Index</th></tr>
  <tr ng-repeat="row in data">
    <td>{{row.Name}}</td>
    <td>{{row.Index}}</td>
  </tr>
</table>
```

The `$http` service can request binary data using the `"arraybuffer"` response
type coupled with `XLSX.read` with type `"array"`:

```js
  $http({
    method:'GET',
    url:'https://sheetjs.com/pres.xlsx',
    responseType:'arraybuffer'
  }).then(function(data) {
    var wb = XLSX.read(data.data, {type:"array"});
    var d = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    $scope.data = d;
  }, function(err) { console.log(err); });
```

The HTML table can be directly exported with `XLSX.utils.table_to_book`:

```js
var wb = XLSX.utils.table_to_book(document.getElementById('sjs-table'));
XLSX.writeFile(wb, "export.xlsx");
```


**Import Directive**

A general import directive is fairly straightforward:

- Define the `importSheetJs` directive in the app:

```js
app.directive("importSheetJs", [SheetJSImportDirective]);
```

- Add the attribute `import-sheet-js=""` to the file input element:

```html
<input type="file" import-sheet-js="" multiple="false"  />
```

- Define the directive:

```js
function SheetJSImportDirective() {
  return {
    scope: { opts: '=' },
    link: function ($scope, $elm) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();

        reader.onload = function (e) {
          /* read workbook */
          var ab = e.target.result;
          var workbook = XLSX.read(ab);

          /* DO SOMETHING WITH workbook HERE */
        };

        reader.readAsArrayBuffer(changeEvent.target.files[0]);
      });
    }
  };
}
```


**Export Service**

An export can be triggered at any point!  Depending on how data is represented,
a workbook object can be built using the utility functions.  For example, using
an array of objects:

```js
/* starting from this data */
var data = [
  { name: "Barack Obama", pres: 44 },
  { name: "Donald Trump", pres: 45 }
];

/* generate a worksheet */
var ws = XLSX.utils.json_to_sheet(data);

/* add to workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Presidents");

/* write workbook and force a download */
XLSX.writeFile(wb, "sheetjs.xlsx");
```

</details>

### KnockoutJS

[KnockoutJS](https://en.wikipedia.org/wiki/Knockout_(web_framework)) was a
popular MVVM framework.

The [Live demo](pathname:///knockout/knockout.html) shows a view model that is
updated with file data and exported to spreadsheets.

<details><summary><b>Full Exposition</b> (click to show)</summary>

**State**

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

**Data Binding**

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

</details>