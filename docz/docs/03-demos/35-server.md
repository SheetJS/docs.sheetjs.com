---
title: HTTP Server Processing
---

Server-Side JS platforms like NodeJS and Deno have built-in APIs for listening
on network interfaces.  They provide wrappers for requests and responses.

## Overview

#### Reading Data

Typically servers receive form data with content type `multipart/form-data` or
`application/x-www-form-urlencoded`. The platforms themselves typically do not
provide "body parsing" functions, instead leaning on the community to supply
modules to take the encoded data and split into form fields and files.

NodeJS servers typically use a parser like `formidable`. In the example below,
`formidable` will write to file and `XLSX.readFile` will read the file:

```js
var XLSX = require("xlsx"); // This is using the CommonJS build
var formidable = require("formidable");

require("http").createServer(function(req, res) {
  if(req.method !== "POST") return res.end("");

  /* parse body and implement logic in callback */
  // highlight-next-line
  (new formidable.IncomingForm()).parse(req, function(err, fields, files) {
    /* if successful, files is an object whose keys are param names */
    // highlight-next-line
    var file = files["upload"]; // <input type="file" id="upload" name="upload">
    /* file.path is a location in the filesystem, usually in a temp folder */
    // highlight-next-line
    var wb = XLSX.readFile(file.filepath);
    // print the first worksheet back as a CSV
    res.end(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
  });
}).listen(process.env.PORT || 3000);
```

`XLSX.read` will accept NodeJS buffers as well as `Uint8Array`, Base64 strings,
binary strings, and plain Arrays of bytes.  This covers the interface types of
a wide variety of frameworks.

#### Writing Data

Typically server libraries use a response API that accepts `Uint8Array` data.
`XLSX.write` with the option `type: "buffer"` will generate data.  To force the
response to be treated as an attachment, set the `Content-Disposition` header:

```js
var XLSX = require("xlsx"); // This is using the CommonJS build

require("http").createServer(function(req, res) {
  if(req.method !== "GET") return res.end("");
  var wb = XLSX.read("S,h,e,e,t,J,S\n5,4,3,3,7,9,5", {type: "binary"});
  // highlight-start
  res.setHeader('Content-Disposition', 'attachment; filename="SheetJS.xlsx"');
  res.end(XLSX.write(wb, {type:"buffer", bookType: "xlsx"}));
  // highlight-end
}).listen(process.env.PORT || 3000);
```

## Deno

:::caution

Many hosted services like Deno Deploy do not offer filesystem access.

This breaks web frameworks that use the filesystem in body parsing.

:::

Deno provides the basic elements to implement a server.  It does not provide a
body parser out of the box.

### Drash

In testing, [Drash](https://drash.land/drash/) had an in-memory body parser
which could handle file uploads on hosted services like Deno Deploy.

The service <https://s2c.sheetjs.com> is hosted on Deno Deploy using Drash!

_Reading Data_

`Request#bodyParam` reads body parameters.  For uploaded files, the `content`
property is a `Uint8Array`:

```ts
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import { read, utils } from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';

import * as Drash from "https://deno.land/x/drash@v2.5.4/mod.ts";

class ParseResource extends Drash.Resource {
  public paths = ["/"];

  public POST(request: Drash.Request, response: Drash.Response) {
    // assume a form upload like <input type="file" id="upload" name="upload">
    // highlight-next-line
    const file = request.bodyParam<Drash.Types.BodyFile>("upload");
    if (!file) throw new Error("File is required!");
    // highlight-next-line
    var wb = read(file.content, {type: "buffer"});
    return response.html( utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]));
  }
}
```

_Writing Data_

Headers are manually set with `Response#headers.set` while the raw body is set
with `Response#send`:

```ts
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import { read, utils } from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';

import * as Drash from "https://deno.land/x/drash@v2.5.4/mod.ts";

class WriteResource extends Drash.Resource {
  public paths = ["/export"];

  public GET(request: Drash.Request, response: Drash.Response): void {
    // create some fixed workbook
    const data = ["SheetJS".split(""), [5,4,3,3,7,9,5]];
    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new(); utils.book_append_sheet(wb, ws, "data");
    // write the workbook to XLSX as a Uint8Array
    // highlight-next-line
    const file = write(wb, { bookType: "xlsx", type: "buffer"});
    // set headers
    response.headers.set("Content-Disposition", 'attachment; filename="SheetJSDrash.xlsx"');
    // send data
    // highlight-next-line
    return response.send("application/vnd.ms-excel", file);
  }
}
```

<details><summary><b>Complete Example</b> (click to show)</summary>

1) Save the following script to `SheetJSDrash.ts`:

```ts title="SheetJSDrash.ts"
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"
import { read, utils, set_cptable } from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';
import * as cptable from 'https://cdn.sheetjs.com/xlsx-latest/package/dist/cpexcel.full.mjs';
set_cptable(cptable);

import * as Drash from "https://deno.land/x/drash@v2.5.4/mod.ts";

class ParseResource extends Drash.Resource {
  public paths = ["/"];

  public POST(request: Drash.Request, response: Drash.Response) {
    const file = request.bodyParam<Drash.Types.BodyFile>("file");
    if (!file) throw new Error("File is required!");
    var wb = read(file.content, {type: "buffer"});
    return response.html( utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]));
  }

  public GET(request: Drash.Request, response: Drash.Response): void {
    return response.html(`\
<!DOCTYPE html>
<html>
  <head>
    <title>SheetJS Spreadsheet to HTML Conversion Service</title>
    <meta charset="utf-8" />
  </head>
  <body>
<pre><h3><a href="//sheetjs.com/">SheetJS</a> Spreadsheet Conversion Service</h3>
<b>API</b>

Send a POST request to https://s2c.sheetjs.com/ with the file in the "file" body parameter:

$ curl -X POST -F"file=@test.xlsx" https://s2c.sheetjs.com/

The response will be an HTML TABLE generated from the first worksheet.

<b>Try it out!</b><form action="/" method="post" enctype="multipart/form-data">

<input type="file" name="file" />

Use the file input element to select a file, then click "Submit"

<button type="submit">Submit</button>
</form>
</pre>
  </body>
</html>`,
    );
  }
}

const server = new Drash.Server({
  hostname: "",
  port: 3000,
  protocol: "http",
  resources: [ ParseResource ],
});

server.run();

console.log(`Server running at ${server.address}.`);
```

2) Run the server:

```bash
deno run --allow-net SheetJSDrash.ts
```

3) Download the test file <https://sheetjs.com/pres.numbers>

4) Open http://localhost:3000/ in your browser.

Click "Choose File" and select `pres.numbers`.  Then click "Submit"

The page should show the contents of the file as an HTML table.

</details>

## NodeJS

### Express

The `express-formidable` middleware is powered by the `formidable` parser.  It
adds a `files` property to the request.

When downloading binary data, Express handles `Buffer` data in `res.end`.  The
convenience `attachment` method adds the required header:

```js
// Header 'Content-Disposition: attachment; filename="SheetJS.xlsx"'
res.attachment("SheetJS.xlsx");
```

The following demo Express server will respond to POST requests to `/upload`
with a CSV output of the first sheet.  It will also respond to GET requests to
`/download`, responding with a fixed XLSX worksheet:

```js title="SheetJSExpressCSV.js"
var XLSX = require('xlsx'), express = require('express');

/* create app */
var app = express();
/* add express-formidable middleware */
// highlight-next-line
app.use(require('express-formidable')());
/* route for handling uploaded data */
app.post('/upload', function(req, res) {
  // highlight-start
  var f = req.files["upload"]; // <input type="file" id="upload" name="upload">
  var wb = XLSX.readFile(f.path);
  // highlight-end
  /* respond with CSV data from the first sheet */
  res.status(200).end(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
});
app.get('/download', function(req, res) {
  /* generate workbook object */
  var ws = XLSX.utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);
  var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Data");
  // highlight-start
  /* generate buffer */
  var buf = XLSX.write(wb, {type: "buffer", bookType: "xlsx"});
  /* set headers */
  res.attachment("SheetJSExpress.xlsx");
  /* respond with file data */
  res.status(200).end(buf);
  // highlight-end
});
app.listen(+process.env.PORT||3000);
```

<details><summary><b>Testing</b> (click to show)</summary>

0) Save the code sample to `SheetJSExpressCSV.js`

1) Install dependencies:

```bash
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz express express-formidable
```

2) Start server (note: it will not print anything to console when running)

```bash
node SheetJSExpressCSV.js
```

3) Test POST requests using <https://sheetjs.com/pres.numbers>:

```bash
curl -LO https://sheetjs.com/pres.numbers
curl -X POST -F upload=@pres.numbers http://localhost:3000/upload
```

The response should show the data in CSV rows.

4) Test GET requests by opening http://localhost:3000/download in your browser.

It should prompt to download `SheetJSExpress.xlsx`

</details>

### NestJS

[The NestJS docs](https://docs.nestjs.com/techniques/file-upload) have detailed
instructions for file upload support. In the controller, the `path` property
works with `XLSX.readFile`.

When downloading binary data, NestJS expects `StreamableFile`-wrapped Buffers.

The following demo NestJS Controller will respond to POST requests to `/upload`
with a CSV output of the first sheet.  It will also respond to GET requests to
`/download`, responding with a fixed export:

```ts title="src/sheetjs/sheetjs.controller.js"
import { Controller, Get, Header, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFile, utils } from 'xlsx';

@Controller('sheetjs')
export class SheetjsController {
  @Post('upload') //  <input type="file" id="upload" name="upload">
  @UseInterceptors(FileInterceptor('upload'))
  async uploadXlsxFile(@UploadedFile() file: Express.Multer.File) {
    /* file.path is a path to the workbook */
    // highlight-next-line
    const wb = readFile(file.path);
    /* generate CSV of first worksheet */
    return utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);
  }

  @Get('download')
  @Header('Content-Disposition', 'attachment; filename="SheetJSNest.xlsx"')
  async downloadXlsxFile(): Promise<StreamableFile> {
    var ws = utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);
    var wb = utils.book_new(); utils.book_append_sheet(wb, ws, "Data");
    // highlight-start
    /* generate buffer */
    var buf = write(wb, {type: "buffer", bookType: "xlsx"});
    /* Return a streamable file */
    return new StreamableFile(buf);
    // highlight-end
  }
}
```

<details><summary><b>Testing</b> (click to show)</summary>

1) Create a new project:

```bash
npx @nestjs/cli new -p npm sheetjs-nest
cd sheetjs-nest
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz
npm i --save-dev @types/multer
mkdir -p upload
```

2) Create a new controller and a new module:

```bash
npx @nestjs/cli generate module sheetjs
npx @nestjs/cli generate controller sheetjs
```

3) Add `multer` to the new module by editing `src/sheetjs/sheetjs.module.ts`.
Changes are highlighted below:

```ts title="src/sheetjs/sheetjs.module.ts"
import { Module } from '@nestjs/common';
import { SheetjsController } from './sheetjs.controller';
// highlight-next-line
import { MulterModule } from '@nestjs/platform-express';

@Module({
// highlight-start
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
// highlight-end
  controllers: [SheetjsController]
})
export class SheetjsModule {}
```

4) Copy the `src/sheetjs/sheetjs.controller.ts` example from earlier, replacing
the contents of the existing file.

5) Start the server with

```bash
npx @nestjs/cli start
```

3) Test POST requests using <https://sheetjs.com/pres.numbers>:

```bash
curl -LO https://sheetjs.com/pres.numbers
curl -X POST -F upload=@pres.numbers http://localhost:3000/sheetjs/upload
```

The response should show the data in CSV rows.

4) Test GET requests by opening http://localhost:3000/sheetjs/download in your browser.

It should prompt to download `SheetJSNest.xlsx`

</details>

### Fastify

:::note

This demo was verified on 2022 August 24 using `fastify@4.5.2`

:::

_Reading Data_

`@fastify/multipart`, which uses `busbuy` under the hood, can be registered:

```js
/* load SheetJS Library */
const XLSX = require("xlsx");
/* load fastify and enable body parsing */
const fastify = require('fastify')({logger: true});
// highlight-next-line
fastify.register(require('@fastify/multipart'), { attachFieldsToBody: true });
```

Once registered with the option `attachFieldsToBody`, route handlers can use
`req.body` directly:

```js
/* POST / reads submitted file and exports to requested format */
fastify.post('/', async(req, reply) => {
  /* "file" is the name of the field in the HTML form*/
  const file = req.body.upload;
  /* toBuffer returns a promise that resolves to a Buffer */
  // highlight-next-line
  const buf = await file.toBuffer();
  /* `XLSX.read` can read the Buffer */
  const wb = XLSX.read(buf);
  /* reply with a CSV */
  reply.send(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
});
```

:::caution

Out of the box, Fastify will return an error `FST_ERR_CTP_BODY_TOO_LARGE` when
processing large spreadsheets (`statusCode 413`).  This is a Fastify issue.

[`bodyLimit`](https://www.fastify.io/docs/latest/Reference/Server/#bodylimit)
in the docs explains the setting. It can be overridden during server creation:

```js
/* increase request body size limit to 5MB = 5 * 1024 * 1024 bytes */
const fastify = require('fastify')({bodyLimit: 5 * 1024 * 1024});
```

:::

_Writing Data_

The `Content-Disposition` header must be set manually:

```js
/* GET / returns a workbook */
fastify.get('/', (req, reply) => {
  /* make a workbook */
  var wb = XLSX.read("S,h,e,e,t,J,S\n5,4,3,3,7,9,5", {type: "binary"});

  /* write to Buffer */
  const buf = XLSX.write(wb, {type:"buffer", bookType: "xlsx"});

  /* set Content-Disposition header and send data */
  // highlight-next-line
  reply.header('Content-Disposition', 'attachment; filename="SheetJSFastify.xlsx"').send(buf);
});
```

<details><summary><b>Testing</b> (click to show)</summary>

0) Save the following snippet to `SheetJSFastify.js`:

```js
/* load SheetJS Library */
const XLSX = require("xlsx");
/* load fastify and enable body parsing */
const fastify = require('fastify')({logger: true});
fastify.register(require('@fastify/multipart'), { attachFieldsToBody: true });

/* GET / returns a workbook */
fastify.get('/', (req, reply) => {
  /* make a workbook */
  var wb = XLSX.read("S,h,e,e,t,J,S\n5,4,3,3,7,9,5", {type: "binary"});

  /* write to Buffer */
  const buf = XLSX.write(wb, {type:"buffer", bookType: "xlsx"});

  /* set Content-Disposition header and send data */
  reply.header('Content-Disposition', 'attachment; filename="SheetJSFastify.xlsx"').send(buf);
});

/* POST / reads submitted file and exports to requested format */
fastify.post('/', async(req, reply) => {

  /* "file" is the name of the field in the HTML form*/
  const file = req.body.upload;

  /* toBuffer returns a promise that resolves to a Buffer */
  const wb = XLSX.read(await file.toBuffer());

  /* send back a CSV */
  reply.send(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
});

/* start */
fastify.listen({port: process.env.PORT || 3000}, (err, addr) => { if(err) throw err; });
```

1) Install dependencies:

```bash
npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz fastify @fastify/multipart
```

2) Start server

```bash
node SheetJSFastify.js
```

3) Test POST requests using <https://sheetjs.com/pres.numbers>:

```bash
curl -LO https://sheetjs.com/pres.numbers
curl -X POST -F upload=@pres.numbers http://localhost:3000/
```

The response should show the data in CSV rows.

4) Test GET requests by opening http://localhost:3000/ in your browser.

It should prompt to download `SheetJSFastify.xlsx`

</details>
