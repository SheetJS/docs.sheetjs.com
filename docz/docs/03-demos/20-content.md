---
sidebar_position: 20
title: Content and Site Generation
---

With the advent of server-side frameworks and content management systems, it is
possible to build sites whose source of truth is a spreadsheet!  This demo
explores a number of approaches.

## GatsbyJS

[`gatsby-transformer-excel`](https://www.gatsbyjs.com/plugins/gatsby-transformer-excel/)
generates nodes for each data row of each worksheet. The official documentation
includes examples and more detailed usage instructions.

:::note

`gatsby-transformer-excel` is maintained by the Gatsby core team and all bugs
should be directed to the main Gatsby project.  If it is determined to be a bug
in the parsing logic, issues should then be raised with the SheetJS project.

:::

## NuxtJS

`@nuxt/content` is a file-based CMS for Nuxt, enabling static-site generation
and on-demand server rendering powered by spreadsheets.

#### nuxt.config.js configuration

Through an override in `nuxt.config.js`, Nuxt Content will use custom parsers.
Differences from a stock `create-nuxt-app` config are shown below:

```js
// highlight-start
import { readFile, utils } from 'xlsx';

// This will be called when the files change
const parseSheet = (file, { path }) => {
  // `path` is a path that can be read with `XLSX.readFile`
  const wb = readFile(path);
  const o = wb.SheetNames.map(name => ({ name, data: utils.sheet_to_json(wb.Sheets[name])}));
  return { data: o };
}
// highlight-end

export default {
// ...

// highlight-start
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
// highlight-end

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

<details open><summary><b>Complete Example</b> (click to show)</summary>

:::note

This was tested against `create-nuxt-app v4.0.0` on 2022 August 13.

:::

1) Create a stock app:

```bash
npx create-nuxt-app SheetJSNuxt
```

When prompted, enter the following options:

- `Project name`: hit Enter (use default SheetJSNuxt)
- `Programming language`: hit Down Arrow (`TypeScript` selected) and hit Enter
- `Package manager`: select `Npm` and hit Enter
- `UI framework`: select `None` and hit Enter
- `Nuxt.js modules`: scroll to `Content`, select with Space, then hit Enter
- `Linting tools`: hit Enter (do not select any Linting tools)
- `Testing framework`: select `None` and hit Enter
- `Rendering mode`: select `Universal (SSR / SSG)` and hit Enter
- `Deployment target`: select `Static (Static/Jamstack hosting)` and hit Enter
- `Development tools`: hit Enter (do not select any Development tools)
- `What is your GitHub username?`: hit Enter
- `Version control system`: select `None`

The project will be configured and modules will be installed.

2) Install the SheetJS library and start the dev server:

```bash
cd SheetJSNuxt
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
npm run dev
```

When the build finishes, the terminal will display a URL like:

```
ℹ Listening on: http://localhost:64688/                                                            05:41:11
No issues found.                                                                                   05:41:11
```

The dev server is listening on that URL.  Open the link in a web browser.

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
not, hit Refresh manually or open a new browser window.

![Nuxt Demo end of step 5](pathname:///nuxt/nuxt5.png)

6) To verify that hot loading works, open `pres.xlsx` from the `content` folder
in Excel.  Add a new row to the bottom and save the file:

![Adding a new line to `pres.xlsx`](pathname:///nuxt/nuxl6.png)

The dev server terminal should show a line like:

```
ℹ Updated ./content/pres.xlsx                                       @nuxt/content 05:43:37
```

The page should automatically refresh with the new content:

![Nuxt Demo end of step 6](pathname:///nuxt/nuxt6.png)

7) Stop the dev server (hit `CTRL+C` in the terminal window) and run

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
