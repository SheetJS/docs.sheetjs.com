"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3903],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=r,g=u["".concat(s,".").concat(m)]||u[m]||c[m]||i;return n?a.createElement(g,o(o({ref:t},p),{},{components:n})):a.createElement(g,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var d=2;d<i;d++)o[d]=n[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7701:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_position:14,title:"Data Grids and UI"},o=void 0,l={unversionedId:"demos/grid",id:"demos/grid",title:"Data Grids and UI",description:"Various JavaScript UI components provide a more interactive editing experience.",source:"@site/docs/03-demos/14-grid.md",sourceDirName:"03-demos",slug:"/demos/grid",permalink:"/docs/demos/grid",draft:!1,tags:[],version:"current",sidebarPosition:14,frontMatter:{sidebar_position:14,title:"Data Grids and UI"},sidebar:"tutorialSidebar",previous:{title:"Command-Line Tools",permalink:"/docs/demos/cli"},next:{title:"Chrome Extensions",permalink:"/docs/demos/chromium"}},s={},d=[{value:"Managed Lifecycle",id:"managed-lifecycle",level:2},{value:"Canvas DataGrid",id:"canvas-datagrid",level:3},{value:"Angular UI Grid",id:"angular-ui-grid",level:3}],p={toc:d};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Various JavaScript UI components provide a more interactive editing experience.\nMost are able to interchange with arrays of arrays or arrays of data objects.\nThis demo focuses on a few open source data grids."),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://sheetjs.com/pro"},"SheetJS Pro")," offers additional features like styling\nand images. The UI tools typically support many of these advanced features."),(0,r.kt)("p",{parentName:"admonition"},"To eliminate any confusion, the live examples linked from this page demonstrate\nSheetJS Community Edition data interchange.")),(0,r.kt)("h2",{id:"managed-lifecycle"},"Managed Lifecycle"),(0,r.kt)("p",null,"Many UI components tend to manage the entire lifecycle, providing methods to\nimport and export data."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"sheet_to_json")," utility function generates arrays of objects, which is\nsuitable for a number of libraries.  When more advanced shapes are needed,\nit is easier to munge the output of an array of arrays."),(0,r.kt)("h3",{id:"canvas-datagrid"},"Canvas DataGrid"),(0,r.kt)("p",null,"After extensive testing, ",(0,r.kt)("a",{parentName:"p",href:"https://canvas-datagrid.js.org/demo.html"},(0,r.kt)("inlineCode",{parentName:"a"},"canvas-datagrid")),"\nstood out as a very high-performance grid with an incredibly simple API."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"pathname:///cdg/index.html"},"Click here for a live integration demo.")),(0,r.kt)("details",null,(0,r.kt)("summary",null,(0,r.kt)("b",null,"Full Exposition")," (click to show)"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Obtaining the Library")),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"canvas-datagrid")," NodeJS packages include a minified script that can be\ndirectly inserted as a script tag.  The unpkg CDN also serves this script:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<script src="https://unpkg.com/canvas-datagrid/dist/canvas-datagrid.js"><\/script>\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Previewing Data")),(0,r.kt)("p",null,"The HTML document needs a container element:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<div id="gridctr"></div>\n')),(0,r.kt)("p",null,"Grid initialization is a one-liner:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"var grid = canvasDatagrid({\n  parentNode: document.getElementById('gridctr'),\n  data: []\n});\n")),(0,r.kt)("p",null,"For large data sets, it's necessary to constrain the size of the grid."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"grid.style.height = '100%';\ngrid.style.width = '100%';\n")),(0,r.kt)("p",null,"Once the workbook is read and the worksheet is selected, assigning the data\nvariable automatically updates the view:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"grid.data = XLSX.utils.sheet_to_json(ws, {header:1});\n")),(0,r.kt)("p",null,"This demo previews the first worksheet."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Editing")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"canvas-datagrid")," handles the entire edit cycle.  No intervention is necessary."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Saving Data")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"grid.data")," is immediately readable and can be converted back to a worksheet.\nSome versions return an array-like object without the length, so a little bit of\npreparation may be needed:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"/* converts an array of array-like objects into an array of arrays */\nfunction prep(arr) {\n  var out = [];\n  for(var i = 0; i < arr.length; ++i) {\n    if(!arr[i]) continue;\n    if(Array.isArray(arr[i])) { out[i] = arr[i]; continue };\n    var o = new Array();\n    Object.keys(arr[i]).forEach(function(k) { o[+k] = arr[i][k] });\n    out[i] = o;\n  }\n  return out;\n}\n\n/* build worksheet from the grid data */\nvar ws = XLSX.utils.aoa_to_sheet(prep(grid.data));\n\n/* build up workbook */\nvar wb = XLSX.utils.book_new();\nXLSX.utils.book_append_sheet(wb, ws, 'SheetJS');\n\n/* generate download */\nXLSX.writeFile(wb, \"SheetJS.xlsx\");\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Additional Features")),(0,r.kt)("p",null,"This demo barely scratches the surface.  The underlying grid component includes\nmany additional features including massive data streaming, sorting and styling.")),(0,r.kt)("h3",{id:"angular-ui-grid"},"Angular UI Grid"),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},"This UI Grid is for AngularJS, not the modern Angular.  New projects should not\nuse AngularJS.  This demo is included for legacy applications."),(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("a",{parentName:"p",href:"./legacy#angularjs"},"AngularJS demo")," covers more general strategies.")),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"pathname:///angularjs/ui-grid.html"},"Click here for a live integration demo.")),(0,r.kt)("details",null,(0,r.kt)("summary",null,(0,r.kt)("b",null,"Notes")," (click to show)"),(0,r.kt)("p",null,"The library does not provide any way to modify the import button, so the demo\nincludes a simple directive for a HTML File Input control.  It also includes a\nsample service for export which adds an item to the export menu."),(0,r.kt)("p",null,"The demo ",(0,r.kt)("inlineCode",{parentName:"p"},"SheetJSImportDirective")," follows the prescription from the README for\nFile input controls using ",(0,r.kt)("inlineCode",{parentName:"p"},"readAsArrayBuffer"),", converting to a suitable\nrepresentation and updating the scope."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"SheetJSExportService")," exposes export functions for ",(0,r.kt)("inlineCode",{parentName:"p"},"XLSB")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"XLSX"),".  Other\nfile formats can be exported by changing the ",(0,r.kt)("inlineCode",{parentName:"p"},"bookType")," variable.  It grabs\nvalues from the grid, builds an array of arrays, generates a workbook and forces\na download.  By setting the ",(0,r.kt)("inlineCode",{parentName:"p"},"filename")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"sheetname")," options in the ",(0,r.kt)("inlineCode",{parentName:"p"},"ui-grid"),"\noptions, the output can be controlled.")))}c.isMDXComponent=!0}}]);