"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8293],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=p(n),u=r,k=m["".concat(s,".").concat(u)]||m[u]||c[u]||i;return n?a.createElement(k,l(l({ref:t},d),{},{components:n})):a.createElement(k,l({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8025:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_position:26,title:"Local File Access"},l=void 0,o={unversionedId:"demos/localfile",id:"demos/localfile",title:"Local File Access",description:"Reading and writing files require native support.  readFile and writeFile",source:"@site/docs/03-demos/27-localfile.md",sourceDirName:"03-demos",slug:"/demos/localfile",permalink:"/docs/demos/localfile",draft:!1,tags:[],version:"current",sidebarPosition:26,frontMatter:{sidebar_position:26,title:"Local File Access"},sidebar:"tutorialSidebar",previous:{title:"Amazon Web Services",permalink:"/docs/demos/aws"},next:{title:"Data Import",permalink:"/docs/solutions/input"}},s={},p=[{value:"Binary Data",id:"binary-data",level:2},{value:"Web Workers",id:"web-workers",level:2},{value:"HTML5 Download Attribute",id:"html5-download-attribute",level:2},{value:"File API",id:"file-api",level:2},{value:"HTML Drag and Drop API",id:"html-drag-and-drop-api",level:2},{value:"File System Access API",id:"file-system-access-api",level:2},{value:"Demo",id:"demo",level:3},{value:"File and Directory Entries API",id:"file-and-directory-entries-api",level:2},{value:"Internet Explorer",id:"internet-explorer",level:2},{value:"Blob API",id:"blob-api",level:4},{value:"VBScript",id:"vbscript",level:4},{value:"Other Platforms",id:"other-platforms",level:2},{value:"NodeJS",id:"nodejs",level:3},{value:"Deno",id:"deno",level:3},{value:"Apps",id:"apps",level:3}],d={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Reading and writing files require native support.  ",(0,r.kt)("inlineCode",{parentName:"p"},"readFile")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"writeFile"),"\ninclude support for some approaches but do not support every API.  When an API\nis not supported by ",(0,r.kt)("inlineCode",{parentName:"p"},"readFile")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"writeFile"),", the underlying ",(0,r.kt)("inlineCode",{parentName:"p"},"read")," and\n",(0,r.kt)("inlineCode",{parentName:"p"},"write")," methods can be used."),(0,r.kt)("p",null,"This demo looks at various web APIs.  More specific approaches for deployments\nlike mobile apps are covered in their respective demos."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},'Some snippets are also available in the "Common Use Cases" section:'),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../solutions/input"},"Data Import")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../solutions/output"},"Data Export")))),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},'Not all web APIs are supported in all browsers.  For example, Firefox does not\nsupport the "File System Access API".'),(0,r.kt)("p",{parentName:"admonition"},"Even when a browser technically supports a web API, it may be disabled in the\nclient browser. Some APIs do not give any feedback.")),(0,r.kt)("h2",{id:"binary-data"},"Binary Data"),(0,r.kt)("p",null,"Modern browser APIs typically use typed arrays or ",(0,r.kt)("inlineCode",{parentName:"p"},"Blob")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"File")," structures."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Reading Binary Data")),(0,r.kt)("p",null,"Given a ",(0,r.kt)("inlineCode",{parentName:"p"},"Blob")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"File"),", the underlying data cannot be read synchronously!"),(0,r.kt)("p",null,"The callback-based approach uses a ",(0,r.kt)("inlineCode",{parentName:"p"},"FileReader"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const reader = new FileReader();\nreader.onload = function(e) {\n  /* e.target.result is an ArrayBuffer */\n  const wb = XLSX.read(e.target.result);\n  console.log(XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]));\n}\nreader.readAsArrayBuffer(file);\n")),(0,r.kt)("p",null,"The Promise-based approach uses ",(0,r.kt)("inlineCode",{parentName:"p"},"Blob#arrayBuffer"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// usage: const wb = await blob_to_wb(blob);\nasync function blob_to_wb(blob) {\n  return XLSX.read(await blob.arrayBuffer());\n}\n")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Writing Binary Data")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.write")," can generate ",(0,r.kt)("inlineCode",{parentName:"p"},"Uint8Array")," results by passing ",(0,r.kt)("inlineCode",{parentName:"p"},'type: "buffer"'),".  A\n",(0,r.kt)("inlineCode",{parentName:"p"},"Blob")," can be created by using the constructor:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const u8 = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });\nconst blob = new Blob([u8], { type: "application/vnd.ms-excel" });\n')),(0,r.kt)("h2",{id:"web-workers"},"Web Workers"),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("strong",{parentName:"p"},"None of the browser methods work from Web Worker contexts!")),(0,r.kt)("p",{parentName:"admonition"},"Data operations with the Web APIs must happen in the browser main thread.")),(0,r.kt)("p",null,"Web Workers and main thread can transfer ",(0,r.kt)("inlineCode",{parentName:"p"},"ArrayBuffer")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"Uint8Array")," objects."),(0,r.kt)("p",null,"When generating a file, the worker will call ",(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.write")," with type ",(0,r.kt)("inlineCode",{parentName:"p"},"buffer"),"\nand transfer the result to the main thread to initiate a download."),(0,r.kt)("p",null,"When parsing a file, the main thread will use the web API to read a ",(0,r.kt)("inlineCode",{parentName:"p"},"File")," or\n",(0,r.kt)("inlineCode",{parentName:"p"},"Blob"),", extract the underlying ",(0,r.kt)("inlineCode",{parentName:"p"},"ArrayBuffer")," and transfer to the Web Worker."),(0,r.kt)("h2",{id:"html5-download-attribute"},"HTML5 Download Attribute"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Writing Files")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"writeFile")," will attempt a download in the browser using the attribute."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'XLSX.writeFile(wb, "SheetJS.xlsx");\n')),(0,r.kt)("h2",{id:"file-api"},"File API"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Reading Files")),(0,r.kt)("p",null,"In the ",(0,r.kt)("inlineCode",{parentName:"p"},"change")," event of ",(0,r.kt)("inlineCode",{parentName:"p"},'<input type="file">'),", ",(0,r.kt)("inlineCode",{parentName:"p"},"target")," hold a list of files:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'async function handleFileAsync(e) {\n  /* get first file */\n  const file = e.target.files[0];\n  /* get raw data */\n  const data = await file.arrayBuffer();\n  /* data is an ArrayBuffer */\n  const workbook = XLSX.read(data);\n  /* do something with the workbook here */\n  console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))\n}\ninput_dom_element.addEventListener("change", handleFileAsync, false);\n')),(0,r.kt)("h2",{id:"html-drag-and-drop-api"},"HTML Drag and Drop API"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Reading Files")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"dataTransfer")," property of the ",(0,r.kt)("inlineCode",{parentName:"p"},"drop")," event holds a list of files:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'async function handleDropAsync(e) {\n  e.stopPropagation(); e.preventDefault();\n  /* get first file */\n  const f = e.dataTransfer.files[0];\n  /* get raw data */\n  const data = await f.arrayBuffer();\n  /* data is an ArrayBuffer */\n  const wb = XLSX.read(data);\n  /* do something with the workbook here */\n  console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))\n}\ndrop_dom_element.addEventListener("drop", handleDropAsync, false);\n')),(0,r.kt)("h2",{id:"file-system-access-api"},"File System Access API"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Reading Files")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"window.showOpenFilePicker")," shows a file picker and resolves to an array of\nfile handles. When ",(0,r.kt)("inlineCode",{parentName:"p"},"multiple: false")," is set, the array has one element."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"getFile")," method resolves to a ",(0,r.kt)("inlineCode",{parentName:"p"},"File")," object whose data can be read with\nthe ",(0,r.kt)("inlineCode",{parentName:"p"},"arrayBuffer")," method:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/* Show picker and get data */\nconst [hFile] = await window.showOpenFilePicker({\n  types: [{\n    description: 'Spreadsheets',\n    accept: { 'application/vnd.ms-excel': ['.xlsx', '.xls', '.xlsb', /*...*/] }\n  }],\n  excludeAcceptAllOption: true,\n  multiple: false\n});\nconst ab = await (await hFile.getFile()).arrayBuffer();\n\n/* parse */\nconst wb = XLSX.read(ab);\n\n/* do something with the workbook */\nconsole.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));\n")),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Writing Files")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"window.showSaveFilePicker")," shows a file picker and resolves to a file handle.\nThe ",(0,r.kt)("inlineCode",{parentName:"p"},"createWritable")," method resolves to a ",(0,r.kt)("inlineCode",{parentName:"p"},"FileSystemWritableFileStream"),", which\nreadily accepts ",(0,r.kt)("inlineCode",{parentName:"p"},"Uint8Array")," data from ",(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.write"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/* Show picker and get handle to file */\nconst hFile = await window.showSaveFilePicker({\n  suggestedName: \"SheetJS.xlsx\",\n  types: [\n    { description: 'Excel 2007+ (XLSX)', accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] } },\n    { description: 'Excel 97-2004 (XLS)', accept: { 'application/vnd.ms-excel': ['.xls'] } },\n    { description: 'Excel 2007+ Binary (XLSB)', accept: { 'application/vnd.ms-excel.sheet.binary.macroEnabled.12': ['.xlsb'] } },\n    /* note that each MIME type must be unique! */\n  ]\n});\nconst wstream = await hFile.createWritable();\n\n/* get extension */\nconst ext = hFile.name.slice(hFile.name.lastIndexOf(\".\")+1)\n/* write */\nwstream.write(XLSX.write(wb, { bookType: ext, type: \"buffer\" }))\n/* close stream to commit file */\nwstream.close();\n")),(0,r.kt)("h3",{id:"demo"},"Demo"),(0,r.kt)("details",null,(0,r.kt)("summary",null,(0,r.kt)("b",null,"Live Example")," (click to show) "),(0,r.kt)("p",null,"This live example reads a file then tries to save as XLSX."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function SheetJSRoundTripFileSystemAPI() { return ( <button onClick={async () => {\n  /* Show picker and get data */\n  const [rFile] = await window.showOpenFilePicker({\n    types: [{\n      description: 'Spreadsheets',\n      accept: { 'application/vnd.ms-excel': ['.xlsx', '.xls', '.xlsb', /*...*/] }\n    }],\n    excludeAcceptAllOption: true,\n    multiple: false\n  });\n  const ab = await (await rFile.getFile()).arrayBuffer();\n\n  /* parse */\n  const wb = XLSX.read(ab);\n\n  /* Show picker and get handle to file */\n  const wFile = await window.showSaveFilePicker({\n    suggestedName: \"SheetJSRT.xlsx\",\n    types: [ { description: 'XLSX', accept: { 'application/vnd.ms-excel': ['.xlsx'] } } ]\n  });\n  console.log(wFile);\n  const wstream = await wFile.createWritable();\n\n  /* write */\n  const buf = XLSX.write(wb, { bookType: \"xlsx\", type: \"buffer\" });\n  wstream.write(buf);\n\n  /* close stream to commit file */\n  wstream.close();\n\n}}>Click to read then save as XLSX</button> ) }\n"))),(0,r.kt)("h2",{id:"file-and-directory-entries-api"},"File and Directory Entries API"),(0,r.kt)("p",null,"In the web browser, the File and Directory Entries API does not project to the\nlocal file system. ",(0,r.kt)("inlineCode",{parentName:"p"},"cordova-plugin-file")," ",(0,r.kt)("em",{parentName:"p"},"does")," write to device in mobile apps!"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Writing Files")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'// Request File System Access\nwindow.requestFileSystem(window.PERSISTENT, 0, (fs) => {\n  // Request a handle to "SheetJS.xlsx", making a new file if necessary\n  fs.root.getFile("SheetJS.xlsx", {create: true}, entry => {\n    // Request a FileWriter for writing data\n    entry.createWriter(writer => {\n      // The FileWriter API needs an actual Blob\n      const u8 = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });\n      const data = new Blob([u8], { type: "application/vnd.ms-excel" });\n      // `onwriteend` is called on success, `onerror` called on error\n      writer.onwriteend = () => {}; writer.onerror = () => {};\n      // write the data\n      writer.write(data);\n    });\n  });\n});\n')),(0,r.kt)("h2",{id:"internet-explorer"},"Internet Explorer"),(0,r.kt)("p",null,"Internet Explorer offered proprietary APIs that were not adopted by Chromium."),(0,r.kt)("h4",{id:"blob-api"},"Blob API"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Writing Files")),(0,r.kt)("p",null,"IE10 and IE11 support ",(0,r.kt)("inlineCode",{parentName:"p"},"navigator.msSaveBlob"),". ",(0,r.kt)("inlineCode",{parentName:"p"},"writeFile")," will use the method."),(0,r.kt)("h4",{id:"vbscript"},"VBScript"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Reading and Writing Files")),(0,r.kt)("p",null,"Internet Explorer 6-9 with VBScript support ",(0,r.kt)("inlineCode",{parentName:"p"},"Scripting.FileSystemObject"),".  This\nis not supported in modern browsers."),(0,r.kt)("p",null,"This approach is implemented in the library ",(0,r.kt)("inlineCode",{parentName:"p"},"readFile")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"writeFile")," methods.\nIt requires the shim script to be loaded before the main library script:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- load the shim script first --\x3e\n<script src="shim.min.js"><\/script>\n\x3c!-- then load the main script --\x3e\n<script src="xlsx.full.min.js"><\/script>\n')),(0,r.kt)("h2",{id:"other-platforms"},"Other Platforms"),(0,r.kt)("h3",{id:"nodejs"},"NodeJS"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"fs.readFileSync")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"fs.writeFileSync")," allow for reading and writing files."),(0,r.kt)("p",null,"When using ",(0,r.kt)("inlineCode",{parentName:"p"},"require"),", these are supported in ",(0,r.kt)("inlineCode",{parentName:"p"},"readFile")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"writeFile"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'var XLSX = require("xlsx");\nvar wb = XLSX.readFile("sheetjs.numbers");\nXLSX.writeFile(wb, "sheetjs.xls");\n')),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../getting-started/installation/nodejs"},"Installation")," has a special note for\nuse with NodeJS ECMAScript Modules:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { readFile, writeFile, set_fs } from 'xlsx';\nimport * as fs from 'fs';\nset_fs(fs);\n\nvar wb = XLSX.readFile(\"sheetjs.numbers\");\nXLSX.writeFile(wb, \"sheetjs.xls\");\n")),(0,r.kt)("h3",{id:"deno"},"Deno"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Deno.readFileSync")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Deno.writeFileSync")," are supported by ",(0,r.kt)("inlineCode",{parentName:"p"},"readFile")," and\n",(0,r.kt)("inlineCode",{parentName:"p"},"writeFile")," out of the box:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'// @deno-types="https://cdn.sheetjs.com/xlsx-latest/package/types/index.d.ts"\nimport * as XLSX from \'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs\';\n\nconst wb = XLSX.readFile("sheetjs.numbers");\nXLSX.writeFile(wb, "sheetjs.xlsx");\n')),(0,r.kt)("h3",{id:"apps"},"Apps"),(0,r.kt)("p",null,"Desktop and mobile apps have their own specific APIs covered in separate demos:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./desktop"},"Electron and other desktop apps")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./mobile"},"React Native and other mobile apps"))))}c.isMDXComponent=!0}}]);