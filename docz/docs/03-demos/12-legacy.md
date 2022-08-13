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

The ["Standalone Browser Scripts"](../getting-started/installation/standalone) section has
instructions for obtaining or referencing the standalone scripts.  These are
designed to be referenced with `<script>` tags.

## Internet Explorer

:::warning

Internet Explorer is unmaintained and users should consider modern browsers.
The SheetJS testing grid still includes IE and should work.

:::

The modern upload and download strategies are not available in older versions of
IE, but there are approaches using older technologies like ActiveX and Flash.

<details><summary><b>Complete Example</b> (click to show)</summary>

This demo includes all of the support files for the Flash and ActiveX methods.

1) Download the standalone script and shim to a server that will host the demo:

<ul>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js`}>xlsx.full.min.js</a></li>
<li><a href={`https://cdn.sheetjs.com/xlsx-latest/package/dist/shim.min.js`}>shim.min.js</a></li>
</ul>

2) [Download the demo ZIP](pathname:///ie/SheetJSIESupport.zip) to the server.

The ZIP includes the demo HTML file as well as the Downloadify support files.

Extract the contents to the same folder as the scripts from step 1

3) Start a HTTP server:

```bash
npx -y http-server .
```

4) Access the `index.html` from a machine with Internet Explorer.

</details>

<details><summary><b>Other Live Demos</b> (click to show)</summary>

:::warning

The hosted solutions may not work in older versions of Windows.  For testing,
demo pages should be downloaded and hosted using a simple HTTP server.

:::

<http://oss.sheetjs.com/sheetjs/ajax.html> uses XMLHttpRequest to download test
files and convert to CSV.

<https://oss.sheetjs.com/sheetjs/> demonstrates reading files with `FileReader`.

Older versions of IE do not support HTML5 File API but do support Base64.

On OSX you can get the Base64 encoding with:

```bash
$ <target_file base64 | pbcopy
```

On Windows XP and up you can get the Base64 encoding using `certutil`:

```cmd
> certutil -encode target_file target_file.b64
```

(note: You have to open the file and remove the header and footer lines)

</details>

### Upload Strategies

IE10 and IE11 support the standard HTML5 FileReader API:

```js
function handle_fr(e) {
  var f = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var wb = XLSX.read(e.target.result);
    process_wb(wb); // DO SOMETHING WITH wb HERE
  };
  reader.readAsArrayBuffer(f);
}
input_dom_element.addEventListener('change', handle_fr, false);
```

`Blob#arrayBuffer` is not supported in IE!

**ActiveX-based Upload**

Through the `Scripting.FileSystemObject` object model, a script in the VBScript
scripting language can read from an arbitrary path on the filesystem.  The shim
includes a special `IE_LoadFile` function to read binary strings from file. This
should be called from a file input `onchange` event:

```js
var input_dom_element = document.getElementById("file");
function handle_ie() {
  /* get data from selected file */
  var path = input_dom_element.value;
  var bstr = IE_LoadFile(path);
  /* read workbook */
  var wb = XLSX.read(bstr, {type: 'binary'});
  /* DO SOMETHING WITH workbook HERE */
}
input_dom_element.attachEvent('onchange', handle_ie);
```

### Download Strategies

As part of the File API implementation, IE10 and IE11 provide the `msSaveBlob`
and `msSaveOrOpenBlob` functions to save blobs to the client computer.  This
approach is embedded in `XLSX.writeFile` and no additional shims are necessary.

**Flash-based Download**

It is possible to write to the file system using a SWF.  `Downloadify` library
implements one solution.  Since a genuine click is required, there is no way to
force a download.  The safest data type is Base64:

```js
// highlight-next-line
Downloadify.create(element_id, {
  /* Downloadify boilerplate */
  swf: 'downloadify.swf',
  downloadImage: 'download.png',
  width: 100, height: 30,
  transparent: false, append: false,

  // highlight-start
  /* Key parameters */
  filename: "test.xlsx",
  dataType: 'base64',
  data: function() { return XLSX.write(wb, { bookType: "xlsx", type: 'base64' }); }
  // highlight-end
// highlight-next-line
});
```

**ActiveX-based Download**

Through the `Scripting.FileSystemObject` object model, a script in the VBScript
scripting language can write to an arbitrary path on the filesystem.  The shim
includes a special `IE_SaveFile` function to write binary strings to file.  It
attempts to write to the Downloads folder or Documents folder or Desktop.

This approach can be triggered, but it requires the user to enable ActiveX.  It
is embedded as a strategy in `writeFile` and used only if the shim script is
included in the page and the relevant features are enabled on the target system.


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