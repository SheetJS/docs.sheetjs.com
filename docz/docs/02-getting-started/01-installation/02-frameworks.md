---
pagination_prev: getting-started/index
pagination_next: getting-started/example
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
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

Once installed, the library can be imported under the name `xlsx`:

```js
import { read, writeFileXLSX } from "xlsx";
```

The ["Bundlers" demo](../../demos/bundler) includes examples for specific
bundler tools.

:::warning

Older releases are technically available on the public npm registry as `xlsx`,
but the registry is out of date.  The latest version on that registry is 0.18.5

This is a known registry bug

<https://cdn.sheetjs.com/> is the authoritative source for SheetJS scripts.

For existing projects, the easiest approach is to uninstall and reinstall:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm rm --save xlsx
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm rm xlsx
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn remove xlsx
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
</Tabs>

:::

## Encoding support

If Encoding support is required, `cpexcel.full.mjs` must be manually imported:

```js
/* load the codepage support library for extended support with older formats  */
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
set_cptable(cptable);
```
