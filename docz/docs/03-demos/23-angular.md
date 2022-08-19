---
sidebar_position: 23
title: Angular
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Angular](https://angular.io/) is a JS library for building user interfaces.

This demo tries to cover common Angular data flow ideas and strategies. Angular
and TypeScript familiarity is assumed.

**SheetJS plays nice with each version of Angular**.

Other demos cover general Angular deployments, including:

- [iOS and Android applications powered by NativeScript](./mobile#nativescript)
- [iOS and Android applications powered by ionic](./mobile#nativescript)

:::warning

Angular dev tooling uses native NodeJS modules. There are a number of issues
when trying to run Angular projects with different NodeJS versions. These
issues should be directed to the Angular project.

:::


## Installation

[The "Frameworks" section](../getting-started/installation/frameworks) covers
installation with pnpm and other package managers.

The library can be imported directly from JS or TS code with:

```js
import { read, utils, writeFile } from 'xlsx';
```


## Internal State

The various SheetJS APIs work with various data shapes.  The preferred state
depends on the application.

### Array of Objects

Typically, some users will create a spreadsheet with source data that should be
loaded into the site.  This sheet will have known columns.  For example, our
[presidents sheet](https://sheetjs.com/pres.xlsx) has "Name" / "Index" columns:

![`pres.xlsx` data](pathname:///pres.png)

This naturally maps to an array of typed objects, as in the TS example below:

```ts
import { read, utils } from 'xlsx';

interface President {
  Name: string;
  Index: number;
}

const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
const wb = read(f);
const data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);
console.log(data);
```

`data` will be an array of objects:

```js
[
  { Name: "Bill Clinton", Index: 42 },
  { Name: "GeorgeW Bush", Index: 43 },
  { Name: "Barack Obama", Index: 44 },
  { Name: "Donald Trump", Index: 45 },
  { Name: "Joseph Biden", Index: 46 }
]
```

A component will typically loop over the data uaing `*ngFor`. The following
example generates a TABLE with a row for each President:

```ts title="src/app/app.component.ts"
import { Component } from '@angular/core';
import { read, utils } from 'xlsx';

interface President { Name: string; Index: number };

@Component({
  selector: 'app-root',
  template: `
<div class="content" role="main"><table>
  <thead><th>Name</th><th>Index</th></thead>
  <tbody>
// highlight-start
    <tr *ngFor="let row of rows">
      <td>{{row.Name}}</td>
      <td>{{row.Index}}</td>
    </tr>
// highlight-end
  </tbody>
</table></div>
`
})
export class AppComponent {
  // highlight-next-line
  rows: President[] = [ { Name: "SheetJS", Index: 0 }];
  ngOnInit(): void { (async() => {
    /* Download from https://sheetjs.com/pres.numbers */
    const f = await fetch("https://sheetjs.com/pres.numbers");
    const ab = await f.arrayBuffer();

    /* parse workbook */
    // highlight-next-line
    const wb = read(ab);

    /* update data */
    // highlight-next-line
    this.rows = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);

  })(); }
}
```

### HTML

The main disadvantage of the Array of Objects approach is the specific nature
of the columns.  For more general use, passing around an Array of Arrays works.
However, this does not handle merge cells well!

The `sheet_to_html` function generates HTML that is aware of merges and other
worksheet features.  The generated HTML does not contain any `<script>` tags,
and should therefore be safe to pass to an `innerHTML`-bound variable, but the
`DomSanitizer` approach is strongly recommended:

```ts title="src/app/app.component.ts"
import { Component } from '@angular/core';
// highlight-next-line
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-root',
// highlight-next-line
  template: `<div class="content" role="main" [innerHTML]="html"></div>`
})
export class AppComponent {
  // highlight-start
  constructor(private sanitizer: DomSanitizer) {}
  html: SafeHtml = "";
  // highlight-end
  ngOnInit(): void { (async() => {
    /* Download from https://sheetjs.com/pres.numbers */
    const f = await fetch("https://sheetjs.com/pres.numbers");
    const ab = await f.arrayBuffer();

    /* parse workbook */
    const wb = read(ab);

    /* update data */
    // highlight-start
    const h = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
    this.html = this.sanitizer.bypassSecurityTrustHtml(h);
    // highlight-end
  })(); }
}
```

### Rows and Columns

Some data grids and UI components split worksheet state in two parts: an array
of column attribute objects and an array of row objects.  The former is used to
generate column headings and for indexing into the row objects.

The safest approach is to use an array of arrays for state and to generate
column objects that map to A1-style column headers.

`ngx-datatable` uses `prop` as the key and `name` for the column label:

```js
/* rows are generated with a simple array of arrays */
this.rows = utils.sheet_to_json(worksheet, { header: 1 });

/* column objects are generated based on the worksheet range */
const range = utils.decode_range(ws["!ref"]||"A1");
this.columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({
  /* for an array of arrays, the keys are "0", "1", "2", ... */
  prop: String(i),
  /* column labels: encode_col translates 0 -> "A", 1 -> "B", 2 -> "C", ... */
  name: XLSX.utils.encode_col(i)
}));
```


## Older Versions

:::warning

This demo is included for legacy deployments. There are incompatibilities with
different NodeJS and other ecosystem versions.  Issues should be raised with
Google and the Angular team.

**The newest versions of NodeJS will not work with older Angular projects!**

:::

:::caution

The Angular tooling provides no easy way to switch between versions!

[This is a known Angular problem](https://github.com/angular/angular-cli/issues/9047)

To work around this, [`SheetJSAngular.zip`](pathname:///angular/SheetJSAngular.zip)
is a skeleton project designed to play nice with each Angular version.

:::

### Strategies

#### Internal State

This demo uses an array of arrays as the internal state:

```ts
export class SheetJSComponent {
  data: any[][] = [ [1, 2], [3, 4] ];
  // ...
}
```

Nested `ngFor` in a template can loop across the rows and cells:

```html
<table class="sjs-table">
  <tr *ngFor="let row of data">
    <td *ngFor="let val of row">{{val}}</td>
  </tr>
</table>
```

#### Reading Data

For legacy deployments, the best ingress is a standard HTML INPUT file element:

```html
<input type="file" (change)="onFileChange($event)" multiple="false" />
```

In the component, the event is a standard file event.  Using a `FileReader` has
broad support compared to the modern `Blob#arrayBuffer` approach:

```ts
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      // highlight-next-line
      const wb: WorkBook = read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: WorkSheet = wb.Sheets[wsname];

      /* save data */
      // highlight-next-line
      this.data = <AOA>(utils.sheet_to_json(ws, {header: 1}));
    };
    reader.readAsArrayBuffer(target.files[0]);
  }
```

#### Writing Data

The demo uses an HTML5 button in the template:

```html
<button (click)="export()">Export!</button>
```

In the component, `aoa_to_sheet` is used to generate the worksheet:

```ts
  export(): void {
    /* generate worksheet */
    const ws: WorkSheet = utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    writeFile(wb, "SheetJS.xlsx");
  }
```

### SystemJS

The default angular-cli configuration requires no additional configuration.

Some deployments use the SystemJS loader, which does require configuration.
[The SystemJS demo](./bundler#systemjs) describe the required settings.


### Legacy Demo

0) Download and unzip [`SheetJSAngular.zip`](pathname:///angular/SheetJSAngular.zip):

```bash
curl -LO https://docs.sheetjs.com/angular/SheetJSAngular.zip
unzip SheetJSAngular.zip
cd SheetJSAngular
```

1) Download the files for the desired Angular version:

<Tabs>
  <TabItem value="2" label="2">

- [`package.json.ng2`](pathname:///angular/versions/package.json-ng2) save to `package.json`
- [`polyfills.ts-ng2`](pathname:///angular/versions/polyfills.ts-ng2) save to `src/polyfills.ts`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng2
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng2
```

  </TabItem>
  <TabItem value="4" label="4">

- [`package.json.ng4`](pathname:///angular/versions/package.json-ng4) save to `package.json`
- [`polyfills.ts-ng4`](pathname:///angular/versions/polyfills.ts-ng4) save to `src/polyfills.ts`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng4
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng4
```

  </TabItem>
  <TabItem value="5" label="5">

- [`package.json.ng5`](pathname:///angular/versions/package.json-ng5) save to `package.json`
- [`polyfills.ts-ng5`](pathname:///angular/versions/polyfills.ts-ng5) save to `src/polyfills.ts`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng5
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng5
```

  </TabItem>
  <TabItem value="6" label="6">

- [`package.json.ng6`](pathname:///angular/versions/package.json-ng6) save to `package.json`
- [`polyfills.ts-ng6`](pathname:///angular/versions/polyfills.ts-ng6) save to `src/polyfills.ts`
- [`angular.json-ng6`](pathname:///angular/versions/angular.json-ng6) save to `angular.json`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng6
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng6
curl -o angular.json -L https://docs.sheetjs.com/angular/versions/angular.json-ng6
```

  </TabItem>
  <TabItem value="7" label="7">

- [`package.json.ng7`](pathname:///angular/versions/package.json-ng7) save to `package.json`
- [`polyfills.ts-ng7`](pathname:///angular/versions/polyfills.ts-ng7) save to `src/polyfills.ts`
- [`angular.json-ng7`](pathname:///angular/versions/angular.json-ng7) save to `angular.json`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng7
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng7
curl -o angular.json -L https://docs.sheetjs.com/angular/versions/angular.json-ng7
```

  </TabItem>
  <TabItem value="8" label="8">

- [`package.json.ng8`](pathname:///angular/versions/package.json-ng8) save to `package.json`
- [`polyfills.ts-ng8`](pathname:///angular/versions/polyfills.ts-ng8) save to `src/polyfills.ts`
- [`angular.json-ng8`](pathname:///angular/versions/angular.json-ng8) save to `angular.json`
- [`tsconfig.app.json-ng8`](pathname:///angular/versions/tsconfig.app.json-ng8) save to `tsconfig.app.json`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng8
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng8
curl -o angular.json -L https://docs.sheetjs.com/angular/versions/angular.json-ng8
curl -o tsconfig.app.json -L https://docs.sheetjs.com/angular/versions/tsconfig.app.json-ng8
```

  </TabItem>
  <TabItem value="9" label="9">

- [`package.json.ng9`](pathname:///angular/versions/package.json-ng9) save to `package.json`
- [`polyfills.ts-ng9`](pathname:///angular/versions/polyfills.ts-ng9) save to `src/polyfills.ts`
- [`angular.json-ng9`](pathname:///angular/versions/angular.json-ng9) save to `angular.json`
- [`tsconfig.app.json-ng9`](pathname:///angular/versions/tsconfig.app.json-ng9) save to `tsconfig.app.json`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng9
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng9
curl -o angular.json -L https://docs.sheetjs.com/angular/versions/angular.json-ng9
curl -o tsconfig.app.json -L https://docs.sheetjs.com/angular/versions/tsconfig.app.json-ng9
```

  </TabItem>
  <TabItem value="10" label="10">

- [`package.json.ng10`](pathname:///angular/versions/package.json-ng10) save to `package.json`
- [`polyfills.ts-ng10`](pathname:///angular/versions/polyfills.ts-ng10) save to `src/polyfills.ts`
- [`angular.json-ng10`](pathname:///angular/versions/angular.json-ng10) save to `angular.json`
- [`tsconfig.app.json-ng10`](pathname:///angular/versions/tsconfig.app.json-ng10) save to `tsconfig.app.json`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng10
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng10
curl -o angular.json -L https://docs.sheetjs.com/angular/versions/angular.json-ng10
curl -o tsconfig.app.json -L https://docs.sheetjs.com/angular/versions/tsconfig.app.json-ng10
```

  </TabItem>
  <TabItem value="11" label="11">

- [`package.json.ng11`](pathname:///angular/versions/package.json-ng11) save to `package.json`
- [`polyfills.ts-ng11`](pathname:///angular/versions/polyfills.ts-ng11) save to `src/polyfills.ts`
- [`angular.json-ng11`](pathname:///angular/versions/angular.json-ng11) save to `angular.json`
- [`tsconfig.app.json-ng11`](pathname:///angular/versions/tsconfig.app.json-ng11) save to `tsconfig.app.json`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng11
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng11
curl -o angular.json -L https://docs.sheetjs.com/angular/versions/angular.json-ng11
curl -o tsconfig.app.json -L https://docs.sheetjs.com/angular/versions/tsconfig.app.json-ng11
```

  </TabItem>
  <TabItem value="12" label="12">

- [`package.json.ng12`](pathname:///angular/versions/package.json-ng12) save to `package.json`
- [`polyfills.ts-ng12`](pathname:///angular/versions/polyfills.ts-ng12) save to `src/polyfills.ts`
- [`angular.json-ng12`](pathname:///angular/versions/angular.json-ng12) save to `angular.json`
- [`tsconfig.app.json-ng12`](pathname:///angular/versions/tsconfig.app.json-ng12) save to `tsconfig.app.json`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng12
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng12
curl -o angular.json -L https://docs.sheetjs.com/angular/versions/angular.json-ng12
curl -o tsconfig.app.json -L https://docs.sheetjs.com/angular/versions/tsconfig.app.json-ng12
```

  </TabItem>
  <TabItem value="13" label="13">

- [`package.json.ng13`](pathname:///angular/versions/package.json-ng13) save to `package.json`
- [`polyfills.ts-ng13`](pathname:///angular/versions/polyfills.ts-ng13) save to `src/polyfills.ts`
- [`angular.json-ng13`](pathname:///angular/versions/angular.json-ng13) save to `angular.json`
- [`tsconfig.app.json-ng13`](pathname:///angular/versions/tsconfig.app.json-ng13) save to `tsconfig.app.json`

```bash
curl -o package.json -L https://docs.sheetjs.com/angular/versions/package.json-ng13
curl -o src/polyfills.ts -L https://docs.sheetjs.com/angular/versions/polyfills.ts-ng13
curl -o angular.json -L https://docs.sheetjs.com/angular/versions/angular.json-ng13
curl -o tsconfig.app.json -L https://docs.sheetjs.com/angular/versions/tsconfig.app.json-ng13
```

  </TabItem>
</Tabs>

2) install project and dependencies:

```bash
npm i
npm i -S https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
```

3) start a local server with

```bash
npm run serve
```

The traditional site URL is http://localhost:4200/ .  Open the page with a web
browser and open the console.  In the "Elements" tab, the `app-root` element
will have an `ng-version` attribute.

4) build the app with

```bash
npm run build
```