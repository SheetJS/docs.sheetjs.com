---
sidebar_position: 26
title: Amazon Web Services
---

AWS is a Cloud Services platform which includes traditional virtual machine
support, "Serverless Functions", cloud storage and much more.

:::caution

AWS iterates quickly and there is no guarantee that the referenced services
will be available in the future.

:::

This demo focuses on two key offerings: cloud storage ("S3") and the
"Serverless Function" platform ("Lambda").

:::note

This was tested on 2022 August 21.

:::

## AWS Lambda Functions

In this demo, the "Function URL" (automatic API Gateway management) features
are used.  Older deployments required special "Binary Media Types" to handle
formats like XLSX.  At the time of testing, the configuration was not required.

### Reading Data

In the Lambda handler method, the `event.body` attribute is a Base64-encoded
string.  The `busboy` body parser can accept a decoded body.

<details><summary><b>Code Sample</b> (click to show)</summary>

```js
const XLSX = require('xlsx');
var Busboy = require('busboy');

exports.handler = function(event, context, callback) {
  /* set up busboy */
  var ctype = event.headers['Content-Type']||event.headers['content-type'];
  var bb = Busboy({headers:{'content-type':ctype}});

  /* busboy is evented; accumulate the fields and files manually */
  var fields = {}, files = {};
  bb.on('error', function(err) { callback(null, { body: err.message }); });
  bb.on('field', function(fieldname, val) {fields[fieldname] = val });
  // highlight-start
  bb.on('file', function(fieldname, file, filename) {
    /* concatenate the individual data buffers */
    var buffers = [];
    file.on('data', function(data) { buffers.push(data); });
    file.on('end', function() { files[fieldname] = [Buffer.concat(buffers), filename]; });
  });
  // highlight-end

  /* on the finish event, all of the fields and files are ready */
  bb.on('finish', function() {
    /* grab the first file */
    var f = files["upload"];
    if(!f) callback(new Error("Must submit a file for processing!"));

    /* f[0] is a buffer */
    // highlight-next-line
    var wb = XLSX.read(f[0]);

    /* grab first worksheet and convert to CSV */
    var ws = wb.Sheets[wb.SheetNames[0]];
    callback(null, { statusCode: 200, body: XLSX.utils.sheet_to_csv(ws) });
  });

  /* start the processing */
  // highlight-next-line
  bb.end(Buffer.from(event.body, "base64"));
};
```

</details>

### Writing Data

For safely transmitting binary data, the `base64` type should be used.  Lambda
callback response `isBase64Encoded` property forces a binary download:

<details><summary><b>Code Sample</b> (click to show)</summary>

```js
var XLSX = require('xlsx');

exports.handler = function(event, context, callback) {
  /* make workbook */
  var wb = XLSX.read("S,h,e,e,t,J,S\n5,4,3,3,7,9,5", {type: "binary"});
  /* write to XLSX file in Base64 encoding */
  // highlight-next-line
  var body = XLSX.write(wb, {type:"base64", bookType: "xlsx"});
  /* mark as attached file */
  var headers = { "Content-Disposition": 'attachment; filename="SheetJSLambda.xlsx"'};
  /* Send back data */
  callback(null, {
    statusCode: 200,
    // highlight-next-line
    isBase64Encoded: true,
    body: body,
    headers: headers
  });
};
```

</details>

### Demo

<details><summary><b>Complete Example</b> (click to show)</summary>

0) Review the quick start for JavaScript on AWS

1) Create a new folder and download [`index.js`](pathname:///aws/index.js):

```bash
mkdir SheetJSLambda
cd SheetJSLambda
curl -LO https://docs.sheetjs.com/aws/index.js
```

2) Install dependencies to the current directory;

```bash
mkdir node_modules
npm install https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz busboy
```

3) Create a .zip package of the contents of the folder:

```bash
yes | zip -c ../SheetJSLambda.zip -r .
```

4) In the web interface for AWS Lambda, create a new Function with the options:

- Select "Author from scratch" (default choice when last verified)
- "Function Name": SheetJSLambda
- "Runtime": "Node.js" (select the version in the "Latest supported" block)
- Advanced Settings:
 + check "Enable function URL"
 + Auth type: NONE
 + Check "Configure CORS"

5) In the Interface, click "Upload from" and select ".zip file".  Click the
"Upload" button in the modal, select SheetJSLambda.zip, and click "Save".

At the time of writing, the ZIP is small enough that the Lambda code editor
will load the package.

6) Enable external access to the function.

Under Configuration > Function URL, click "Edit" and ensure that Auth type is
set to NONE.  If it is not, select NONE and hit Save.

Under Configuration > Permissions, scroll down to "Resource-based policy".
If no policy statements are defined, select "Add Permission" with the options:

- Select "Function URL" at the top
- Auth type: NONE
- Ensure that Statement ID is set to `FunctionURLAllowPublicAccess`
- Ensure that Principal is set to `*`
- Ensure that Action is set to `lambda:InvokeFunctionUrl`

Click "Save" and a new Policy statement should be created.

7) Find the Function URL (It is in the "Function Overview" section).

Try to access that URL in a web browser and the site will try to download
`SheetJSLambda.xlsx`.  Save and open the file to confirm it is valid.

To test parsing, download <https://sheetjs.com/pres.numbers> and run

```bash
curl -X POST -F "upload=@pres.numbers" FUNCTION_URL
```

The result should be a CSV output of the first sheet.

</details>

## S3 Storage

The main module for S3 and all AWS services is `aws-sdk`.

### Reading Data

The `s3#getObject` method returns an object with a `createReadStream` method.
Buffers can be concatenated and passed to `XLSX.read`:

<details><summary><b>Code Sample</b> (click to show)</summary>

```js title="SheetJSReadFromS3.mjs"
var XLSX = require("xlsx");
var AWS = require('aws-sdk');

/* replace these constants */
var accessKeyId = "<REPLACE WITH ACCESS KEY ID>";
var secretAccessKey = "<REPLACE WITH SECRET ACCESS KEY>";
var Bucket = "<REPLACE WITH BUCKET NAME>";
var Key = "<REPLACE WITH KEY>";

/* Get stream */
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  }
});
var f = s3.getObject({ Bucket: Bucket, Key: Key }).createReadStream();

/* collect data */
var bufs = [];
f.on('data', function(data) { bufs.push(data); });
f.on('end', function() {
  /* concatenate and parse */
  var wb = XLSX.read(Buffer.concat(bufs));
  console.log(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));
});
```

</details>

### Writing Data

`S3#upload` directly accepts a Buffer:

<details><summary><b>Code Sample</b> (click to show)</summary>

```js title="SheetJSWriteToS3.js"
var XLSX = require("xlsx");
var AWS = require('aws-sdk');

/* replace these constants */
var accessKeyId = "<REPLACE WITH ACCESS KEY ID>";
var secretAccessKey = "<REPLACE WITH SECRET ACCESS KEY>";
var Bucket = "<REPLACE WITH BUCKET NAME>";
var Key = "<REPLACE WITH KEY>";

/* Create a simple workbook and write XLSX to buffer */
var ws = XLSX.utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);
var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
var Body = XLSX.write(wb, {type: "buffer", bookType: "xlsx"});

/* upload buffer */
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  }
});
s3.upload({ Bucket: Bucket, Key: Key, Body: Body }, function(err, data) {
  if(err) throw err;
  console.log("Uploaded to " + data.Location);
});
```

</details>