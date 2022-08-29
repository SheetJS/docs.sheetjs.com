---
sidebar_position: 2
title: Troubleshooting
hide_table_of_contents: true
---

Here are some common errors and their resolutions.  This is not comprehensive.
The [issue tracker](https://github.com/SheetJS/sheetjs/issues) has a wealth of
information and user-contributed examples.

If issues are not covered in the docs or the issue tracker, or if a solution is
not discussed in the documentation, we would appreciate a bug report.

:::info Special Thanks

Special thanks to the early adopters and users for discovering and sharing many
workarounds and solutions!

:::


## Errors

#### SCRIPT5022: DataCloneError

IE10 does not properly support `Transferable`.

#### Object doesn't support property or method 'slice'

IE does not implement `Uint8Array#slice`. An implementation is included in the
shim script.  Check [the "Standalone" Installation note](../getting-started/installation/standalone#internet-explorer-and-older-browsers)

#### TypeError: f.substr is not a function

Some Google systems use the `base64url` encoding. `base64url` and `base64` are
different encodings.  A simple regular expression can translate the data:

```js
var wb = XLSX.read(b64.replace(/_/g, "/").replace(/-/g, "+"), {type:'base64'});
```

#### Error: Cannot read property '0' of undefined

`FileReader#readAsText` will corrupt binary data including XLSX, XLSB, XLS, and
other binary spreadsheet files.

Applications should use `FileReader#readAsArrayBuffer` or `Blob#arrayBuffer`.
Examples are included [in "User Submissions"](../06-solutions/01-input.md#example-user-submissions)

Applications specifically targeting legacy browsers like IE10 should use
`FileReader#readAsBinaryString` to read the data and call `XLSX.read` using the
`binary` type.

#### `Unsupported file undefined` when reading ArrayBuffer objects

Old versions of the library did not automatically detect `ArrayBuffer` objects.

<details><summary><b>Workaround</b> (click to show)</summary>

:::warning Legacy workaround

This solution is not recommended for production deployments.  Native support
for `ArrayBuffer` was added in library version `0.9.9`.

:::

After reading data with `FileReader#readAsArrayBuffer`, manually translate to
binary string and call `XLSX.read` with type `"binary"`

```js
document.getElementById('file-object').addEventListener("change", function(e) {
  var files = e.target.files,file;
  if (!files || files.length == 0) return;
  file = files[0];
  var fileReader = new FileReader();
  fileReader.onload = function (e) {
    var filename = file.name;
    // pre-process data
    var binary = "";
    var bytes = new Uint8Array(e.target.result);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    // call 'xlsx' to read the file
    var oFile = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true});
  };
  fileReader.readAsArrayBuffer(file);
});
```

</details>


## Data Issues

#### CSV and XLS files with Chinese or Japanese characters look garbled

The ESM build, used in tools like Webpack and in Deno, does not include the
codepage tables by default.  The ["Frameworks and Bundlers"](../02-getting-started/01-installation/02-frameworks.md#encoding-support)
section explains how to load support.

#### Worksheet only includes one row of data

Some third-party writer tools will not update the dimensions records in XLSX or
XLS or XLSB exports.  SheetJS utility functions will skip values not in range.

The following helper function will recalculate the range:

```js
function update_sheet_range(ws) {
  var range = {s:{r:Infinity, c:Infinity},e:{r:0,c:0}};
  Object.keys(ws).filter(function(x) { return x.charAt(0) != "!"; }).map(XLSX.utils.decode_cell).forEach(function(x) {
    range.s.c = Math.min(range.s.c, x.c); range.s.r = Math.min(range.s.r, x.r);
    range.e.c = Math.max(range.e.c, x.c); range.e.r = Math.max(range.e.r, x.r);
  });
  ws['!ref'] = XLSX.utils.encode_range(range);
}
```

<details><summary><b>More Code Snippets</b> (click to show) </summary>


`set_sheet_range` changes a sheet's range given a general target spec that can include only the start or end cell:

```js
/* given the old range and a new range spec, produce the new range */
function change_range(old, range) {
  var oldrng = XLSX.utils.decode_range(old), newrng;
  if(typeof range == "string") {
    if(range.charAt(0) == ":") newrng = {e:XLSX.utils.decode_cell(range.substr(1))};
    else if(range.charAt(range.length - 1) == ":") newrng = {s:XLSX.utils.decode_cell(range.substr(0, range.length - 1))};
    else newrng = XLSX.utils.decode_range(range);
  } else newrng = range;
  if(newrng.s) {
    if(newrng.s.c != null) oldrng.s.c = newrng.s.c;
    if(newrng.s.r != null) oldrng.s.r = newrng.s.r;
  }
  if(newrng.e) {
    if(newrng.e.c != null) oldrng.e.c = newrng.e.c;
    if(newrng.e.r != null) oldrng.e.r = newrng.e.r;
  }

  return XLSX.utils.encode_range(oldrng);
}

/* call change_sheet and modify worksheet */
function set_sheet_range(sheet, range) {
  sheet['!ref'] = change_range(sheet['!ref'], range);
}
```

_Adding a cell to a range_

```js
function range_add_cell(range, cell) {
  var rng = XLSX.utils.decode_range(range);
  var c = typeof cell == 'string' ? XLSX.utils.decode_cell(cell) : cell;
  console.log(rng, c);
  if(rng.s.r > c.r) rng.s.r = c.r;
  if(rng.s.c > c.c) rng.s.c = c.c;

  if(rng.e.r < c.r) rng.e.r = c.r;
  if(rng.e.c < c.c) rng.e.c = c.c;
  return XLSX.utils.encode_range(rng);
}
range_add_cell("A1:C3","B2")

function add_to_sheet(sheet, cell) {
  sheet['!ref'] = range_add_cell(sheet['!ref'], cell);
}
```

</details>