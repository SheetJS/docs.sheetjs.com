---
pagination_prev: getting-started/index
pagination_next: getting-started/example
sidebar_position: 6
sidebar_custom_props:
  summary: NetSuite, SAP UI5, RequireJS
---

import current from '/version.js';

# AMD (define)

Each standalone release script is available at <https://cdn.sheetjs.com/>.

`xlsx.full.min.js` supports AMD with name `xlsx` out of the box.

<div><a href={`https://cdn.sheetjs.com/xlsx-${current}/package/dist/xlsx.full.min.js`}>https://cdn.sheetjs.com/xlsx-{current}/package/dist/xlsx.full.min.js</a> is the URL for {current}</div><br/>

:::note

When referencing by file name, AMD loaders typically omit the file extension.

The actual file name is `xlsx.full.min.js`, but the examples will refer to the
script as `xlsx.full.min`.

:::

## NetSuite

After downloading the script, it can be referenced directly in `define` calls
in SuiteScripts:

```js
define(['N/file', './xlsx.full.min'], function(file, XLSX) {
  // ... use XLSX here
})
```

As explained in the [NetSuite demo](../../demos/netsuite), module
aliases are created in config files referenced via `@NAmdConfig` comments.

## SAP UI5

After downloading the script, it can be uploaded to the UI5 project and loaded
in the `sap.ui.define` call:

```js
sap.ui.define([
  /* ... other libraries ... */
  "path/to/xlsx.full.min"
], function(/* ... variables for the other libraries ... */, XLSX) {
  // use XLSX here
})
```

:::warning

The [SAP Website has a note about including third-party JS libraries.](https://blogs.sap.com/2017/04/30/how-to-include-third-party-libraries-modules-in-sapui5/)
It recommends copying and pasting JavaScript code.

**Copy and pasting code does not work** for SheetJS scripts as they contain
Unicode characters that may be mangled.  The standalone script should be
downloaded and manually uploaded to the project.

:::

## RequireJS

After downloading the script, it can be referenced directly in `require` calls:

```js
require(['./xlsx.full.min'], function(XLSX) {
  // ... use XLSX here
});
```

#### Aliases

The `requirejs.config` function can define aliases through the `paths` key:

```js
requirejs.config({
  paths: {
    xlsx: [ './xlsx.full.min' ]
  }
});
```

Once that is set, app code can freely require `xlsx`:

```js
require(['xlsx'], function(XLSX) {
  // ... use XLSX here
});
```
