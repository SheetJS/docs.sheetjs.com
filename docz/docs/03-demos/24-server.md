---
sidebar_position: 23
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

:::warning

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