---
sidebar_position: 6
sidebar_custom_props:
  summary: NetSuite, RequireJS and other module systems
---

import current from '/version.js';

# AMD

Each standalone release script is available at <https://cdn.sheetjs.com/>.

`xlsx.full.min.js` supports AMD with name `xlsx` out of the box.

<div><a href={`https://cdn.sheetjs.com/xlsx-${current}/package/dist/xlsx.full.min.js`}>https://cdn.sheetjs.com/xlsx-{current}/package/dist/xlsx.full.min.js</a> is the URL for {current}</div><br/>

## NetSuite

After downloading the script, it can be referenced directly in `define` calls
in SuiteScripts:

```js
define(['N/file', './xlsx.full.min'], function(file, XLSX) {
  // ... use XLSX here
})
```

As explained in the [NetSuite demo](../getting-started/demos/netsuite), module
aliases are created in config files referenced via `@NAmdConfig` comments.

## RequireJS

After downloading the script, it can be referenced directly in `require` calls:

```js
require(['./xlsx.full.min'], function(XLSX) {
  // ... use XLSX here
});
```

The `requirejs.config` function can define aliases through the `paths` key:

```js
requirejs.config({
  paths: {
    xlsx: [ './xlsx.full.min' ]
  }
});
```
