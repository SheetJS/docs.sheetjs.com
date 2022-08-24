---
pagination_prev: getting-started/index
pagination_next: getting-started/example
sidebar_position: 3
sidebar_custom_props:
  summary: Import ECMAScript Modules and TypeScript definitions
---

import current from '/version.js';

# Deno

Each standalone release script is available at <https://cdn.sheetjs.com/>.

Using the URL imports, `deno run` will automatically download scripts and types:

<pre><code parentName="pre" {...{"className": "language-ts"}}>{`\
// @deno-types="https://cdn.sheetjs.com/xlsx-${current}/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-${current}/package/xlsx.mjs';`}
</code></pre>

The `@deno-types` comment instructs Deno to use the type definitions.

:::warning

Older releases are technically available on [deno.land/x](https://deno.land/x/)
but the Deno registry is out of date.

[This is a known registry bug](https://github.com/denoland/dotland/issues/2072)

<https://cdn.sheetjs.com/> is the authoritative source for SheetJS scripts.

:::

## XLS Support

If XLS support is required, `cpexcel.full.mjs` must be manually imported:

<pre><code parentName="pre" {...{"className": "language-ts"}}>{`\
/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://cdn.sheetjs.com/xlsx-${current}/package/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);`}
</code></pre>
