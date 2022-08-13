---
sidebar_position: 13
title: Command-Line Tools
---

import current from '/version.js';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With the availability of JS engines and the success of server-side runtimes, it
is natural to want command-line tools for various workflows.

This demo covers a number of strategies for building standalone processors. The
goal is to generate CSV output from an arbitrary spreadsheet file.

## Deno

`deno compile` generates a standalone executable that includes the entire JS
runtime as well as user JS code.

When compiling, the `--allow-read` option must be specified to allow the script
to read files from the filesystem with `Deno.readFileSync`.

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Save the following script to `sheet2csv.ts`:

```ts title="sheet2csv.ts"
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';
import * as cptable from 'https://cdn.sheetjs.com/xlsx-latest/package/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);

/* Read and parse workbook */
const filename = Deno.args[0];
if(!filename) {
  console.error("usage: sheet2csv <filename> [sheetname]");
  Deno.exit(1);
}
const workbook = XLSX.readFile(filename);

/* Find worksheet */
const sheetname = Deno.args[1] || workbook.SheetNames[0];
if(!workbook.Sheets[sheetname]) {
  console.error(`error: workbook missing sheet ${sheetname}`);
  Deno.exit(1);
}

/* Generate CSV and print to stdout */
console.log(XLSX.utils.sheet_to_csv(workbook.Sheets[sheetname]));
```

2) Build `sheet2csv` with `deno compile`:

```bash
deno compile -r --allow-read sheet2csv.ts
```

`sheet2csv` is a generated executable that you can run.

</details>

## NodeJS

There are a few popular tools for compiling NodeJS scripts to executables.

The demo script presents a friendly command line interface including flags:

```bash
$ ./xlsx-cli -h
Usage: xlsx-cli [options] <file> [sheetname]

Options:
  -V, --version            output the version number
  -f, --file <file>        use specified workbook
  -s, --sheet <sheet>      print specified sheet (default first sheet)
...
```

1) Download [`xlsx-cli.js`](pathname:///cli/xlsx-cli.js)

2) Install the dependencies:

<Tabs>
  <TabItem value="npm" label="npm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
npm i --save https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz exit-on-epipe commander@2`}
</code></pre>
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
pnpm install https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz exit-on-epipe commander@2`}
</code></pre>
  </TabItem>
  <TabItem value="yarn" label="Yarn" default>
<pre><code parentName="pre" {...{"className": "language-bash"}}>{`\
yarn add https://cdn.sheetjs.com/xlsx-${current}/xlsx-${current}.tgz exit-on-epipe commander@2`}
</code></pre>
  </TabItem>
</Tabs>

3) Follow tooling steps:

<Tabs>
  <TabItem value="nexe" label="Nexe">

3) Run `nexe` and manually specify NodeJS version 14.15.3

```bash
npx nexe -t 14.15.3 xlsx-cli.js
```

This generates `xlsx-cli` or `xlsx-cli.exe` depending on platform.

  </TabItem>
  <TabItem value="pkg" label="pkg">

3) Run `pkg`:

```bash
npx pkg xlsx-cli.js
```

This generates `xlsx-cli-linux`, `xlsx-cli-macos`, and `xlsx-cli-win.exe` .

  </TabItem>
</Tabs>
