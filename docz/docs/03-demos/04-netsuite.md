---
sidebar_position: 4
---

# NetSuite

This demo discusses the key SheetJS operations.  Familiarity with SuiteScript 2
is assumed.  The following sections of the SuiteScript documentation should be
perused before reading this demo:

- [SuiteScript 2.x API Introduction](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4387172221.html)
  is an introduction that includes a simple example with deployment details,
- [SuiteScript 2.x Custom Modules](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4704097697.html)
  covers custom modules and adding third party scripts to modules.
- [`N/file` Module](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4205693274.html)
  covers the `N/file` module.  It is the main API for interacting with files.

The library plays nice with each script type, including RESTlets and Suitelets.

## Loading the SheetJS Standalone Script

[This script](https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js)
plays nice with SuiteScript `define`.  It should be downloaded and uploaded to
the File Cabinet.

After uploading, create a JSON configuration file (or add the alias to an
existing config file).  The reference points to the file and omits the `.js`.

```json
{
  "paths": {
    // highlight-next-line
    "xlsx": "/SuiteScripts/xlsx.full.min"
  }
}
```

This config file should be referenced in SuiteScripts using `@NAmdConfig`. This
part is documented in ["Import a third-party JavaScript Library"](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4704111062.html#bridgehead_4738199877):

```js
/**
* @NApiVersion 2.x
// highlight-next-line
* @NAmdConfig  ./JsLibraryConfig.json
* ... more options ...
*/
// highlight-next-line
define(['N/file', 'xlsx'], function(file, XLSX) {
  ...
});
```

## Reading Files

`N/file` provides [`file.load`](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4226574300.html)
for pulling files:

[`File#getContents`](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4229269811.html)
returns the data as a Base64-encoded string which can be read with `XLSX.read`:

```js
/* load file */
var f = file.load({ id: id_of_file });
/* parse */
var workbook = XLSX.read(f.getContents(), {type: "base64"});
```

## Writing Files

`N/file` provides [`file.create`](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4223861820.html)
and `file.load` for creating and loading files respectively.

Binary content must be Base64-encoded.  Fortunately, `XLSX.write` with `base64`
type will generate compatible Base64 strings:

```js
/* write XLSX workbook as Base64 string */
var out = XLSX.write(workbook, { bookType: "xlsx", type: "base64" });
/* create file */
var newfile = file.create({
  name: 'test.xlsx', // replace with desired name
  fileType: file.Type.EXCEL,
  contents: out
});
/* save */
newfile.save();
```
