---
title: Content and Site Generation
---

With the advent of server-side frameworks and content management systems, it is
possible to build sites whose source of truth is a spreadsheet!  This demo
explores a number of approaches.

## Lume

[Lume](https://lume.land) is a static site generator for the Deno platform.

The official [Sheets plugin](https://lume.land/plugins/sheets/) uses SheetJS
to load data from spreadsheets.

### Lume Demo

:::note

This was tested against `lume v1.12.0` on 2022 October 4.

:::

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Create a stock site:

```bash
mkdir sheetjs-lume
cd sheetjs-lume
deno run -A https://deno.land/x/lume/init.ts
```

When prompted, enter the following options:

- `Use TypeScript for the configuration file`: press Enter (use default `N`)
- `Do you want to use plugins`: type `sheets` and press Enter

The project will be configured and modules will be installed.

2) Download <https://sheetjs.com/pres.numbers> and place in a `_data` folder:

```bash
mkdir _data
curl -LO https://sheetjs.com/pres.numbers
mv pres.numbers _data
```

3) Create a `index.njk` file that references the file.  Since the file is
   `pres.numbers`, the parameter name is `pres`:

```liquid title="index.njk"
<h2>Presidents</h2>
<table><thead><th>Name</th><th>Index</th></thead>
  <tbody>
  {% for row in pres %}{% if (loop.index >= 1) %}
    <tr>
      <td>{{ row.Name }}</td>
      <td>{{ row.Index }}</td>
    </tr>
  {% endif %}{% endfor %}
  </tbody>
</table>
```

4) Run the development server:

```bash
deno task lume --serve
```

To verify it works, access http://localhost:3000 from your web browser.
Adding a new row and saving `pres.numbers` should refresh the data

5) Stop the server (press `CTRL+C` in the terminal window) and run

```bash
deno task lume
```

This will create a static site in the `_site` folder, which can be served with:

```bash
npx http-server _site
```

Accessing the page http://localhost:8080 will show the page contents.

</details>

## GatsbyJS

[`gatsby-transformer-excel`](https://www.gatsbyjs.com/plugins/gatsby-transformer-excel/)
generates nodes for each data row of each worksheet. The official documentation
includes examples and more detailed usage instructions.

:::note

`gatsby-transformer-excel` is maintained by the Gatsby core team and all bugs
should be directed to the main Gatsby project.  If it is determined to be a bug
in the parsing logic, issues should then be raised with the SheetJS project.

:::

## NextJS

:::note

This was tested against `next v12.2.5` on 2022 August 16.

:::

:::info

At a high level, there are two ways to pull spreadsheet data into NextJS apps:
loading an asset module or performing the file read operations from the NextJS
lifecycle.  At the time of writing, NextJS does not offer an out-of-the-box
asset module solution, so this demo focuses on raw operations.  NextJS does not
watch the spreadsheets, so `next dev` hot reloading will not work!

:::

The general strategy with NextJS apps is to generate HTML snippets or data from
the lifecycle functions and reference them in the template.

HTML output can be generated using `XLSX.utils.sheet_to_html` and inserted into
the document using the `dangerouslySetInnerHTML` attribute:

```jsx
export default function Index({html, type}) { return (
  // ...
// highlight-next-line
  <div dangerouslySetInnerHTML={{ __html: html }} />
  // ...
); }
```

:::warning

`fs` cannot be statically imported from the top level in NextJS pages.  The
dynamic import must happen within a lifecycle function.  For example:

```js
/* it is safe to import the library from the top level */
import { readFile, utils, set_fs } from 'xlsx';
/* it is not safe to import 'fs' from the top level ! */
// import * as fs from 'fs'; // this will fail
import { join } from 'path';
import { cwd } from 'process';

export async function getServerSideProps() {
// highlight-next-line
  set_fs(await import("fs")); // dynamically import 'fs' when needed
  const wb = readFile(join(cwd(), "public", "sheetjs.xlsx")); // works
  // ...
}
```



:::

### Strategies

#### "Static Site Generation" using `getStaticProps`

When using `getStaticProps`, the file will be read once during build time.

```js
import { readFile, set_fs, utils } from 'xlsx';

export async function getStaticProps() {
  /* read file */
  set_fs(await import("fs"));
  const wb = readFile(path_to_file)

  /* generate and return the html from the first worksheet */
  const html = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
  return { props: { html } };
};
```

#### "Static Site Generation with Dynamic Routes" using `getStaticPaths`

Typically a static site with dynamic routes has an endpoint `/sheets/[id]` that
implements both `getStaticPaths` and `getStaticProps`.

- `getStaticPaths` should return an array of worksheet indices:

```js
export async function getStaticPaths() {
  /* read file */
  set_fs(await import("fs"));
  const wb = readFile(path);

  /* generate an array of objects that will be used for generating pages */
  const paths = wb.SheetNames.map((name, idx) => ({ params: { id: idx.toString() } }));
  return { paths, fallback: false };
};
```

:::note

For a pure static site, `fallback` must be set to `false`!

:::

- `getStaticProps` will generate the actual HTML for each page:

```js
export async function getStaticProps(ctx) {
  /* read file */
  set_fs(await import("fs"));
  const wb = readFile(path);

  /* get the corresponding worksheet and generate HTML */
  const ws = wb.Sheets[wb.SheetNames[ctx.params.id]]; // id from getStaticPaths
  const html = utils.sheet_to_html(ws);
  return { props: { html } };
};
```

#### "Server-Side Rendering" using `getServerSideProps`

:::caution Do not use on a static site

These routes require a NodeJS dynamic server. Static page generation will fail!

`getStaticProps` and `getStaticPaths` support static site generation (SSG).

`getServerSideProps` is suited for NodeJS hosted deployments where the workbook
changes frequently and a static site is undesirable.

:::

When using `getServerSideProps`, the file will be read on each request.

```js
import { readFile, set_fs, utils } from 'xlsx';

export async function getServerSideProps() {
  /* read file */
  set_fs(await import("fs"));
  const wb = readFile(path_to_file);

  /* generate and return the html from the first worksheet */
  const html = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);
  return { props: { html } };
};
```

### Demo

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Disable NextJS telemetry:

```js
npx next telemetry disable
```

Confirm it is disabled by running

```js
npx next telemetry status
```

1) Set up folder structure.  At the end, a `pages` folder with a `sheets`
   subfolder must be created.  On Linux or MacOS or WSL:

```bash
mkdir -p pages/sheets/
```

2) Download the [test file](pathname:///next/sheetjs.xlsx) and place in the
   project root.  On Linux or MacOS or WSL:

```bash
curl -LO https://docs.sheetjs.com/next/sheetjs.xlsx
```

3) Install dependencies:

```bash
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz next
```

4) Download test scripts:

Download and place the following scripts in the `pages` subfolder:

- [`index.js`](pathname:///next/index.js)
- [`getServerSideProps.js`](pathname:///next/getServerSideProps.js)
- [`getStaticPaths.js`](pathname:///next/getStaticPaths.js)
- [`getStaticProps.js`](pathname:///next/getStaticProps.js)

Download [`[id].js`](pathname:///next/%5Bid%5D.js) and place in the
`pages/sheets` subfolder.

:::caution Percent-Encoding in the script name

The `[id].js` script must have the literal square brackets in the name. If your
browser saved the file to `%5Bid%5D.js`. rename the file.

:::

On Linux or MacOS or WSL:

```bash
cd pages
curl -LO https://docs.sheetjs.com/next/index.js
curl -LO https://docs.sheetjs.com/next/getServerSideProps.js
curl -LO https://docs.sheetjs.com/next/getStaticPaths.js
curl -LO https://docs.sheetjs.com/next/getStaticProps.js
cd sheets
curl -LOg 'https://docs.sheetjs.com/next/[id].js'
cd ../..
```

5) Test the deployment:

```bash
npx next
```

Open a web browser and access:

- http://localhost:3000 landing page
- http://localhost:3000/getStaticProps shows data from the first sheet
- http://localhost:3000/getServerSideProps shows data from the first sheet
- http://localhost:3000/getStaticPaths shows a list (3 sheets)

The individual worksheets are available at

- http://localhost:3000/sheets/0
- http://localhost:3000/sheets/1
- http://localhost:3000/sheets/2

6) Stop the server and run a production build:

```bash
npx next build
```

The final output will show a list of the routes and types:

```
Route (pages)                              Size     First Load JS
┌ ○ /                                      551 B          81.7 kB
├ ○ /404                                   194 B          77.2 kB
├ λ /getServerSideProps                    602 B          81.7 kB
├ ● /getStaticPaths                        2.7 kB         83.8 kB
├ ● /getStaticProps                        600 B          81.7 kB
└ ● /sheets/[id] (312 ms)                  580 B          81.7 kB
    ├ /sheets/0
    ├ /sheets/1
    └ /sheets/2
```

As explained in the summary, the `/getStaticPaths` and `/getStaticProps` routes
are completely static.  3 `/sheets/#` pages were generated, corresponding to 3
worksheets in the file.  `/getServerSideProps` is server-rendered.

7) Try to build a static site:

```bash
npx next export
```

:::note The static export will fail!

A static page cannot be generated at this point because `/getServerSideProps`
is still server-rendered.

:::

8) Remove `pages/getServerSideProps.js` and rebuild with `npx next build`.

Inspecting the output, there should be no lines with the `λ` symbol:

```
Route (pages)                              Size     First Load JS
┌ ○ /                                      551 B          81.7 kB
├ ○ /404                                   194 B          77.2 kB
├ ● /getStaticPaths                        2.7 kB         83.8 kB
├ ● /getStaticProps                        600 B          81.7 kB
└ ● /sheets/[id] (312 ms)                  580 B          81.7 kB
    ├ /sheets/0
    ├ /sheets/1
    └ /sheets/2
```

9) Generate the static site:

```bash
npx next export
```

The static site will be written to the `out` subfolder, which can be hosted with

```bash
npx http-server out
```

The command will start a local HTTP server on port 8080.

</details>

## NuxtJS

`@nuxt/content` is a file-based CMS for Nuxt, enabling static-site generation
and on-demand server rendering powered by spreadsheets.

#### nuxt.config.js configuration

Through an override in `nuxt.config.js`, Nuxt Content will use custom parsers.
Differences from a stock `create-nuxt-app` config are shown below:

```js
import { readFile, utils } from 'xlsx';

// This will be called when the files change
const parseSheet = (file, { path }) => {
  // `path` is a path that can be read with `XLSX.readFile`
  const wb = readFile(path);
  const o = wb.SheetNames.map(name => ({ name, data: utils.sheet_to_json(wb.Sheets[name])}));
  return { data: o };
}

export default {
// ...

  // content.extendParser allows us to hook into the parsing step
  content: {
    extendParser: {
      // the keys are the extensions that will be matched.  The "." is required
      ".numbers": parseSheet,
      ".xlsx": parseSheet,
      ".xls": parseSheet,
      // can add other extensions like ".fods" as desired
    }
  },

// ...
}
```

#### Template Use

When a spreadsheet is placed in the `content` folder, Nuxt will find it.  The
data can be referenced in a view with `asyncData`.  The name should not include
the extension, so `"sheetjs.numbers"` would be referenced as `"sheetjs"`:

```js
  async asyncData ({$content}) {
    return {
      // $content('sheetjs') will match files with extensions in nuxt.config.js
      data: await $content('sheetjs').fetch()
    };
  }
```

In the template, `data.data` is an array of objects.  Each object has a `name`
property for the worksheet name and a `data` array of row objects.  This maps
neatly with nested `v-for`:

```xml
  <!-- loop over the worksheets -->
  <div v-for="item in data.data" v-bind:key="item.name">
    <table>
      <!-- loop over the rows of each worksheet -->
      <tr v-for="row in item.data" v-bind:key="row.Index">
        <!-- here `row` is a row object generated from sheet_to_json -->
        <td>{{ row.Name }}</td>
        <td>{{ row.Index }}</td>
      </tr>
    </table>
  </div>
```

### Nuxt Content Demo

<details><summary><b>Complete Example</b> (click to show)</summary>

:::note

This was tested against `create-nuxt-app v4.0.0` on 2022 August 13.

:::

1) Create a stock app:

```bash
npx create-nuxt-app SheetJSNuxt
```

When prompted, enter the following options:

- `Project name`: press Enter (use default `SheetJSNuxt`)
- `Programming language`: press Down Arrow (`TypeScript` selected) then Enter
- `Package manager`: select `Npm` and press Enter
- `UI framework`: select `None` and press Enter
- `Nuxt.js modules`: scroll to `Content`, select with Space, then press Enter
- `Linting tools`: press Enter (do not select any Linting tools)
- `Testing framework`: select `None` and press Enter
- `Rendering mode`: select `Universal (SSR / SSG)` and press Enter
- `Deployment target`: select `Static (Static/Jamstack hosting)` and press Enter
- `Development tools`: press Enter (do not select any Development tools)
- `What is your GitHub username?`: press Enter
- `Version control system`: select `None`

The project will be configured and modules will be installed.

2) Install the SheetJS library and start the server:

```bash
cd SheetJSNuxt
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
npm run dev
```

When the build finishes, the terminal will display a URL like:

```
ℹ Listening on: http://localhost:64688/
```

The server is listening on that URL.  Open the link in a web browser.

3) Download <https://sheetjs.com/pres.xlsx> and move to the `content` folder.

4) Modify `nuxt.config.js` as described [earlier](#nuxtconfigjs-configuration)

5) Replace `pages/index.vue` with the following:

```html
<!-- sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com -->
<template><div>
  <div v-for="item in data.data" v-bind:key="item.name">
    <h2>{{ item.name }}</h2>
    <table><thead><tr><th>Name</th><th>Index</th></tr></thead><tbody>
      <tr v-for="row in item.data" v-bind:key="row.Index">
        <td>{{ row.Name }}</td>
        <td>{{ row.Index }}</td>
      </tr>
    </tbody></table>
  </div>
</div></template>

<script>
export default {
  async asyncData ({$content}) {
    return {
      data: await $content('pres').fetch()
    };
  }
}
</script>
```

The browser should refresh to show the contents of the spreadsheet.  If it does
not, click Refresh manually or open a new browser window.

![Nuxt Demo end of step 5](pathname:///nuxt/nuxt5.png)

6) To verify that hot loading works, open `pres.xlsx` from the `content` folder
in Excel.  Add a new row to the bottom and save the file:

![Adding a new line to `pres.xlsx`](pathname:///nuxt/nuxl6.png)

The server terminal window should show a line like:

```
ℹ Updated ./content/pres.xlsx                                       @nuxt/content 05:43:37
```

The page should automatically refresh with the new content:

![Nuxt Demo end of step 6](pathname:///nuxt/nuxt6.png)

7) Stop the server (press `CTRL+C` in the terminal window) and run

```bash
npm run generate
```

This will create a static site in the `dist` folder, which can be served with:

```bash
npx http-server dist
```

Accessing the page http://localhost:8080 will show the page contents. Verifying
the static nature is trivial: make another change in Excel and save.  The page
will not change.

</details>
