---
sidebar_position: 6
---

# Salesforce LWC

Salesforce apps can use third-party libraries in "Lightning Web Components".

This demo assumes familiarity with Lightning Web Components.  Salesforce has a
[detailed introduction.](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.get_started_introduction)

:::caution

Some of the details may differ across releases of Salesforce. This demo is based
on Lightning API version `55.0` and was last tested on 2022 June 26.

Salesforce may change the platform in backwards-incompatible ways, so the demo
may require some adjustments.  The official documentation should be consulted.

:::

## Getting Started

This demo was built on a "Developer Edition" account. At the time of writing, an
[account can be created for free.](https://developer.salesforce.com/signup)

### Create Sample Project and Component

Following the steps in ["Develop in Non-Scratch Orgs"](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.get_started_sfdx_deploy):

```bash
## Login
sfdx force:auth:web:login -d -a LWC-Hub

## Create Sample Project and Component
sfdx force:project:create --projectname SheetForce
cd SheetForce
sfdx force:lightning:component:create --type lwc -n sheetComponent -d force-app/main/default/lwc
```

By default, the component will not be available to app pages.  A few files must
be changed:

`force-app\main\default\lwc\sheetComponent\sheetComponent.html` add some HTML:

```html force-app\main\default\lwc\sheetComponent\sheetComponent.html
<template>
  <!-- highlight-next-line -->
  <b>SheetForce demo</b>
</template>
```

`force-app\main\default\lwc\sheetComponent\sheetComponent.js-meta.xml` change
`isExposed` from `false` to `true` and add some metadata:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
  <apiVersion>55.0</apiVersion>
  <!-- highlight-start -->
  <isExposed>true</isExposed>
  <masterLabel>SheetForce</masterLabel>
  <description>SheetJS Demo</description>
  <targets>
    <target>lightning__AppPage</target>
  </targets>
  <!-- highlight-end -->
</LightningComponentBundle>
```

### Deploy Sample Project

Deploy the project:

```bash
sfdx force:source:deploy -p force-app -u SALESFORCE@USER.NAME # replace with actual username
```

The custom component can be found in Custom Code > Lightning Components.

![Custom Component](pathname:///files/sfcustcomp.png)

### Initialize App Page

Create an "App Page" in the "Lightning App Builder".  Instructions are included
in [Hello World in a Scratch Org](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.get_started_sfdx_hello_world)

The following options should be set:
- The "App Page" option should be selected.
- The App Label should be set to "SheetJS Demo".
- The "One Region" layout should be selected.

Under Custom components, you should see "SheetForce".  Click and drag it into
the app builder main view to add it to the page.

Click "Save" and click "Yes" to activate.  The following options should be set:
- Click "Change..." next to "Icon" and pick a memorable icon
- Under "Lightning Experience" click "LightningBolt" then "Add page to app"

Click "Save" to activate the page, then click the left arrow to return to Setup.

Click the App Launcher and select "Bolt Solutions" then "SheetJS Demo".  You
should see a page like

![SheetForce Demo](pathname:///files/sfinitial.png)


## Adding the Standalone Script

The [standalone script](../../installation/standalone) can be downloaded and
added as a static resource.  Due to Salesforce naming restrictions, it will have
to be renamed to `sheetjs.js` when adding the static resource.

1) Download <https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js>

:::warning

**DO NOT "COPY AND PASTE"!**  The file should be explicitly downloaded.  Copying
and pasting corrupts the source code and the component will fail in subtle ways.

The easiest approach is to right-click the link and select "Save Link As..."

:::

2) Move the file to the `force-app/main/default/staticresources/` folder and
   rename the file to `sheetjs.js`.

3) Create `force-app/main/default/staticresources/sheetjs.resource-meta.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
  <cacheControl>Private</cacheControl>
  <contentType>application/javascript</contentType>
</StaticResource>
```

4) Deploy the project again:

```bash
sfdx force:source:deploy -p force-app -u SALESFORCE@USER.NAME # replace with actual username
```

:::note

The official documentation recommends adding a static resource with a ZIP file.
That approach is not explored in this demo.

:::

Custom Code > Static Resources should now list `sheetjs`:

![Static Resources](pathname:///files/sfstatic.png)

### Test the Static Resource

The script can be loaded from component code with:

```js
import XLSX from '@salesforce/resourceUrl/sheetjs';
```

The library includes a version number that can be displayed:

1) Add a reference in `sheetComponent.js` and expose the `version` property:

```js
import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
// highlight-next-line
import sheetjs from '@salesforce/resourceUrl/sheetjs';

export default class SheetComponent extends LightningElement {
  version = "???"; // start with ???
  async connectedCallback() {
    // highlight-next-line
    await loadScript(this, sheetjs); // load the library
    // At this point, the library is accessible with the `XLSX` variable
    this.version = XLSX.version;
  }
}
```

2) Reference the variable in `sheetComponent.html`:

```html
<template>
  <!-- highlight-next-line -->
  <b>SheetForce {version}</b>
</template>
```

3) Deploy the project again and re-load the Bolt Solutions "SheetJS Demo" page:

![Version number](pathname:///files/sfversion.png)

## Exporting Data from SF Lists

:::note

There are many different data types and APIs.  This demo uses the deprecated
`getListUi` function to pull account data.

:::

### Steps

#### Getting Account Data

The main method to obtain data is `getListUi` and the key for account data is
`ACCOUNT_OBJECT`:

```js
import { getListUi } from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

// ...

export default class SheetComponent extends LightningElement {
  @wire(getListUi, {
    objectApiName: ACCOUNT_OBJECT.objectApiName,
    listViewApiName: 'AllAccounts'
  }) listInfo({ error, data }) {

    // LIST DATA AVAILABLE HERE

  };
  // ...
}
```

#### Generating an Array of Arrays

SheetJS most reliably translates "arrays of arrays", a nested array which
directly maps to individual cell addresses.  For example:

```js
var data = [
  ["Name",      "Phone"],           // row 1
  ["Foo Bar",   "(555) 555-5555"],  // row 2
  ["Baz Qux",   "(555) 555-5556"]   // row 3
];
```

The APIs typically return nested objects, so the array must be constructed.

<details><summary><b>Salesforce Representation</b> (click to show)</summary>

The `data` parameter in the callback has a deep structure. Typically one would
set a property in the component and display data in a template:

```js
  // ...
  // declare records variable in the component
  records;
  @wire(getListUi, {
    objectApiName: ACCOUNT_OBJECT.objectApiName,
    listViewApiName: 'AllAccounts'
  }) listInfo({ error, data }) {
    if (data) {
      // data.records.records is the array of interest
      this.records = data.records.records;
      this.error = undefined;
    }
  }
  // ...
```

The template itself would iterate across the records:

```html
<template>
  <template if:true={records}>
    <table>
      <tr><th>Name</th><th>Phone</th></tr>
      <template for:each={records} for:item="record">
        <tr key={record.fields.Id.value}>
          <td>{record.fields.Name.value}</td>
          <td>{record.fields.Phone.value}</td>
        </tr>
      </template>
    </table>
  </template>
</template>
```

</details>

A suitable SheetJS array of arrays can be constructed by mapping across records:

```js
      var headers = [ "Name", "Phone" ];
      this.aoa = [headers].concat(data.records.records.map(record => [
        record.fields.Name.value,  // Name field
        record.fields.Phone.value, // Phone field
      ]));
```

This is readily exported to a spreadsheet in a callback function:

```js
  @api async download() {
    await loadScript(this, sheetjs); // load the library
    // create workbook
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(this.aoa);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    // export
    XLSX.writeFile(wb, "SheetForceExport.xlsx");
  };
```

### Complete Example

1) Add a button to `sheetComponent.html` that will call a `download` callback:

```html
<template>
  <!-- if the `aoa` property is set, show a button -->
  <template if:true={aoa}>
    <button onclick={download}><b>Click to Export!</b></button>
  </template>
  <!-- if the `aoa` property is not set, show a message -->
  <template if:false={aoa}><b>Please wait for data to load ...</b></template>
</template>
```

2) Replace `sheetComponent.js` with the following:

```js
import { LightningElement, wire, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { getListUi } from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

import sheetjs from '@salesforce/resourceUrl/sheetjs';

export default class SheetComponent extends LightningElement {
  aoa; // will hold data for export
  @wire(getListUi, {
    objectApiName: ACCOUNT_OBJECT.objectApiName,
    listViewApiName: 'AllAccounts'
  }) listInfo({ error, data }) {
    if (data) {
      var headers = [ "Name", "Phone" ];
      // create AOA and assign to `aoa` property
      this.aoa = [headers].concat(data.records.records.map(record => [
        record.fields.Name.value,  // Name field
        record.fields.Phone.value, // Phone field
      ]));
    } else if (error) console.log(error);
  };
  @api async download() {
    await loadScript(this, sheetjs); // load the library
    // create workbook
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(this.aoa);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    // export
    XLSX.writeFile(wb, "SheetForceExport.xlsx");
  };
}
```

3) Re-deploy and refresh the app page:

![SF Export Button](pathname:///files/sfexport.png)

The simple export has all of the data:

![Excel Export](pathname:///files/sfxlexport.png)

:::note

[SheetJS Pro](https://sheetjs.com/pro) offers additional styling options like
cell styling, automatic column width calculations, and frozen rows.

:::