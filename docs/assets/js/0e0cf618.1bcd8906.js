"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5217],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),m=a,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9804:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const o={title:"Azure Cloud Services"},i=void 0,s={unversionedId:"demos/azure",id:"demos/azure",title:"Azure Cloud Services",description:"Azure is a Cloud Services platform which includes traditional virtual machine",source:"@site/docs/03-demos/22-azure.md",sourceDirName:"03-demos",slug:"/demos/azure",permalink:"/docs/demos/azure",draft:!1,tags:[],version:"current",sidebarPosition:22,frontMatter:{title:"Azure Cloud Services"},sidebar:"tutorialSidebar",previous:{title:"Amazon Web Services",permalink:"/docs/demos/aws"},next:{title:"NetSuite",permalink:"/docs/demos/netsuite"}},l={},u=[{value:"Azure Functions",id:"azure-functions",level:2},{value:"Reading Data",id:"reading-data",level:3},{value:"Writing Data",id:"writing-data",level:3},{value:"Demo",id:"demo",level:3},{value:"Azure Blob Storage",id:"azure-blob-storage",level:2},{value:"Reading Data",id:"reading-data-1",level:3},{value:"Writing Data",id:"writing-data-1",level:3}],c={toc:u};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,'Azure is a Cloud Services platform which includes traditional virtual machine\nsupport, "Serverless Functions", cloud storage and much more.'),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Azure iterates quickly and there is no guarantee that the referenced services\nwill be available in the future.")),(0,a.kt)("p",null,'This demo focuses on two key offerings: cloud storage ("Azure Blob Storage")\nand the "Serverless Function" platform ("Azure Functions").'),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"This was tested on 2022 August 21.")),(0,a.kt)("h2",{id:"azure-functions"},"Azure Functions"),(0,a.kt)("p",null,'This discussion focuses on the "HTTP Trigger" function type.'),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"To enable binary data processing, a setting must be changed in ",(0,a.kt)("inlineCode",{parentName:"p"},"function.json"),":"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="function.json"',title:'"function.json"'},'{\n  "bindings": [\n    {\n      "type": "httpTrigger",\n      "direction": "in",\n//highlight-next-line\n      "dataType": "binary",\n      "name": "req",\n'))),(0,a.kt)("h3",{id:"reading-data"},"Reading Data"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"formidable")," expects a stream and Azure does not present one.  It can be made:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const XLSX = require('xlsx');\nconst formidable = require('formidable');\nconst Readable = require('stream').Readable;\n\n/* formidable expects the request object to be a stream */\nconst streamify = (req) => {\n  if(typeof req.on !== 'undefined') return req;\n  const s = new Readable();\n  s._read = ()=>{};\n  s.push(Buffer.from(req.body));\n  s.push(null);\n  Object.assign(s, req);\n  return s;\n};\n\nmodule.exports = (context, req) => {\n  const form = new formidable.IncomingForm();\n  form.parse(streamify(req), (err, fields, files) => {\n    /* grab the first file */\n    var f = files[\"upload\"];\n    if(!f) {\n      context.res = { status: 400, body: \"Must submit a file for processing!\" };\n    } else {\n      /* file is stored in a temp directory, so we can point to that and read it */\n      const wb = XLSX.read(f.filepath, {type:\"file\"});\n\n      /* generate CSV from first sheet */\n      const csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);\n      context.res = { status: 200, body: csv };\n    }\n    context.done();\n  });\n}\n")),(0,a.kt)("h3",{id:"writing-data"},"Writing Data"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"body")," property can be a Buffer, like those generated by ",(0,a.kt)("inlineCode",{parentName:"p"},"XLSX.write"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const XLSX = require(\'xlsx\');\nmodule.exports = (context, req) => {\n  // generate XLSX file in a Buffer\n  var ws = XLSX.utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);\n  var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Data");\n  // highlight-next-line\n  var buf = XLSX.write(wb, {type: "buffer", bookType: "xlsx"});\n\n  // Set the body and Content-Disposition header\n  // highlight-start\n  context.res = {\n    status: 200,\n    headers: { "Content-Disposition": `attachment; filename="SheetJSAzure.xlsx";` },\n    body: buf\n  };\n  // highlight-end\n  context.done();\n};\n')),(0,a.kt)("h3",{id:"demo"},"Demo"),(0,a.kt)("details",null,(0,a.kt)("summary",null,(0,a.kt)("b",null,"Complete Example")," (click to show)"),(0,a.kt)("p",null,"0) Review the quick start for JavaScript on Azure Functions.  This involves\ninstalling the Azure Functions Core Tools and other dependencies."),(0,a.kt)("p",null,"1) Create a new project and install dependencies:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"func init sheetjs-azure --worker-runtime node --language javascript\ncd sheetjs-azure\nnpm i\nnpm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz formidable\n")),(0,a.kt)("p",null,'2) Create a new "HTTP Trigger" function:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'func new --template "Http Trigger" --name SheetJSAzure\n')),(0,a.kt)("p",null,"3) Edit ",(0,a.kt)("inlineCode",{parentName:"p"},"SheetJSAzure/function.json")," to add the ",(0,a.kt)("inlineCode",{parentName:"p"},'dataType: "binary"')," property:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="SheetJSAzure/function.json"',title:'"SheetJSAzure/function.json"'},'      "direction": "in",\n// highlight-next-line\n      "dataType": "binary",\n      "name": "req",\n')),(0,a.kt)("p",null,"4) Replace ",(0,a.kt)("inlineCode",{parentName:"p"},"SheetJSAzure/index.js")," with the following:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="SheetJSAzure/index.js"',title:'"SheetJSAzure/index.js"'},'/* sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */\nconst XLSX = require(\'xlsx\');\nconst formidable = require(\'formidable\');\nconst Readable = require(\'stream\').Readable;\n\n/* formidable expects the request object to be a stream */\nconst streamify = (req) => {\n    if(typeof req.on !== \'undefined\') return req;\n    const s = new Readable();\n    s._read = ()=>{};\n    s.push(Buffer.from(req.body));\n    s.push(null);\n    Object.assign(s, req);\n    return s;\n};\n\nmodule.exports = (context, req) => {\n  if(req.method == "POST") {\n    const form = new formidable.IncomingForm();\n    form.parse(streamify(req), (err, fields, files) => {\n      /* grab the first file */\n      var f = files["upload"];\n      if(!f) {\n        context.res = { status: 400, body: "Must submit a file for processing!" };\n      } else {\n        /* file is stored in a temp directory, so we can point to that and read it */\n        const wb = XLSX.read(f.filepath, {type:"file"});\n\n        /* generate CSV from first sheet */\n        const csv = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]);\n        context.res = { status: 200, body: csv };\n      }\n      context.done();\n    });\n  } else if(req.method == "GET") {\n    var ws = XLSX.utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);\n    var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Data");\n    var buf = XLSX.write(wb, {type: "buffer", bookType: "xlsx"});\n    context.res = {\n      status: 200,\n      headers: { "Content-Disposition": `attachment; filename="SheetJSAzure.xlsx";` },\n      body: buf\n    };\n    context.done();\n  } else {\n    context.res = { status: 500, body: `Unsupported method ${req.method}` };\n    context.done();\n  }\n};\n')),(0,a.kt)("p",null,"5) Test locally with ",(0,a.kt)("inlineCode",{parentName:"p"},"npm start")),(0,a.kt)("p",null,"To test uploads, download ",(0,a.kt)("a",{parentName:"p",href:"https://sheetjs.com/pres.numbers"},"https://sheetjs.com/pres.numbers")," and run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'curl -X POST -F "upload=@pres.numbers" http://localhost:7071/api/SheetJSAzure\n')),(0,a.kt)("p",null,"To test downloads, access http://localhost:7071/api/SheetJSAzure and download\nthe generated file.  Confirm it is a valid file."),(0,a.kt)("p",null,"6) Deploy to Azure.  Replace ",(0,a.kt)("inlineCode",{parentName:"p"},"NAME_OF_FUNCTION_APP")," with the name:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"func azure functionapp publish NAME_OF_FUNCTION_APP\n")),(0,a.kt)("p",null,"Get the function URL and test using the same sequence as in step 5.")),(0,a.kt)("h2",{id:"azure-blob-storage"},"Azure Blob Storage"),(0,a.kt)("p",null,"The main module for Azure Blob Storage is ",(0,a.kt)("inlineCode",{parentName:"p"},"@azure/storage-blob"),'. This example\nwas tested using the "Connection String" authentication method.  The strings\nare found in the Azure Portal under "Access Keys" for the storage account.'),(0,a.kt)("h3",{id:"reading-data-1"},"Reading Data"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"BlobClient#download")," method returns a Stream. After collecting into a\nBuffer, ",(0,a.kt)("inlineCode",{parentName:"p"},"XLSX.read")," can parse the data:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="SheetJSReadFromAzure.mjs"',title:'"SheetJSReadFromAzure.mjs"'},'import { BlobServiceClient } from "@azure/storage-blob";\nimport { read, utils } from "xlsx";\n\n/* replace these constants */\nconst connStr = "<REPLACE WITH CONNECTION STRING>";\nconst containerName = "<REPLACE WITH CONTAINER NAME>";\nconst blobName = "<REPLACE WITH BLOB NAME>";\n\n/* get a readable stream*/\nconst blobServiceClient = BlobServiceClient.fromConnectionString(connStr);\nconst containerClient = blobServiceClient.getContainerClient(containerName);\nconst blobClient = containerClient.getBlobClient(blobName);\nconst response = (await blobClient.download()).readableStreamBody;\n\n/* collect data into a Buffer */\nconst bufs = [];\nfor await(const buf of response) bufs.push(buf);\nconst downloaded = Buffer.concat(bufs);\n\n/* parse downloaded buffer */\nconst wb = read(downloaded);\n/* print first worksheet */\nconsole.log(utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));\n')),(0,a.kt)("h3",{id:"writing-data-1"},"Writing Data"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"BlockBlobClient#upload")," directly accepts a Buffer:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="SheetJSWriteToAzure.mjs"',title:'"SheetJSWriteToAzure.mjs"'},'import { BlobServiceClient } from "@azure/storage-blob";\nimport { read, utils } from "xlsx";\n\n/* replace these constants */\nconst connStr = "<REPLACE WITH CONNECTION STRING>";\nconst containerName = "<REPLACE WITH CONTAINER NAME>";\nconst blobName = "<REPLACE WITH BLOB NAME>";\n\n/* Create a simple workbook and write XLSX to buffer */\nconst ws = utils.aoa_to_sheet(["SheetJS".split(""), [5,4,3,3,7,9,5]]);\nconst wb = utils.book_new(); utils.book_append_sheet(wb, ws, "Sheet1");\nconst buf = write(wb, {type: "buffer", bookType: "xlsx"});\n\n/* upload buffer */\nconst blobServiceClient = BlobServiceClient.fromConnectionString(connStr);\nconst containerClient = blobServiceClient.getContainerClient(containerName);\nconst blockBlobClient = containerClient.getBlockBlobClient(blobName);\nconst uploadBlobResponse = await blockBlobClient.upload(buf, buf.length);\n')))}d.isMDXComponent=!0}}]);