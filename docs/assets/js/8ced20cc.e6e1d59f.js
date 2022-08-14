"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7068],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=p(n),m=i,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||l;return n?a.createElement(h,r(r({ref:t},d),{},{components:n})):a.createElement(h,r({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,r=new Array(l);r[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var p=2;p<l;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},9594:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const l={sidebar_position:16,title:"Desktop Applications"},r=void 0,o={unversionedId:"demos/desktop",id:"demos/desktop",title:"Desktop Applications",description:"Web technologies like JavaScript and HTML have been adapted to the traditional",source:"@site/docs/03-demos/16-desktop.md",sourceDirName:"03-demos",slug:"/demos/desktop",permalink:"/docs/demos/desktop",draft:!1,tags:[],version:"current",sidebarPosition:16,frontMatter:{sidebar_position:16,title:"Desktop Applications"},sidebar:"tutorialSidebar",previous:{title:"Chrome Extensions",permalink:"/docs/demos/chromium"},next:{title:"Clipboard Data",permalink:"/docs/demos/clipboard"}},s={},p=[{value:"NW.js",id:"nwjs",level:2},{value:"Reading data",id:"reading-data",level:3},{value:"Writing data",id:"writing-data",level:3},{value:"Electron",id:"electron",level:2},{value:"Writing Files",id:"writing-files",level:3},{value:"Reading Files",id:"reading-files",level:3},{value:"Electron Breaking Changes",id:"electron-breaking-changes",level:3},{value:"Tauri",id:"tauri",level:2},{value:"Reading Files",id:"reading-files-1",level:3},{value:"Writing Files",id:"writing-files-1",level:3}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Web technologies like JavaScript and HTML have been adapted to the traditional\napp space.  Typically these frameworks bundle a JavaScript engine as well as a\nwindowing framework. SheetJS is compatible with many toolkits."),(0,i.kt)("h2",{id:"nwjs"},"NW.js"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"../getting-started/installation/standalone"},"Standalone scripts")," can be referenced in a\n",(0,i.kt)("inlineCode",{parentName:"p"},"SCRIPT")," tag from the entry point HTML page."),(0,i.kt)("p",null,"This demo was tested against NW.js 0.66.0."),(0,i.kt)("details",null,(0,i.kt)("summary",null,(0,i.kt)("b",null,"Complete Example")," (click to show)"),(0,i.kt)("p",null,"1) Create a ",(0,i.kt)("inlineCode",{parentName:"p"},"package.json")," file that specifies the entry point:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="package.json"',title:'"package.json"'},'{\n  "name": "sheetjs-nwjs",\n  "author": "sheetjs",\n  "version": "0.0.0",\n  "main": "index.html",\n  "dependencies": {\n    "nw": "~0.66.0",\n    "xlsx": "https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz"\n  }\n}\n')),(0,i.kt)("p",null,"2) Download ",(0,i.kt)("a",{parentName:"p",href:"pathname:///nwjs/index.html"},(0,i.kt)("inlineCode",{parentName:"a"},"index.html"))," into the same folder."),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},'Right-click the link and select "Save Link As...".  Left-clicking the link will\ntry to load the page in your browser.  The goal is to save the file contents.')),(0,i.kt)("p",null,"3) Run ",(0,i.kt)("inlineCode",{parentName:"p"},"npm install")," to install dependencies"),(0,i.kt)("p",null,"4) To verify the app works, run in the test environment:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"npx nw .\n")),(0,i.kt)("p",null,"The app will show and you should be able to verify reading and writing by using\nthe file input element to select a spreadsheet and clicking the export button."),(0,i.kt)("p",null,"5) To build a standalone app, run the builder:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"npx -p nw-builder nwbuild --mode=build .\n")),(0,i.kt)("p",null,"This will generate the standalone app in the ",(0,i.kt)("inlineCode",{parentName:"p"},"build\\sheetjs-nwjs\\")," folder.")),(0,i.kt)("h3",{id:"reading-data"},"Reading data"),(0,i.kt)("p",null,"The standard HTML5 ",(0,i.kt)("inlineCode",{parentName:"p"},"FileReader")," techniques from the browser apply to NW.js!"),(0,i.kt)("p",null,"NW.js handles the OS minutiae for dragging files into app windows.  The\n",(0,i.kt)("a",{parentName:"p",href:"../solutions/input#example-user-submissions"},"drag and drop snippet")," apply\nto DIV elements on the page."),(0,i.kt)("p",null,"Similarly, file input elements automatically map to standard Web APIs."),(0,i.kt)("p",null,"For example, assuming a file input element on the page:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<input type="file" name="xlfile" id="xlf" /> \n')),(0,i.kt)("p",null,"The event handler would process the event as if it were a web event:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'async function handleFile(e) {\n  const file = e.target.files[0];\n  const data = await file.arrayBuffer();\n  /* data is an ArrayBuffer */\n  const workbook = XLSX.read(data);\n\n  /* DO SOMETHING WITH workbook HERE */\n}\ndocument.getElementById("xlf").addEventListener("change", handleFile, false);\n')),(0,i.kt)("h3",{id:"writing-data"},"Writing data"),(0,i.kt)("p",null,"File input elements with the attribute ",(0,i.kt)("inlineCode",{parentName:"p"},"nwsaveas"),' show UI for saving a file. The\nstandard trick is to generate a hidden file input DOM element and "click" it.\nSince NW.js does not present a ',(0,i.kt)("inlineCode",{parentName:"p"},"writeFileSync")," in the ",(0,i.kt)("inlineCode",{parentName:"p"},"fs")," package, a manual\nstep is required:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"/* pre-build the hidden nwsaveas input element */\nvar input = document.createElement('input');\ninput.style.display = 'none';\ninput.setAttribute('nwsaveas', 'SheetJSNWDemo.xlsx');\ninput.setAttribute('type', 'file');\ndocument.body.appendChild(input);\n\n/* show a message if the save is canceled */\ninput.addEventListener('cancel',function(){ alert(\"Save was canceled!\"); });\n\n/* write to a file on the 'change' event */\ninput.addEventListener('change',function(e){\n  /* the `value` is the path that the program will write */\n  var filename = this.value;\n\n  /* use XLSX.write with type \"buffer\" to generate a buffer\" */\n  /* highlight-next-line */\n  var wbout = XLSX.write(workbook, {type:'buffer', bookType:\"xlsx\"});\n  /* highlight-next-line */\n  fs.writeFile(filename, wbout, function(err) {\n    if(!err) return alert(\"Saved to \" + filename);\n    alert(\"Error: \" + (err.message || err));\n  });\n});\n\ninput.click();\n")),(0,i.kt)("h2",{id:"electron"},"Electron"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"../getting-started/installation/nodejs"},"NodeJS Module")," can be imported from the main or\nthe renderer thread."),(0,i.kt)("p",null,"Electron presents a ",(0,i.kt)("inlineCode",{parentName:"p"},"fs")," module.  The ",(0,i.kt)("inlineCode",{parentName:"p"},"require('xlsx')")," call loads the CommonJS\nmodule, so ",(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.readFile")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.writeFile")," work in the renderer thread."),(0,i.kt)("p",null,"This demo was tested against Electron 19.0.5 on an Intel Mac (",(0,i.kt)("inlineCode",{parentName:"p"},"darwin-x64"),")."),(0,i.kt)("details",null,(0,i.kt)("summary",null,(0,i.kt)("b",null,"Complete Example")," (click to show)"),(0,i.kt)("p",null,"This demo includes a drag-and-drop box as well as a file input box, mirroring\nthe ",(0,i.kt)("a",{parentName:"p",href:"http://oss.sheetjs.com/sheetjs/"},"SheetJS Data Preview Live Demo")),(0,i.kt)("p",null,"The core data in this demo is an editable HTML table.  The readers build up the\ntable using ",(0,i.kt)("inlineCode",{parentName:"p"},"sheet_to_html")," (with ",(0,i.kt)("inlineCode",{parentName:"p"},"editable:true")," option) and the writers scrape\nthe table using ",(0,i.kt)("inlineCode",{parentName:"p"},"table_to_book"),"."),(0,i.kt)("p",null,"The demo project is wired for ",(0,i.kt)("inlineCode",{parentName:"p"},"electron-forge")," to build the standalone binary."),(0,i.kt)("p",null,"1) Download the demo files:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"pathname:///electron/package.json"},(0,i.kt)("inlineCode",{parentName:"a"},"package.json"))," : project structure"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"pathname:///electron/main.js"},(0,i.kt)("inlineCode",{parentName:"a"},"main.js"))," : entrypoint"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"pathname:///electron/index.html"},(0,i.kt)("inlineCode",{parentName:"a"},"index.html"))," : window page"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"pathname:///electron/index.js"},(0,i.kt)("inlineCode",{parentName:"a"},"index.js"))," : script loaded in render context")),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},'Right-click each link and select "Save Link As...".  Left-clicking a link will\ntry to load the page in your browser.  The goal is to save the file contents.')),(0,i.kt)("p",null,"2) Run ",(0,i.kt)("inlineCode",{parentName:"p"},"npm install")," to install dependencies."),(0,i.kt)("p",null,"3) To verify the app works, run in the test environment:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npx -y electron .\n")),(0,i.kt)("p",null,"The app will show and you should be able to verify reading and writing by using\nthe relevant buttons to open files and clicking the export button."),(0,i.kt)("p",null,"4) To build a standalone app, run the builder:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm run make\n")),(0,i.kt)("p",null,"This will generate the standalone app in the ",(0,i.kt)("inlineCode",{parentName:"p"},"out\\sheetjs-electron-...")," folder.\nFor a recent Intel Mac, the path will be ",(0,i.kt)("inlineCode",{parentName:"p"},"out/sheetjs-electron-darwin-x64/"))),(0,i.kt)("h3",{id:"writing-files"},"Writing Files"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../api/write-options"},(0,i.kt)("inlineCode",{parentName:"a"},"XLSX.writeFile"))," writes workbooks to the filesystem.\n",(0,i.kt)("inlineCode",{parentName:"p"},"showSaveDialog")," shows a Save As dialog and returns the selected file name:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'/* from the renderer thread */\nconst electron = require(\'@electron/remote\');\n\n/* this function will show the save dialog and try to write the workbook */\nasync function exportFile(workbook) {\n  /* show Save As dialog */\n  const result = await electron.dialog.showSaveDialog({\n    title: \'Save file as\',\n    filters: [{\n      name: "Spreadsheets",\n      extensions: ["xlsx", "xls", "xlsb", /* ... other formats ... */]\n    }]\n  });\n  /* write file */\n  // highlight-next-line\n  XLSX.writeFile(workbook, result.filePath);\n}\n')),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"In older versions of Electron, ",(0,i.kt)("inlineCode",{parentName:"p"},"showSaveDialog")," returned the path directly:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-js"},"var dialog = require('electron').remote.dialog;\n\nfunction exportFile(workbook) {\n  var result = dialog.showSaveDialog();\n  XLSX.writeFile(workbook, result);\n}\n"))),(0,i.kt)("h3",{id:"reading-files"},"Reading Files"),(0,i.kt)("p",null,"Electron offers 3 different ways to read files, two of which use Web APIs."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"File Input Element")),(0,i.kt)("p",null,"File input elements automatically map to standard Web APIs."),(0,i.kt)("p",null,"For example, assuming a file input element on the page:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<input type="file" name="xlfile" id="xlf" /> \n')),(0,i.kt)("p",null,"The event handler would process the event as if it were a web event:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'async function handleFile(e) {\n  const file = e.target.files[0];\n  const data = await file.arrayBuffer();\n  /* data is an ArrayBuffer */\n  const workbook = XLSX.read(data);\n\n  /* DO SOMETHING WITH workbook HERE */\n}\ndocument.getElementById("xlf").addEventListener("change", handleFile, false);\n')),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Drag and Drop")),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"../solutions/input#example-user-submissions"},"drag and drop snippet"),"\napplies to DIV elements on the page."),(0,i.kt)("p",null,"For example, assuming a DIV on the page:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<div id="drop">Drop a spreadsheet file here to see sheet data</div>\n')),(0,i.kt)("p",null,"The event handler would process the event as if it were a web event:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'async function handleDrop(e) {\n  e.stopPropagation();\n  e.preventDefault();\n\n  const file = e.dataTransfer.files[0];\n  const data = await file.arrayBuffer();\n  /* data is an ArrayBuffer */\n  const workbook = XLSX.read(data);\n\n  /* DO SOMETHING WITH workbook HERE */\n}\ndocument.getElementById("drop").addEventListener("drop", handleDrop, false);\n')),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Electron API")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"../api/parse-options"},(0,i.kt)("inlineCode",{parentName:"a"},"XLSX.readFile"))," reads workbooks from the filesystem.\n",(0,i.kt)("inlineCode",{parentName:"p"},"showOpenDialog")," shows a Save As dialog and returns the selected file name.\nUnlike the Web APIs, the ",(0,i.kt)("inlineCode",{parentName:"p"},"showOpenDialog")," flow can be initiated by app code:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'/* from the renderer thread */\nconst electron = require(\'@electron/remote\');\n\n/* this function will show the open dialog and try to parse the workbook */\nasync function importFile() {\n  /* show Save As dialog */\n  const result = await electron.dialog.showOpenDialog({\n    title: \'Select a file\',\n    filters: [{\n      name: "Spreadsheets",\n      extensions: ["xlsx", "xls", "xlsb", /* ... other formats ... */]\n    }]\n  });\n  /* result.filePaths is an array of selected files */\n  if(result.filePaths.length == 0) throw new Error("No file was selected!");\n  // highlight-next-line\n  return XLSX.readFile(result.filePaths[0]);\n}\n')),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"In older versions of Electron, ",(0,i.kt)("inlineCode",{parentName:"p"},"showOpenDialog")," returned the path directly:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-js"},"var dialog = require('electron').remote.dialog;\n\nfunction importFile(workbook) {\n  var result = dialog.showOpenDialog({ properties: ['openFile'] });\n  return XLSX.readFile(result[0]);\n}\n"))),(0,i.kt)("h3",{id:"electron-breaking-changes"},"Electron Breaking Changes"),(0,i.kt)("p",null,"The first version of this demo used Electron 1.7.5.  The current demo includes\nthe required changes for Electron 19.0.5."),(0,i.kt)("p",null,"There are no Electron-specific workarounds in the library, but Electron broke\nbackwards compatibility multiple times.  A summary of changes is noted below."),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Electron 6.x changed the ",(0,i.kt)("inlineCode",{parentName:"p"},"dialog")," API. Methods like ",(0,i.kt)("inlineCode",{parentName:"p"},"showSaveDialog")," originally\nreturned an array of strings, but now returns a ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),".  This change was not\ndocumented. ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/electron/electron/issues/24438"},"Electron issue")),(0,i.kt)("p",{parentName:"admonition"},"Electron 9.0.0 and later require the preference ",(0,i.kt)("inlineCode",{parentName:"p"},"nodeIntegration: true")," in order\nto ",(0,i.kt)("inlineCode",{parentName:"p"},"require('xlsx')")," in the renderer process."),(0,i.kt)("p",{parentName:"admonition"},"Electron 12.0.0 and later also require ",(0,i.kt)("inlineCode",{parentName:"p"},"worldSafeExecuteJavascript: true")," and\n",(0,i.kt)("inlineCode",{parentName:"p"},"contextIsolation: true"),"."),(0,i.kt)("p",{parentName:"admonition"},"Electron 14+ must use ",(0,i.kt)("inlineCode",{parentName:"p"},"@electron/remote")," instead of ",(0,i.kt)("inlineCode",{parentName:"p"},"remote"),".  An ",(0,i.kt)("inlineCode",{parentName:"p"},"initialize"),"\ncall is required to enable DevTools in the window.")),(0,i.kt)("h2",{id:"tauri"},"Tauri"),(0,i.kt)("p",null,"The ",(0,i.kt)("a",{parentName:"p",href:"../getting-started/installation/nodejs"},"NodeJS Module")," can be imported\nfrom frontend code."),(0,i.kt)("p",null,"This demo was tested against Tauri 1.0.5 on 2022 August 13."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Tauri currently does not provide NodeJS-esque ",(0,i.kt)("inlineCode",{parentName:"p"},"fs")," wrapper functions.  The raw\n",(0,i.kt)("inlineCode",{parentName:"p"},"@tauri-apps/api")," methods used in the examples are not expected to change.")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"http")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"dialog")," must be explicitly allowed in ",(0,i.kt)("inlineCode",{parentName:"p"},"tauri.conf.json"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="tauri.conf.json"',title:'"tauri.conf.json"'},'    "allowlist": {\n      "all": true,\n      "http": {\n        "all": true,\n        "request": true,\n        "scope": ["https://**"]\n      },\n      "dialog": {\n        "all": true\n      }\n')),(0,i.kt)("p",null,'The "Complete Example" creates an app that looks like the screenshot:'),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"/tauri/macos.png",alt:"SheetJS Tauri MacOS screenshot"})),(0,i.kt)("details",null,(0,i.kt)("summary",null,(0,i.kt)("b",null,"Complete Example")," (click to show)"),(0,i.kt)("p",null,"0) ",(0,i.kt)("a",{parentName:"p",href:"https://tauri.app/v1/guides/getting-started/prerequisites"},'Read Tauri "Getting Started" guide and install dependencies.')),(0,i.kt)("p",null,"1) Create a new Tauri app:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm create tauri-app\n")),(0,i.kt)("p",null,"When prompted:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"App Name: ",(0,i.kt)("inlineCode",{parentName:"li"},"SheetJSTauri")),(0,i.kt)("li",{parentName:"ul"},"Window Title: ",(0,i.kt)("inlineCode",{parentName:"li"},"SheetJS + Tauri")),(0,i.kt)("li",{parentName:"ul"},"UI recipe: ",(0,i.kt)("inlineCode",{parentName:"li"},"create-vite")),(0,i.kt)("li",{parentName:"ul"},'Add "@tauri-apps/api": ',(0,i.kt)("inlineCode",{parentName:"li"},"Y")),(0,i.kt)("li",{parentName:"ul"},"Vite template: ",(0,i.kt)("inlineCode",{parentName:"li"},"vue-ts"))),(0,i.kt)("p",null,"2) Enter the directory:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd SheetJSTauri\n")),(0,i.kt)("p",null,"Open ",(0,i.kt)("inlineCode",{parentName:"p"},"package.json")," with a text editor and add the highlighted lines:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="package.json"',title:'"package.json"'},'{\n  "name": "SheetJSTauri",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vue-tsc --noEmit && vite build",\n    "preview": "vite preview",\n    "tauri": "tauri"\n  },\n  "dependencies": {\n// highlight-next-line\n    "@tauri-apps/api": "^1.0.2",\n    "vue": "^3.2.37",\n// highlight-next-line\n    "xlsx": "https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz"\n  },\n  "devDependencies": {\n// highlight-next-line\n    "@tauri-apps/cli": "^1.0.5",\n    "@vitejs/plugin-vue": "^3.0.3",\n    "typescript": "^4.6.4",\n    "vite": "^3.0.7",\n    "vue-tsc": "^0.39.5"\n  }\n}\n')),(0,i.kt)("p",null,"3) Install dependencies:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz\n")),(0,i.kt)("p",null,"4) Enable operations by adding the highlighted lines to ",(0,i.kt)("inlineCode",{parentName:"p"},"tauri.conf.json"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="src-tauri/tauri.conf.json"',title:'"src-tauri/tauri.conf.json"'},'  "tauri": {\n    "allowlist": {\n// highlight-start\n      "http": {\n        "all": true,\n        "request": true,\n        "scope": ["https://**"]\n      },\n      "dialog": {\n        "all": true\n      },\n// highlight-end\n      "all": true\n    }\n')),(0,i.kt)("p",null,"In the same file, look for the ",(0,i.kt)("inlineCode",{parentName:"p"},'"identifier"')," key and replace the value with ",(0,i.kt)("inlineCode",{parentName:"p"},"com.sheetjs.tauri"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="src-tauri/tauri.conf.json"',title:'"src-tauri/tauri.conf.json"'},'        "icons/icon.ico"\n      ],\n      // highlight-next-line\n      "identifier": "com.sheetjs.tauri",\n      "longDescription": "",\n')),(0,i.kt)("p",null,"5) Download ",(0,i.kt)("a",{parentName:"p",href:"pathname:///tauri/App.vue"},(0,i.kt)("inlineCode",{parentName:"a"},"App.vue"))," and replace ",(0,i.kt)("inlineCode",{parentName:"p"},"src/App.vue"),"\nwith the downloaded script."),(0,i.kt)("p",null,"6) Build the app with"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm run tauri build\n")),(0,i.kt)("p",null,"At the end, it will print the path to the generated program. Run the program!")),(0,i.kt)("h3",{id:"reading-files-1"},"Reading Files"),(0,i.kt)("p",null,"There are two steps to reading files: obtaining a path and reading binary data:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { read } from \'xlsx\';\nimport { open } from \'@tauri-apps/api/dialog\';\nimport { readBinaryFile } from \'@tauri-apps/api/fs\';\n\nconst filters = [\n  {name: "Excel Binary Workbook", extensions: ["xlsb"]},\n  {name: "Excel Workbook", extensions: ["xlsx"]},\n  {name: "Excel 97-2004 Workbook", extensions: ["xls"]},\n  // ... other desired formats ...\n];\n\nasync function openFile() {\n  /* show open file dialog */\n  const selected = await open({\n    title: "Open Spreadsheet",\n    multiple: false,\n    directory: false,\n    filters\n  });\n\n  /* read data into a Uint8Array */\n  const d = await readBinaryFile(selected);\n\n  /* parse with SheetJS */\n  const wb = read(d);\n  return wb;\n}\n')),(0,i.kt)("h3",{id:"writing-files-1"},"Writing Files"),(0,i.kt)("p",null,"There are two steps to writing files: obtaining a path and writing binary data:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'import { read } from \'xlsx\';\nimport { save } from \'@tauri-apps/api/dialog\';\nimport { writeBinaryFile } from \'@tauri-apps/api/fs\';\n\nconst filters = [\n  {name: "Excel Binary Workbook", extensions: ["xlsb"]},\n  {name: "Excel Workbook", extensions: ["xlsx"]},\n  {name: "Excel 97-2004 Workbook", extensions: ["xls"]},\n  // ... other desired formats ...\n];\n\nasync function saveFile() {\n  /* show save file dialog */\n  const selected = await save({\n    title: "Save to Spreadsheet",\n    filters\n  });\n\n  /* Generate workbook */\n  const bookType = selected.slice(selected.lastIndexOf(".") + 1);\n  const d = write(wb, {type: "buffer", bookType});\n\n  /* save data to file */\n  await writeBinaryFile(selected, d);\n}\n')))}u.isMDXComponent=!0}}]);