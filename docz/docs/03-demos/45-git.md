---
title: Data in Version Control
---

Git is a popular system for organizing a historical record of source code and
changes. Git can also store and track binary data artifacts, but data tools
are more effective in processing data stored in plain text formats like CSV.

Many official data releases by governments and organizations include XLSX or
XLS files. SheetJS trivializes the conversion to CSV. For example, in NodeJS:

```js
const XLSX = require("xlsx");

(async() => {
  /* Download Data */
  const f = await fetch("https://sheetjs.com/pres.xlsx");
  const data = await f.arrayBuffer();

  /* Parse workbook */
  // highlight-next-line
  const wb = XLSX.read(data);

  /* Convert first worksheet to CSV */
  const ws = wb.Sheets[wb.SheetNames[0]];
  // highlight-next-line
  const csv = XLSX.utils.sheet_to_csv(ws);
  console.log(csv);
})();
```

GitHub's ["Flat Data"](https://githubnext.com/projects/flat-data/) project
explores storing and comparing versions of structured CSV and JSON data.  The
official ["Excel to CSV"](https://github.com/githubocto/flat-demo-xlsx) example
uses SheetJS under the hood to generate CSV data from an XLSX file.

This demo covers implementation details elided in the official write-up.

## Flat Data

As a project from the company, the entire lifecycle uses GitHub offerings:

- GitHub offers free hosting for Git repositories
- GitHub Actions provide the main engine for running tasks at regular intervals
- `githubocto/flat` Action to help fetch data and automate post-processing
- `flat-postprocessing` Post-processing helper functions and examples
- "Flat Viewer": Web viewer for structured CSV and JSON data on GitHub

:::caution

A GitHub account is required. At the time of writing (2022 August 29), free
GitHub accounts have no Actions usage limits for public repositories.

Using private GitHub repositories is not recommended because the Flat Viewer
cannot access private repositories.

:::


### Data Source

Any publicly available spreadsheet can be a valid data source. The process will
fetch the data on specified intervals or events.

This demo endpoint <https://livesheet.deno.dev/> generates XLSX files.

<details><summary><b>Server Details</b> (click to show)</summary>

This demo is hosted on Deno Deploy.

```ts
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import { utils, writeXLSX } from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';

import * as Drash from "https://deno.land/x/drash@v2.5.4/mod.ts";

const rand = (x:number, n = 10): number => ((x + n * (Math.random() - 0.5) + 10)|0)%10;

class HomeResource extends Drash.Resource {
  public paths = ["/"];

  // see https://github.com/drashland/drash/issues/194
  public OPTIONS(request: Drash.Request, response: Drash.Response) {
    const allHttpMethods: string[] = [ "GET", "POST", "PUT", "DELETE" ];
    response.headers.set("Allow", allHttpMethods.join()); // Use this
    response.headers.set("Access-Control-Allow-Methods", allHttpMethods.join()); // or this
    response.headers.set("access-control-allow-origin", "*");
    response.status_code = 204;
    return response;
  }

  public GET(request: Drash.Request, response: Drash.Response): void {
    // create a workbook with some random data
    let data: any[][] = [ "ABCDEFG".split("") ];
    for(let i = 0; i < 10; ++i) data = data.concat([
      [5,4,3,3,7,9,5].map(v => rand(v)),
      [5,4,3,3,7,9,5].map(v => rand(v, 8)),
      [5,4,3,3,7,9,5].map(v => rand(v, 6)),
      [5,4,3,3,7,9,5].map(v => rand(v, 4)),
      [5,4,3,3,7,9,5].map(v => rand(v, 2)),
      [5,4,3,3,7,9,5].map(v => rand(v, 0))
    ]);
    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new(); utils.book_append_sheet(wb, ws, "data");
    // write the workbook to XLSX as a Uint8Array
    const file = writeXLSX(wb, { type: "buffer"});
    // set headers
    response.headers.set("Content-Disposition", 'attachment; filename="LiveSheet.xlsx"');
    // send data
    return response.send("application/vnd.ms-excel", file);
  }
}

// Create and run your server
const server = new Drash.Server({
  hostname: "",
  port: 3000,
  protocol: "http",
  resources: [ HomeResource ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

</details>


### Action

The `githubocto/flat` action can be added as a step in a workflow:

```yaml
      - name: Fetch data
        uses: githubocto/flat@v3
        with:
          http_url: https://livesheet.deno.dev/
          downloaded_filename: data.xlsx
          postprocess: ./postprocess.ts
```

The `http_url` will be fetched and saved to `downloaded_filename` in the repo.
This can be approximated with the following command:

```bash
curl -L -o data.xlsx https://livesheet.deno.dev/
```

After saving, the `postprocess` script will be run. When a `.ts` file is the
script, it will run the script in the Deno runtime. The `postprocess` script is
expected to read the downloaded file and create or overwrite files in the repo.
This can be approximated with the following command:

```bash
deno run -A ./postprocess.ts data.xlsx
```

The action will then compare the contents of the repo, creating a new commit if
the source data or artifacts from the `postprocess` script changed.


### Post-Processing Data

:::caution

The `flat-postprocessing` library includes a number of utilities for different
data formats.  The `readXLSX` helper uses SheetJS under the hood.

The library uses an older version of the SheetJS library. To use the latest
releases, the examples import from the SheetJS CDN:

```ts
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';
```

:::

#### Post-Process Script

The first argument to the post-processing script is the filename.  The file can
be read with `XLSX.readFile` directly.  On the export side, `writeCSV` from the
`flat` library can write data generated from `XLSX.utils.sheet_to_csv`:

```ts title="postprocess.ts"
import { writeCSV } from "https://deno.land/x/flat/mod.ts";
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';
/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://cdn.sheetjs.com/xlsx-latest/package/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);

/* get the file path for the downloaded file and generate the CSV path */
const in_file = Deno.args[0];
const out_file = in_file.replace(/.xlsx$/, ".csv");

/* read file */
// highlight-next-line
const workbook = XLSX.readFile(in_file);

/* generate CSV from first worksheet */
const first_sheet = workbook.Sheets[workbook.SheetNames[0]];
// highlight-next-line
const csv = XLSX.utils.sheet_to_csv(first_sheet);

/* write CSV */
// highlight-next-line
await writeCSV(out_file, csv);
```


## Complete Example

:::note

This was tested on 2022 August 29 using the GitHub UI.

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Create a free GitHub account or sign into the GitHub web interface.

1) Create a new repository (click the "+" icon in the upper-right corner).

- When prompted, enter a repository name of your choosing.
- Ensure "Public" is selected
- Check "Add a README file"
- Click "Create repository" at the bottom.

You will be redirected to the new project.

2) In the browser URL bar, change "github.com" to "github.dev". For example, if
   the URL was originally `https://github.com/SheetJS/flat-sheet` , the new URL
   should be `https://github.dev/SheetJS/flat-sheet` . Press Enter.

3) In the left "EXPLORER" panel, double-click just below README.md.  A text box
   will appear just above README.  Type `postprocess.ts` and press Enter.

   The main panel will show a `postprocess.ts` tab.  Copy the following code to
   the main editor window:

```ts title="postprocess.ts"
import { writeCSV } from "https://deno.land/x/flat/mod.ts";
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';
/* load the codepage support library for extended support with older formats  */
import * as cptable from 'https://cdn.sheetjs.com/xlsx-latest/package/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);

/* get the file path for the downloaded file and generate the CSV path */
const in_file = Deno.args[0];
const out_file = in_file.replace(/.xlsx$/, ".csv");

/* read file */
const workbook = XLSX.readFile(in_file);

/* generate CSV */
const first_sheet = workbook.Sheets[workbook.SheetNames[0]];
const csv = XLSX.utils.sheet_to_csv(first_sheet);

/* write CSV */
await writeCSV(out_file, csv);
```


4) In the left "EXPLORER" panel, double-click just below README.md.  A text box
   will appear.  Type `.github/workflows/data.yaml` and press Enter.

   Copy the following code into the main area.  It will create an action that
   runs roughly once an hour:

```yaml title=".github/workflows/data.yaml"
name: flatsheet

on:
  workflow_dispatch:
  schedule:
    - cron: '0 * * * *'

jobs:
  scheduled:
    runs-on: ubuntu-latest
    steps:
      - name: Setup deno
        uses: denoland/setup-deno@main
        with:
          deno-version: v1.x
      - name: Check out repo
        uses: actions/checkout@v2
      - name: Fetch data
        uses: githubocto/flat@v3
        with:
          http_url: https://livesheet.deno.dev/
          downloaded_filename: data.xlsx
          postprocess: ./postprocess.ts
```

5) Click on the source control icon (a little blue circle with the number 2).
   In the left panel, select Message box, type `init` and press `Ctrl+Enter` on
   Windows (`Command+Enter` on Mac).

6) Click the `☰` icon and click "Go to Repository" to return to the repo page.

7) Click "Actions" to see the workflows. In the left column, click `flatsheet`.

   This is the page for the action.  Every time the action is run, a new entry
   will be added to the list.

   Click "Run workflow", then click the "Run workflow" button in the popup.
   This will start a new run.  After about 30 seconds, a new row should show up
   in the main area.  The icon should be a white `✓` in a green circle.

8) Click "Code" to return to the main view.  It should have a file listing that
   includes `data.xlsx` (downloaded file) and `data.csv` (generated data)

   Now repeat step 7 to run the action a second time.  Click "Code" again.

9) Go to the URL bar and change "github.com" to "flatgithub.com".  For example,
   if the URL was originally `https://github.com/SheetJS/flat-sheet` , the new
   URL should be `https://flatgithub.com/SheetJS/flat-sheet` . Press Enter.

   You will see the "Flat Viewer".  In the top bar, the "Commit" option allows
   for switching to an older version of the data.

   The update process will run once an hour.  If you return in a few hours and
   refresh the page, there should be more commits in the selection list.
</details>