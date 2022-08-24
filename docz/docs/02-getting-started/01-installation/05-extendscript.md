---
pagination_prev: getting-started/index
pagination_next: getting-started/example
sidebar_position: 5
sidebar_custom_props:
  summary: Photoshop, InDesign, and other Creative Cloud apps
---

import current from '/version.js';

# ExtendScript

Each standalone release script is available at <https://cdn.sheetjs.com/>.

`xlsx.extendscript.js` is an ExtendScript build for Photoshop and InDesign.

<div><a href={`https://cdn.sheetjs.com/xlsx-${current}/package/dist/xlsx.extendscript.js`}>https://cdn.sheetjs.com/xlsx-{current}/package/dist/xlsx.extendscript.js</a> is the URL for {current}</div><br/>

After downloading the script, it can be directly referenced with `#include`:

```c
#include "xlsx.extendscript.js"
```
