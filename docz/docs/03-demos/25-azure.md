---
sidebar_position: 25
title: Azure Cloud Services
---

Azure is a Cloud Services platform which includes traditional virtual machine
support, "Serverless Functions", cloud storage and much more.

:::caution

Azure iterates quickly and there is no guarantee that the referenced services
will be available in the future.

:::

This demo focuses on two key offerings: cloud storage ("Azure Blob Storage")
and the "Serverless Function" platform ("Azure Functions").

:::note

This was tested on 2022 August 21.

:::

## Azure Functions

This discussion focuses on the "HTTP Trigger" function type.

:::info

To enable binary data processing, a setting must be changed in `function.json`:

```json title="function.json"
{
  "bindings": [
    {
      "type": "httpTrigger",
      "direction": "in",
//highlight-next-line
      "dataType": "binary",
      "name": "req",
```

:::

### Reading Data

`formidable` expects a stream and Azure does not present one.  It can be made:

```js
const XLSX = require('xlsx');
const formidable = require('formidable');
const Readable = require('stream').Readable;

/* formidable expects the request object to be a stream */
const streamify = (req) => {
  if(typeof req.on !== 'undefined') return req;
  const s = new Readable();
  s._read = ()=>{};
  s.push(Buffer.from(req.body));
  s.push(null);
  Object.assign(s, req);
  return s;
};

module.exports = (context, req) => {
  const form = new formidable.IncomingForm();
  form.parse(streamify(req), (err, fields, files) => {
    /* grab the first file */
    var f = files["upload"];
    if(!f) {
      context.res = { status: 400, body: "Must submit a file for processing!" };
    } else {
      /* file is stored in a temp directory, so we can point to that and read it */
      const wb = XLSX.read(f.filepath, {type:"file"});

      /* generate CSV from first sheet */
      const csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);
      context.res = { status: 200, body: csv };
    }
    context.done();
  });
}
```

### Writing Data

The `body` property can be a Buffer, like those generated by `XLSX.write`:

```js
const XLSX = require('xlsx');
module.exports = (context, req) => {
  // generate XLSX file in a Buffer
  var ws = XLSX.utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);
  var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Data");
  // highlight-next-line
  var buf = XLSX.write(wb, {type: "buffer", bookType: "xlsx"});

  // Set the body and Content-Disposition header
  // highlight-start
  context.res = {
    status: 200,
    headers: { "Content-Disposition": `attachment; filename="SheetJSAzure.xlsx";` },
    body: buf
  };
  // highlight-end
  context.done();
};
```

### Demo

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Review the quick start for JavaScript on Azure Functions.  This involves
installing the Azure Functions Core Tools and other dependencies.

1) Create a new project and install dependencies:

```bash
func init sheetjs-azure --worker-runtime node --language javascript
cd sheetjs-azure
npm i
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz formidable
```

2) Create a new "HTTP Trigger" function:

```bash
func new --template "Http Trigger" --name SheetJSAzure
```

3) Edit `SheetJSAzure/function.json` to add the `dataType: "binary"` property:

```js title="SheetJSAzure/function.json"
      "direction": "in",
// highlight-next-line
      "dataType": "binary",
      "name": "req",
```

4) Replace `SheetJSAzure/index.js` with the following:

```js title="SheetJSAzure/index.js"
/* sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
const XLSX = require('xlsx');
const formidable = require('formidable');
const Readable = require('stream').Readable;

/* formidable expects the request object to be a stream */
const streamify = (req) => {
    if(typeof req.on !== 'undefined') return req;
    const s = new Readable();
    s._read = ()=>{};
    s.push(Buffer.from(req.body));
    s.push(null);
    Object.assign(s, req);
    return s;
};

module.exports = (context, req) => {
  if(req.method == "POST") {
    const form = new formidable.IncomingForm();
    form.parse(streamify(req), (err, fields, files) => {
      /* grab the first file */
      var f = files["upload"];
      if(!f) {
        context.res = { status: 400, body: "Must submit a file for processing!" };
      } else {
        /* file is stored in a temp directory, so we can point to that and read it */
        const wb = XLSX.read(f.filepath, {type:"file"});

        /* generate CSV from first sheet */
        const csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);
        context.res = { status: 200, body: csv };
      }
      context.done();
    });
  } else if(req.method == "GET") {
    var ws = XLSX.utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);
    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Data");
    var buf = XLSX.write(wb, {type: "buffer", bookType: "xlsx"});
    context.res = {
      status: 200,
      headers: { "Content-Disposition": `attachment; filename="SheetJSAzure.xlsx";` },
      body: buf
    };
    context.done();
  } else {
    context.res = { status: 500, body: `Unsupported method ${req.method}` };
    context.done();
  }
};
```

5) Test locally with `npm start`

To test uploads, download <https://sheetjs.com/pres.numbers> and run:

```bash
curl -X POST -F "upload=@pres.numbers" http://localhost:7071/api/SheetJSAzure
```

To test downloads, access http://localhost:7071/api/SheetJSAzure and download
the generated file.  Confirm it is a valid file.

6) Deploy to Azure.  Replace `NAME_OF_FUNCTION_APP` with the name:

```bash
func azure functionapp publish NAME_OF_FUNCTION_APP
```

Get the function URL and test using the same sequence as in step 5.

</details>

## Azure Blob Storage

The main module for Azure Blob Storage is `@azure/storage-blob`. This example
was tested using the "Connection String" authentication method.  The strings
are found in the Azure Portal under "Access Keys" for the storage account.

### Reading Data

The `BlobClient#download` method returns a Stream. After collecting into a
Buffer, `XLSX.read` can parse the data:

```js title="SheetJSReadFromAzure.mjs"
import { BlobServiceClient } from "@azure/storage-blob";
import { read, utils } from "xlsx";

/* replace these constants */
const connStr = "<REPLACE WITH CONNECTION STRING>";
const containerName = "<REPLACE WITH CONTAINER NAME>";
const blobName = "<REPLACE WITH BLOB NAME>";

/* get a readable stream*/
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerClient = blobServiceClient.getContainerClient(containerName);
const blobClient = containerClient.getBlobClient(blobName);
const response = (await blobClient.download()).readableStreamBody;

/* collect data into a Buffer */
const bufs = [];
for await(const buf of response) bufs.push(buf);
const downloaded = Buffer.concat(bufs);

/* parse downloaded buffer */
const wb = read(downloaded);
/* print first worksheet */
console.log(utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
```

### Writing Data

`BlockBlobClient#upload` directly accepts a Buffer:

```js title="SheetJSWriteToAzure.mjs"
import { BlobServiceClient } from "@azure/storage-blob";
import { read, utils } from "xlsx";

/* replace these constants */
const connStr = "<REPLACE WITH CONNECTION STRING>";
const containerName = "<REPLACE WITH CONTAINER NAME>";
const blobName = "<REPLACE WITH BLOB NAME>";

/* Create a simple workbook and write XLSX to buffer */
const ws = utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);
const wb = utils.book_new(); utils.book_append_sheet(wb, ws, "Sheet1");
const buf = write(wb, {type: "buffer", bookType: "xlsx"});

/* upload buffer */
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerClient = blobServiceClient.getContainerClient(containerName);
const blockBlobClient = containerClient.getBlockBlobClient(blobName);
const uploadBlobResponse = await blockBlobClient.upload(buf, buf.length);
```