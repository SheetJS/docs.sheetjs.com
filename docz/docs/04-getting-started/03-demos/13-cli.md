---
sidebar_position: 13
title: Command-Line Tools
---

import current from '/version.js';

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