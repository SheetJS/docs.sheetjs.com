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

## Dojo Toolkit

Dojo has changed module loading strategies over the years.  These examples were
tested with Dojo `1.10.4` and are not guaranteed to work with other versions.

Live demos are included in ["Dojo Toolkit"](../../demos/legacy#dojo-toolkit)

:::caution

The standalone scripts add `window.XLSX`, so it is recommended to use `_XLSX`
in the function arguments and access the library with `XLSX` in the callback:

```js
require(["xlsx"], function(
  // highlight-next-line
  _XLSX // !! NOTE: this is not XLSX! A different variable name must be used
) {
  // highlight-next-line
  console.log(XLSX.version); // use XLSX in the callback
})
```

:::

#### Synchronous Loading

When `async` is disabled, the scripts can be referenced directly in `require`
calls.

```html
<script src="//ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js" data-dojo-config="isDebug:1, async:0"></script>
<script>
require([
// highlight-next-line
  "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"
], function(
// highlight-next-line
  _XLSX // !! NOTE: this is not XLSX! A different variable name must be used
) {
  // ... use XLSX here
})
</script>
```

#### Asynchronous Loading

When `async` is enabled, Dojo will only understand the name `xlsx`.  The config
object can map package names to scripts:

```html
<script>
// This setting must appear *before* loading dojo.js
dojoConfig = {
  packages: [
    // highlight-start
    {
      name: "xlsx",
      // if self-hosting the script, location should be a folder relative to baseUrl setting
      location: "https://cdn.sheetjs.com/xlsx-latest/package/dist",
      // name of the script (without the .js extension)
      main: "xlsx.full.min"
    }
    // highlight-end
  ]
}
</script>
<script src="//ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js" data-dojo-config="isDebug:1, async:1"></script>
<script>
require(["xlsx"], function(_XLSX) {
  // ... use XLSX here
});
</script>
```