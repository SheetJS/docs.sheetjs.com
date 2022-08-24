"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3903],{9613:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),d=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=d(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||o;return n?a.createElement(h,s(s({ref:t},p),{},{components:n})):a.createElement(h,s({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var d=2;d<o;d++)s[d]=n[d];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5127:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return i},metadata:function(){return d},toc:function(){return c}});var a=n(2848),r=n(9213),o=(n(9496),n(9613)),s=["components"],i={sidebar_position:14,title:"Data Grids and UI"},l=void 0,d={unversionedId:"demos/grid",id:"demos/grid",title:"Data Grids and UI",description:"Various JavaScript UI components provide a more interactive editing experience.",source:"@site/docs/03-demos/14-grid.md",sourceDirName:"03-demos",slug:"/demos/grid",permalink:"/docs/demos/grid",draft:!1,tags:[],version:"current",sidebarPosition:14,frontMatter:{sidebar_position:14,title:"Data Grids and UI"},sidebar:"tutorialSidebar",previous:{title:"Command-Line Tools",permalink:"/docs/demos/cli"},next:{title:"Chrome Extensions",permalink:"/docs/demos/chromium"}},p={},c=[{value:"Managed Lifecycle",id:"managed-lifecycle",level:2},{value:"Tabulator",id:"tabulator",level:3},{value:"x-spreadsheet",id:"x-spreadsheet",level:3},{value:"Canvas DataGrid",id:"canvas-datagrid",level:3},{value:"Angular UI Grid",id:"angular-ui-grid",level:3},{value:"Framework Lifecycle",id:"framework-lifecycle",level:2},{value:"React Data Grid",id:"react-data-grid",level:3},{value:"Rows and Columns state",id:"rows-and-columns-state",level:4},{value:"RDG Demo",id:"rdg-demo",level:4},{value:"vue3-table-lite",id:"vue3-table-lite",level:3},{value:"Rows and Columns Bindings",id:"rows-and-columns-bindings",level:4},{value:"VTE Demo",id:"vte-demo",level:4}],u={toc:c};function m(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Various JavaScript UI components provide a more interactive editing experience.\nMost are able to interchange with arrays of arrays or arrays of data objects.\nThis demo focuses on a few open source data grids."),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("a",{parentName:"p",href:"https://sheetjs.com/pro"},"SheetJS Pro")," offers additional features like styling\nand images. The UI tools typically support many of these advanced features."),(0,o.kt)("p",{parentName:"div"},"To eliminate any confusion, the live examples linked from this page demonstrate\nSheetJS Community Edition data interchange."))),(0,o.kt)("h2",{id:"managed-lifecycle"},"Managed Lifecycle"),(0,o.kt)("p",null,"Many UI components tend to manage the entire lifecycle, providing methods to\nimport and export data."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"sheet_to_json")," utility function generates arrays of objects, which is\nsuitable for a number of libraries.  When more advanced shapes are needed,\nit is easier to munge the output of an array of arrays."),(0,o.kt)("h3",{id:"tabulator"},"Tabulator"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"http://tabulator.info/docs/5.3/download#xlsx"},"Tabulator")," includes deep support\nthrough a special Export button.  It handles the SheetJS-related operations."),(0,o.kt)("h3",{id:"x-spreadsheet"},"x-spreadsheet"),(0,o.kt)("p",null,"With a familiar UI, ",(0,o.kt)("a",{parentName:"p",href:"https://myliang.github.io/x-spreadsheet/"},(0,o.kt)("inlineCode",{parentName:"a"},"x-spreadsheet")),"\nis an excellent choice for developers looking for a modern editor."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"pathname:///xspreadsheet/"},"Click here for a live integration demo.")),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("b",null,"Full Exposition")," (click to show)"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Obtaining the Library")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"x-data-spreadsheet")," NodeJS packages include a minified script that can be\ndirectly inserted as a script tag.  The unpkg CDN also serves this script:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- x-spreadsheet stylesheet --\x3e\n<link rel="stylesheet" href="https://unpkg.com/x-data-spreadsheet/dist/xspreadsheet.css"/>\n\x3c!-- x-spreadsheet library --\x3e\n<script src="https://unpkg.com/x-data-spreadsheet/dist/xspreadsheet.js"><\/script>\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Previewing and Editing Data")),(0,o.kt)("p",null,"The HTML document needs a container element:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<div id="gridctr"></div>\n')),(0,o.kt)("p",null,"Grid initialization is a one-liner:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'var grid = x_spreadsheet(document.getElementById("gridctr"));\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"x-spreadsheet")," handles the entire edit cycle. No intervention is necessary."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"SheetJS and x-spreadsheet")),(0,o.kt)("p",null,"The integration library can be downloaded from the SheetJS CDN:"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://cdn.sheetjs.com/xspreadsheet/xlsxspread.js"},"Development Use")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://cdn.sheetjs.com/xspreadsheet/xlsxspread.min.js"},"Production Use")),(0,o.kt)("p",null,"When used in a browser tag, it exposes two functions: ",(0,o.kt)("inlineCode",{parentName:"p"},"xtos")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"stox"),"."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"stox(worksheet)")," returns a data structure suitable for ",(0,o.kt)("inlineCode",{parentName:"li"},"grid.loadData")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"xtos(data)")," accepts the result of ",(0,o.kt)("inlineCode",{parentName:"li"},"grid.getData")," and generates a workbook")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Reading Data")),(0,o.kt)("p",null,"The following snippet fetches a spreadsheet and loads the grid:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'(async() => {\n  const ab = await (await fetch("https://sheetjs.com/pres.numbers")).arrayBuffer();\n  grid.loadData(stox(XLSX.read(ab)));\n})();\n')),(0,o.kt)("p",null,"The same pattern can be used in file input elements and other data sources."),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Writing Data")),(0,o.kt)("p",null,"The following snippet exports the grid data to a file:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'/* build workbook from the grid data */\nXLSX.writeFile(xtos(grid.getData()), "SheetJS.xlsx");\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Additional Features")),(0,o.kt)("p",null,"This demo barely scratches the surface.  The underlying grid component includes\nmany additional features that work with ",(0,o.kt)("a",{parentName:"p",href:"https://sheetjs.com/pro"},"SheetJS Pro"),".")),(0,o.kt)("h3",{id:"canvas-datagrid"},"Canvas DataGrid"),(0,o.kt)("p",null,"After extensive testing, ",(0,o.kt)("a",{parentName:"p",href:"https://canvas-datagrid.js.org/demo.html"},(0,o.kt)("inlineCode",{parentName:"a"},"canvas-datagrid")),"\nstood out as a very high-performance grid with an incredibly simple API."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"pathname:///cdg/index.html"},"Click here for a live integration demo.")),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("b",null,"Full Exposition")," (click to show)"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Obtaining the Library")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"canvas-datagrid")," NodeJS packages include a minified script that can be\ndirectly inserted as a script tag.  The unpkg CDN also serves this script:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<script src="https://unpkg.com/canvas-datagrid/dist/canvas-datagrid.js"><\/script>\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Previewing Data")),(0,o.kt)("p",null,"The HTML document needs a container element:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<div id="gridctr"></div>\n')),(0,o.kt)("p",null,"Grid initialization is a one-liner:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var grid = canvasDatagrid({\n  parentNode: document.getElementById('gridctr'),\n  data: []\n});\n")),(0,o.kt)("p",null,"For large data sets, it's necessary to constrain the size of the grid."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"grid.style.height = '100%';\ngrid.style.width = '100%';\n")),(0,o.kt)("p",null,"Once the workbook is read and the worksheet is selected, assigning the data\nvariable automatically updates the view:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"grid.data = XLSX.utils.sheet_to_json(ws, {header:1});\n")),(0,o.kt)("p",null,"This demo previews the first worksheet."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Editing")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"canvas-datagrid")," handles the entire edit cycle.  No intervention is necessary."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Saving Data")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"grid.data")," is immediately readable and can be converted back to a worksheet.\nSome versions return an array-like object without the length, so a little bit of\npreparation may be needed:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"/* converts an array of array-like objects into an array of arrays */\nfunction prep(arr) {\n  var out = [];\n  for(var i = 0; i < arr.length; ++i) {\n    if(!arr[i]) continue;\n    if(Array.isArray(arr[i])) { out[i] = arr[i]; continue };\n    var o = new Array();\n    Object.keys(arr[i]).forEach(function(k) { o[+k] = arr[i][k] });\n    out[i] = o;\n  }\n  return out;\n}\n\n/* build worksheet from the grid data */\nvar ws = XLSX.utils.aoa_to_sheet(prep(grid.data));\n\n/* build up workbook */\nvar wb = XLSX.utils.book_new();\nXLSX.utils.book_append_sheet(wb, ws, 'SheetJS');\n\n/* generate download */\nXLSX.writeFile(wb, \"SheetJS.xlsx\");\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Additional Features")),(0,o.kt)("p",null,"This demo barely scratches the surface.  The underlying grid component includes\nmany additional features including massive data streaming, sorting and styling.")),(0,o.kt)("h3",{id:"angular-ui-grid"},"Angular UI Grid"),(0,o.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This UI Grid is for AngularJS, not the modern Angular.  New projects should not\nuse AngularJS.  This demo is included for legacy applications."),(0,o.kt)("p",{parentName:"div"},"The ",(0,o.kt)("a",{parentName:"p",href:"./legacy#angularjs"},"AngularJS demo")," covers more general strategies."))),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"pathname:///angularjs/ui-grid.html"},"Click here for a live integration demo.")),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("b",null,"Notes")," (click to show)"),(0,o.kt)("p",null,"The library does not provide any way to modify the import button, so the demo\nincludes a simple directive for a HTML File Input control.  It also includes a\nsample service for export which adds an item to the export menu."),(0,o.kt)("p",null,"The demo ",(0,o.kt)("inlineCode",{parentName:"p"},"SheetJSImportDirective")," follows the prescription from the README for\nFile input controls using ",(0,o.kt)("inlineCode",{parentName:"p"},"readAsArrayBuffer"),", converting to a suitable\nrepresentation and updating the scope."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"SheetJSExportService")," exposes export functions for ",(0,o.kt)("inlineCode",{parentName:"p"},"XLSB")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"XLSX"),".  Other\nfile formats can be exported by changing the ",(0,o.kt)("inlineCode",{parentName:"p"},"bookType")," variable.  It grabs\nvalues from the grid, builds an array of arrays, generates a workbook and forces\na download.  By setting the ",(0,o.kt)("inlineCode",{parentName:"p"},"filename")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"sheetname")," options in the ",(0,o.kt)("inlineCode",{parentName:"p"},"ui-grid"),"\noptions, the output can be controlled.")),(0,o.kt)("h2",{id:"framework-lifecycle"},"Framework Lifecycle"),(0,o.kt)("p",null,"For modern frameworks like React, data grids tend to follow the framework state\nand idioms.  The same ",(0,o.kt)("inlineCode",{parentName:"p"},"sheet_to_json")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"json_to_sheet")," / ",(0,o.kt)("inlineCode",{parentName:"p"},"aoa_to_sheet"),"\nmethods are used, but they pull from a shared state object that can be mutated\nwith other buttons and components on the page."),(0,o.kt)("h3",{id:"react-data-grid"},"React Data Grid"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This demo was tested against ",(0,o.kt)("inlineCode",{parentName:"p"},"react-data-grid 7.0.0-beta.15"),", React 18.2.0,\nand ",(0,o.kt)("inlineCode",{parentName:"p"},"create-react-app")," 5.0.1 on 2022 August 16."))),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/adazzle/react-data-grid"},(0,o.kt)("inlineCode",{parentName:"a"},"react-data-grid"))," is a data grid\nbuilt for React. ",(0,o.kt)("inlineCode",{parentName:"p"},"react-data-grid")," powers ",(0,o.kt)("a",{parentName:"p",href:"https://sheet.js.org/"},"https://sheet.js.org/")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"#rdg-demo"},"A complete example is included below.")),(0,o.kt)("h4",{id:"rows-and-columns-state"},"Rows and Columns state"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"react-data-grid")," state consists of an Array of column metadata and an Array of\nrow objects. Typically both are defined in state:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'import DataGrid, { Column } from "react-data-grid";\n\nexport default function App() {\n  const [rows, setRows] = useState([]);\n  const [columns, setColumns] = useState([]);\n\n  return ( <DataGrid columns={columns} rows={rows} onRowsChange={setRows} /> );\n}\n')),(0,o.kt)("p",null,"The most generic data representation is an array of arrays. To sate the grid,\nthe columns must be objects whose ",(0,o.kt)("inlineCode",{parentName:"p"},"key")," property is the stringified number:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { WorkSheet, utils } from \'xlsx\';\nimport { textEditor, Column } from "react-data-grid";\n\ntype Row = any[];\ntype AOAColumn = Column<Row>;\ntype RowCol = { rows: Row[]; columns: AOAColumn[]; };\n\nfunction ws_to_rdg(ws: WorkSheet): RowCol {\n  /* create an array of arrays */\n  const rows = utils.sheet_to_json(ws, { header: 1 });\n\n  /* create column array */\n  const range = utils.decode_range(ws["!ref"]||"A1");\n  const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({\n    key: String(i), // RDG will access row["0"], row["1"], etc\n    name: utils.encode_col(i), // the column labels will be A, B, etc\n    editor: textEditor // enable cell editing\n  }));\n\n  return { rows, columns }; // these can be fed to setRows / setColumns\n}\n')),(0,o.kt)("p",null,"In the other direction, a worksheet can be generated with ",(0,o.kt)("inlineCode",{parentName:"p"},"aoa_to_sheet"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import { WorkSheet, utils } from 'xlsx';\n\ntype Row = any[];\n\nfunction rdg_to_ws(rows: Row[]): WorkSheet {\n  return utils.aoa_to_sheet(rows);\n}\n")),(0,o.kt)("h4",{id:"rdg-demo"},"RDG Demo"),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("b",null,"Complete Example")," (click to show)"),(0,o.kt)("p",null,"1) Create a new TypeScript CRA app:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npx create-react-app sheetjs-cra --template typescript\ncd sheetjs-cra\n")),(0,o.kt)("p",null,"2) Install dependencies:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm i -S https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz react-data-grid\n")),(0,o.kt)("p",null,"3) Replace the contents of ",(0,o.kt)("inlineCode",{parentName:"p"},"src/App.tsx")," with the following code.  Note: a copy\nto clipboard button will show up if you move your mouse over the code.  The\nnotable SheetJS-specific code is highlighted below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/App.tsx"',title:'"src/App.tsx"'},'import React, { useEffect, useState, ChangeEvent } from "react";\nimport DataGrid, { textEditor, Column } from "react-data-grid";\nimport { read, utils, WorkSheet, writeFile } from "xlsx";\n\nimport \'./App.css\';\n\ntype DataSet = { [index: string]: WorkSheet; };\ntype Row = any[];\ntype AOAColumn = Column<Row>;\ntype RowCol = { rows: Row[]; columns: AOAColumn[]; };\n\n/* this method returns `rows` and `columns` data for sheet change */\nconst getRowsCols = ( data: DataSet, sheetName: string ): RowCol => ({\n  rows: utils.sheet_to_json<Row>(data[sheetName], {header:1}),\n  columns: Array.from({\n    length: utils.decode_range(data[sheetName]["!ref"]||"A1").e.c + 1\n  }, (_, i) => ({ key: String(i), name: utils.encode_col(i), editor: textEditor }))\n});\n\nexport default function App() {\n  const [rows, setRows] = useState<Row[]>([]); // data rows\n  const [columns, setColumns] = useState<AOAColumn[]>([]); // columns\n  const [workBook, setWorkBook] = useState<DataSet>({} as DataSet); // workbook\n  const [sheets, setSheets] = useState<string[]>([]); // list of sheet names\n  const [current, setCurrent] = useState<string>(""); // selected sheet\n\n  /* called when sheet dropdown is changed */\n  function selectSheet(name: string) {\n    // highlight-start\n    /* update workbook cache in case the current worksheet was changed */\n    workBook[current] = utils.aoa_to_sheet(rows);\n    // highlight-end\n\n    /* get data for desired sheet and update state */\n    const { rows: new_rows, columns: new_columns } = getRowsCols(workBook, name);\n    setRows(new_rows);\n    setColumns(new_columns);\n    setCurrent(name);\n  }\n\n  /* this method handles refreshing the state with new workbook data */\n  async function handleAB(file: ArrayBuffer): Promise<void> {\n    // highlight-start\n    /* read file data */\n    const data = read(file);\n    // highlight-end\n\n    /* update workbook state */\n    setWorkBook(data.Sheets);\n    setSheets(data.SheetNames);\n\n    /* select the first worksheet */\n    const name = data.SheetNames[0];\n    const { rows: new_rows, columns: new_columns } = getRowsCols(data.Sheets, name);\n    setRows(new_rows);\n    setColumns(new_columns);\n    setCurrent(name);\n  }\n\n  /* called when file input element is used to select a new file */\n  async function handleFile(ev: ChangeEvent<HTMLInputElement>): Promise<void> {\n    const file = await ev.target.files?.[0]?.arrayBuffer();\n    if(file) await handleAB(file);\n  }\n\n  /* when page is loaded, fetch and processs worksheet */\n  useEffect(() => { (async () => {\n      const f = await fetch("https://sheetjs.com/pres.numbers");\n      await handleAB(await f.arrayBuffer());\n  })(); }, []);\n\n  /* method is called when one of the save buttons is clicked */\n  function saveFile(ext: string): void {\n    /* update current worksheet in case changes were made */\n    workBook[current] = utils.aoa_to_sheet(rows);\n\n    // highlight-start\n    /* construct workbook and loop through worksheets */\n    const wb = utils.book_new();\n    sheets.forEach((n) => { utils.book_append_sheet(wb, workBook[n], n); });\n    // highlight-end\n\n    /* generate a file and download it */\n    writeFile(wb, "sheet." + ext);\n  }\n\n  return (\n    <>\n      <h3>SheetJS \xd7 React-Data-Grid Demo</h3>\n      <input type="file" onChange={handleFile} />\n      {sheets.length > 0 && ( <>\n        <p>Use the dropdown to switch to a worksheet:&nbsp;\n          <select onChange={async (e) => selectSheet(sheets[+(e.target.value)])}>\n            {sheets.map((sheet, idx) => (<option key={sheet} value={idx}>{sheet}</option>))}\n          </select>\n        </p>\n        <div className="flex-cont"><b>Current Sheet: {current}</b></div>\n        <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />\n        <p>Click one of the buttons to create a new file with the modified data</p>\n        <div className="flex-cont">{["xlsx", "xlsb", "xls"].map((ext) => (\n          <button key={ext} onClick={() => saveFile(ext)}>export [.{ext}]</button>\n        ))}</div>\n      </>)}\n    </>\n  );\n}\n')),(0,o.kt)("p",null,"4) run ",(0,o.kt)("inlineCode",{parentName:"p"},"npm start"),".  When you load the dev page in the browser, it will attempt\nto fetch ",(0,o.kt)("a",{parentName:"p",href:"https://sheetjs.com/pres.numbers"},"https://sheetjs.com/pres.numbers")," and load the data."),(0,o.kt)("p",null,"The following screenshot was taken from the demo:"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"/react/rdg1.png",alt:"react-data-grid screenshot"}))),(0,o.kt)("h3",{id:"vue3-table-lite"},"vue3-table-lite"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This demo was tested against ",(0,o.kt)("inlineCode",{parentName:"p"},"vue3-table-lite 1.2.4"),", VueJS ",(0,o.kt)("inlineCode",{parentName:"p"},"3.2.37"),", ViteJS\n3.0.7, and ",(0,o.kt)("inlineCode",{parentName:"p"},"@vitejs/plugin-vue")," 3.0.3 on 2022 August 18"))),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://vue3-lite-table.vercel.app/"},(0,o.kt)("inlineCode",{parentName:"a"},"vue3-table-lite"))," is a data grid built\nfor Vue"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"#vte-demo"},"A complete example is included below.")),(0,o.kt)("h4",{id:"rows-and-columns-bindings"},"Rows and Columns Bindings"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"vue3-table-lite")," presents two bindable attributes: an array of column metadata\n(",(0,o.kt)("inlineCode",{parentName:"p"},"columns"),") and an array of objects representing the displayed data (",(0,o.kt)("inlineCode",{parentName:"p"},"rows"),").\nTypically both are ",(0,o.kt)("inlineCode",{parentName:"p"},"ref")," objects:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<script setup lang="ts">\nimport { ref } from "vue";\nimport VueTableLite from "vue3-table-lite/ts";\n\n/* rows */\ntype Row = any[];\nconst rows = ref<Row[]>([]);\n\n/* columns */\ntype Column = { field: string; label: string; };\nconst columns = ref<Column[]>([]);\n<\/script>\n\n<template>\n  <vue-table-lite :columns="columns" :rows="rows"></vue-table-lite>\n</template>\n')),(0,o.kt)("p",null,"These can be mutated through the ",(0,o.kt)("inlineCode",{parentName:"p"},"value")," property in Vue lifecycle methods:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { onMounted } from "vue";\nonMounted(() => {\n  columns.value = [ { field: "name", label: "Names" }];\n  rows.value = [ { name: "SheetJS" }, { name: "VueJS" } ];\n})\n')),(0,o.kt)("p",null,"The most generic data representation is an array of arrays. To sate the grid,\nthe columns must be objects whose ",(0,o.kt)("inlineCode",{parentName:"p"},"field")," property is the stringified number:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { ref } from "vue";\nimport { utils } from \'xlsx\';\n\n/* generate row and column data */\nfunction ws_to_vte(ws) {\n  /* create an array of arrays */\n  const rows = utils.sheet_to_json(ws, { header: 1 });\n\n  /* create column array */\n  const range = utils.decode_range(ws["!ref"]||"A1");\n  const columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({\n    field: String(i), // VTE will access row["0"], row["1"], etc\n    label: utils.encode_col(i), // the column labels will be A, B, etc\n  }));\n\n  return { rows, columns };\n}\n\nconst rows = ref([]);\nconst columns = ref([]);\n\n/* update refs */\nfunction update_refs(ws) {\n  const data = ws_to_vte(ws);\n  rows.value = data.rows;\n  columns.value = data.columns;\n}\n')),(0,o.kt)("p",null,"In the other direction, a worksheet can be generated with ",(0,o.kt)("inlineCode",{parentName:"p"},"aoa_to_sheet"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { utils } from 'xlsx';\n\nconst rows = ref([]);\n\nfunction vte_to_ws(rows) {\n  return utils.aoa_to_sheet(rows.value);\n}\n")),(0,o.kt)("h4",{id:"vte-demo"},"VTE Demo"),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("b",null,"Complete Example")," (click to show)"),(0,o.kt)("p",null,"1) Create a new ViteJS App using the Vue + TypeScript template:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm create vite@latest sheetjs-vue -- --template vue-ts\ncd sheetjs-vue\n")),(0,o.kt)("p",null,"2) Install dependencies:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm i\nnpm i -S https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz vue3-table-lite\n")),(0,o.kt)("p",null,"3) Download ",(0,o.kt)("a",{parentName:"p",href:"pathname:///vtl/App.vue"},(0,o.kt)("inlineCode",{parentName:"a"},"src/App.vue"))," and replace the contents:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd src\nrm -f App.vue\ncurl -LO https://docs.sheetjs.com/vtl/App.vue\ncd ..\n")),(0,o.kt)("p",null,"4) run ",(0,o.kt)("inlineCode",{parentName:"p"},"npm run dev"),".  When you load the dev page in the browser, it will try\nto fetch ",(0,o.kt)("a",{parentName:"p",href:"https://sheetjs.com/pres.numbers"},"https://sheetjs.com/pres.numbers")," and load the data.")))}m.isMDXComponent=!0}}]);