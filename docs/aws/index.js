/* sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
'use strict';
var XLSX = require('xlsx');
var Busboy = require('busboy');

exports.handler = function(event, context, callback) {
  if(event.requestContext.http.method == "GET") {
    /* make workbook */
    var wb = XLSX.read("S,h,e,e,t,J,S\n5,4,3,3,7,9,5", {type: "binary"});
    /* write to XLSX file in base64 encoding */
    var body = XLSX.write(wb, {type:"base64", bookType: "xlsx"});
    /* mark as attached file */
    var headers = { "Content-Disposition": 'attachment; filename="SheetJSLambda.xlsx"'};
    /* Send back data */
    callback(null, {
      statusCode: 200,
      isBase64Encoded: true,
      body: body,
      headers: headers
    });
    return;
  }

  /* set up busboy */
  var ctype = event.headers['Content-Type']||event.headers['content-type'];
  var bb = Busboy({headers:{'content-type':ctype}});

  /* busboy is evented; accumulate the fields and files manually */
  var fields = {}, files = {};
  bb.on('error', function(err) { callback(null, { body: err.message }); });
  bb.on('field', function(fieldname, val) {fields[fieldname] = val });
  bb.on('file', function(fieldname, file, filename) {
    /* concatenate the individual data buffers */
    var buffers = [];
    file.on('data', function(data) { buffers.push(data); });
    file.on('end', function() { files[fieldname] = [Buffer.concat(buffers), filename]; });
  });

  /* on the finish event, all of the fields and files are ready */
  bb.on('finish', function() {
    /* grab the first file */
    var f = files["upload"];
    if(!f) callback(new Error("Must submit a file for processing!"));

    /* f[0] is a buffer */
    var wb = XLSX.read(f[0]);

    /* grab first worksheet and convert to CSV */
    var ws = wb.Sheets[wb.SheetNames[0]];
    callback(null, { statusCode: 200, body: XLSX.utils.sheet_to_csv(ws) });
  });

  bb.end(Buffer.from(event.body, "base64"));
};
