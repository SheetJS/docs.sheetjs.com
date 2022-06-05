---
sidebar_position: 4
sidebar_custom_props:
  summary: Server-side and other frameworks using NodeJS modules
---

import current from '/version.js';

# NodeJS

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tarballs are available on <https://cdn.sheetjs.com>.

<div>Each individual version can be referenced using a similar URL pattern.<br/>
<a href={`https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}>https://cdn.sheetjs.com/xlsx-{current}/xlsx-{current}.tgz</a> is the URL for {current}</div>

## Installation

Tarballs can be directly installed using a package manager:

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

### Vendoring

For general stability, "vendoring" modules is the recommended approach:

<div>1) Download the tarball (<code parentName="pre">xlsx-{current}.tgz</code>) for the desired version. The current
   version is available at <a href={`https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz`}>https://cdn.sheetjs.com/xlsx-{current}/xlsx-{current}.tgz</a></div><br/>

2) Create a `vendor` subdirectory at the root of your project and move the
   tarball to that folder.  Add it to your project repository.

3) Install the tarball using a package manager:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ npm install --save file:vendor/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ pnpm install --save file:vendor/xlsx-${current}.tgz`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
$ yarn add --save file:vendor/xlsx-0.18.7.tgz`}
</code></pre>
  </TabItem>
</Tabs>

The package will be installed and accessible as `xlsx`.

## Usage

#### CommonJS `require`

By default, the module supports `require` and it will automatically add support
for streams and filesystem access:

```js
var XLSX = require("xlsx");
```

#### ESM `import`

The module also ships with `xlsx.mjs` for use with `import`.  The `mjs` version
does not automatically load native node modules, so they must be added manually:

```js
import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

/* load 'stream' for stream support */
import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cpexcel);
```
