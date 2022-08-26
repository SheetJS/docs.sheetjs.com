---
pagination_prev: getting-started/index
pagination_next: getting-started/example
sidebar_position: 7
sidebar_custom_props:
  summary: Download and Import ECMAScript Modules
---

import current from '/version.js';

# Bun

[Bun](https://bun.sh/) is a JavaScript runtime powered by JavaScriptCore.

:::caution Bun support is considered experimental.

Great open source software grows with user tests and reports. Any issues should
be reported to the Bun project for further diagnosis.

:::

Each standalone release script is available at <https://cdn.sheetjs.com/>.

<div><a href={`https://cdn.sheetjs.com/xlsx-${current}/package/xlsx.mjs`}>https://cdn.sheetjs.com/xlsx-{current}/package/xlsx.mjs</a> is the URL for {current}</div><br/>

After downloading the script, it can be directly imported:

```js
import * as XLSX from './xlsx.mjs';
import * as fs from 'fs';
XLSX.set_fs(fs);
```

## Encoding support

If Encoding support is required, `cpexcel.full.mjs` must be manually imported.

<div><a href={`https://cdn.sheetjs.com/xlsx-${current}/package/dist/cpexcel.full.mjs`}>https://cdn.sheetjs.com/xlsx-{current}/package/dist/cpexcel.full.mjs</a> is the URL for {current}</div><br/>


```ts
/* load the codepage support library for extended support with older formats  */
import * as cptable from './cpexcel.full.mjs';
XLSX.set_cptable(cptable);
```
