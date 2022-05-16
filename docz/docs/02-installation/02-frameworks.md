---
sidebar_position: 2
sidebar_custom_props:
  summary: Angular, React, VueJS, Webpack, etc.
---

import current from '/version.js';

# Frameworks and Bundlers

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Each standalone release package is available at <https://cdn.sheetjs.com/>.  The
NodeJS package is designed to be used with frameworks and bundlers.  It is a
proper ECMAScript Module release which can be optimized with developer tools.

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm install --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

Once installed, the library can be imported under the name `xlsx`:

```js
import { read, writeFileXLSX } from "xlsx";
```

<details>
  <summary><b>XLS Codepage support</b> (click to show)</summary>

If XLS support is required, `cpexcel.full.js` must be manually imported:

```js
/* load the codepage support library for extended support with older formats  */
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
set_cptable(cptable);
```

</details>