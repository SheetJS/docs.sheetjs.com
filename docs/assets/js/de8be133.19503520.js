"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3924],{3905:(t,e,a)=>{a.d(e,{Zo:()=>m,kt:()=>N});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var p=n.createContext({}),d=function(t){var e=n.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},m=function(t){var e=d(t.components);return n.createElement(p.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},k=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,m=o(t,["components","mdxType","originalType","parentName"]),k=d(a),N=r,u=k["".concat(p,".").concat(N)]||k[N]||s[N]||l;return a?n.createElement(u,i(i({ref:e},m),{},{components:a})):n.createElement(u,i({ref:e},m))}));function N(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=k;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var d=2;d<l;d++)i[d]=a[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}k.displayName="MDXCreateElement"},2360:(t,e,a)=>{a.d(e,{Z:()=>i});var n=a(7294),r=a(6010);const l="tabItem_OmH5";function i(t){let{children:e,hidden:a,className:i}=t;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(l,i),hidden:a},e)}},9877:(t,e,a)=>{a.d(e,{Z:()=>N});var n=a(7462),r=a(7294),l=a(2389),i=a(7392),o=a(7094),p=a(2466),d=a(6010);const m="tabList_uSqn",s="tabItem_LplD";function k(t){var e,a,l;const{lazy:k,block:N,defaultValue:u,values:g,groupId:c,className:f}=t,h=r.Children.map(t.children,(t=>{if((0,r.isValidElement)(t)&&void 0!==t.props.value)return t;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof t.type?t.type:t.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),b=null!=g?g:h.map((t=>{let{props:{value:e,label:a,attributes:n}}=t;return{value:e,label:a,attributes:n}})),y=(0,i.l)(b,((t,e)=>t.value===e.value));if(y.length>0)throw new Error('Docusaurus error: Duplicate values "'+y.map((t=>t.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.');const C=null===u?u:null!=(e=null!=u?u:null==(a=h.find((t=>t.props.default)))?void 0:a.props.value)?e:null==(l=h[0])?void 0:l.props.value;if(null!==C&&!b.some((t=>t.value===C)))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+C+'" but none of its children has the corresponding value. Available values are: '+b.map((t=>t.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");const{tabGroupChoices:w,setTabGroupChoices:x}=(0,o.U)(),[v,S]=(0,r.useState)(C),X=[],{blockElementScrollPositionUntilNextRender:L}=(0,p.o5)();if(null!=c){const t=w[c];null!=t&&t!==v&&b.some((e=>e.value===t))&&S(t)}const T=t=>{const e=t.currentTarget,a=X.indexOf(e),n=b[a].value;n!==v&&(L(e),S(n),null!=c&&x(c,n))},E=t=>{var e;let a=null;switch(t.key){case"ArrowRight":{const e=X.indexOf(t.currentTarget)+1;a=X[e]||X[0];break}case"ArrowLeft":{const e=X.indexOf(t.currentTarget)-1;a=X[e]||X[X.length-1];break}}null==(e=a)||e.focus()};return r.createElement("div",{className:(0,d.Z)("tabs-container",m)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,d.Z)("tabs",{"tabs--block":N},f)},b.map((t=>{let{value:e,label:a,attributes:l}=t;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:v===e?0:-1,"aria-selected":v===e,key:e,ref:t=>X.push(t),onKeyDown:E,onFocus:T,onClick:T},l,{className:(0,d.Z)("tabs__item",s,null==l?void 0:l.className,{"tabs__item--active":v===e})}),null!=a?a:e)}))),k?(0,r.cloneElement)(h.filter((t=>t.props.value===v))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},h.map(((t,e)=>(0,r.cloneElement)(t,{key:e,hidden:t.props.value!==v})))))}function N(t){const e=(0,l.Z)();return r.createElement(k,(0,n.Z)({key:String(e)},t))}},9628:(t,e,a)=>{a.d(e,{Z:()=>n});const n="0.18.9"},2250:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>s,contentTitle:()=>d,default:()=>u,frontMatter:()=>p,metadata:()=>m,toc:()=>k});var n=a(7462),r=(a(7294),a(3905)),l=a(9628),i=a(9877),o=a(2360);const p={sidebar_position:7,hide_table_of_contents:!0,title:"Writing Files"},d="Writing Options",m={unversionedId:"api/write-options",id:"api/write-options",title:"Writing Files",description:"XLSX.write(wb, write_opts) attempts to write the workbook wb",source:"@site/docs/08-api/07-write-options.md",sourceDirName:"08-api",slug:"/api/write-options",permalink:"/docs/api/write-options",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,hide_table_of_contents:!0,title:"Writing Files"},sidebar:"tutorialSidebar",previous:{title:"Reading Files",permalink:"/docs/api/parse-options"},next:{title:"Utility Functions",permalink:"/docs/api/utilities"}},s={},k=[{value:"Supported Output Formats",id:"supported-output-formats",level:2},{value:"Output Type",id:"output-type",level:2}],N={toc:k};function u(t){let{components:e,...a}=t;return(0,r.kt)("wrapper",(0,n.Z)({},N,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"writing-options"},"Writing Options"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.write(wb, write_opts)")," attempts to write the workbook ",(0,r.kt)("inlineCode",{parentName:"p"},"wb")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.writeFile(wb, filename, write_opts)")," attempts to write ",(0,r.kt)("inlineCode",{parentName:"p"},"wb")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"filename"),".\nIn browser-based environments, it will attempt to force a client-side download."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"XLSX.writeFileAsync(filename, wb, o, cb)")," attempts to write ",(0,r.kt)("inlineCode",{parentName:"p"},"wb")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"filename"),".\nIf ",(0,r.kt)("inlineCode",{parentName:"p"},"o")," is omitted, the writer will use the third argument as the callback."),(0,r.kt)("p",null,"The write functions accept an options argument:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Option Name"),(0,r.kt)("th",{parentName:"tr",align:"right"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"type")),(0,r.kt)("td",{parentName:"tr",align:"right"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"Output data encoding (see Output Type below)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"cellDates")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},"false")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Store dates as type ",(0,r.kt)("inlineCode",{parentName:"td"},"d")," (default is ",(0,r.kt)("inlineCode",{parentName:"td"},"n"),")")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"bookSST")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},"false")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Generate Shared String Table **")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"bookType")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},'"xlsx"')),(0,r.kt)("td",{parentName:"tr",align:"left"},"Type of Workbook (see below for supported formats)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"sheet")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},'""')),(0,r.kt)("td",{parentName:"tr",align:"left"},"Name of Worksheet for single-sheet formats **")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"compression")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},"false")),(0,r.kt)("td",{parentName:"tr",align:"left"},"Use ZIP compression for ZIP-based formats **")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Props")),(0,r.kt)("td",{parentName:"tr",align:"right"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"Override workbook properties when writing **")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"themeXLSX")),(0,r.kt)("td",{parentName:"tr",align:"right"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"Override theme XML when writing XLSX/XLSB/XLSM **")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"ignoreEC")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},"true")),(0,r.kt)("td",{parentName:"tr",align:"left"},'Suppress "number as text" errors **')),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"numbers")),(0,r.kt)("td",{parentName:"tr",align:"right"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"Payload for NUMBERS export **")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"bookSST")," is slower and more memory intensive, but has better compatibility\nwith older versions of iOS Numbers"),(0,r.kt)("li",{parentName:"ul"},"The raw data is the only thing guaranteed to be saved.  Features not described\nin this README may not be serialized."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"cellDates")," only applies to XLSX output and is not guaranteed to work with\nthird-party readers.  Excel itself does not usually write cells with type ",(0,r.kt)("inlineCode",{parentName:"li"},"d"),"\nso non-Excel tools may ignore the data or error in the presence of dates."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Props")," is an object mirroring the workbook ",(0,r.kt)("inlineCode",{parentName:"li"},"Props")," field.  See the table from\nthe ",(0,r.kt)("a",{parentName:"li",href:"../csf/book#file-properties"},"Workbook File Properties")," section."),(0,r.kt)("li",{parentName:"ul"},"if specified, the string from ",(0,r.kt)("inlineCode",{parentName:"li"},"themeXLSX")," will be saved as the primary theme\nfor XLSX/XLSB/XLSM files (to ",(0,r.kt)("inlineCode",{parentName:"li"},"xl/theme/theme1.xml")," in the ZIP)"),(0,r.kt)("li",{parentName:"ul"},'Due to a bug in the program, some features like "Text to Columns" will crash\nExcel on worksheets where error conditions are ignored.  The writer will mark\nfiles to ignore the error by default.  Set ',(0,r.kt)("inlineCode",{parentName:"li"},"ignoreEC")," to ",(0,r.kt)("inlineCode",{parentName:"li"},"false")," to suppress.")),(0,r.kt)("details",{open:!0},(0,r.kt)("summary",null,(0,r.kt)("b",null,"Exporting NUMBERS files")," (click to show)"),(0,r.kt)("p",null,"The NUMBERS writer requires a fairly large base.  The supplementary ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx.zahl"),"\nscripts provide support.  ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx.zahl.js")," is designed for standalone and NodeJS\nuse, while ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx.zahl.mjs")," is suitable for ESM."),(0,r.kt)("p",null,"Adding NUMBERS export support involves two steps:"),(0,r.kt)("p",null,"1) Load the ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx.zahl")," script"),(0,r.kt)("p",null,"2) Pass the payload into the ",(0,r.kt)("inlineCode",{parentName:"p"},"numbers")," option to ",(0,r.kt)("inlineCode",{parentName:"p"},"write")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"writeFile"),"."),(0,r.kt)(i.Z,{mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"browser",label:"Browser",mdxType:"TabItem"},(0,r.kt)("div",null,(0,r.kt)("a",{href:"https://cdn.sheetjs.com/xlsx-"+l.Z+"/package/dist/xlsx.zahl.js"},"https://cdn.sheetjs.com/xlsx-",l.Z,"/package/dist/xlsx.zahl.js")," is the URL for ",l.Z),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<meta charset="utf8">\n<body>\n<script src="https://cdn.sheetjs.com/xlsx-'+l.Z+'/package/dist/xlsx.full.min.js"><\/script>\n<script src="https://cdn.sheetjs.com/xlsx-'+l.Z+'/package/dist/xlsx.zahl.js"><\/script>\n<script>\nvar wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([\n  ["SheetJS", "<3","\u0bb5\u0bbf\u0bb0\u0bbf\u0ba4\u0bbe\u0bb3\u0bcd"],\n  [72,,"Arbeitsbl\xe4tter"],\n  [,62,"\u6570\u636e"],\n  [true,false,],\n]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");\nXLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL_PAYLOAD, compression: true});\n<\/script>\n</body>'))),(0,r.kt)(o.Z,{value:"nodejs",label:"NodeJS",mdxType:"TabItem"},(0,r.kt)("p",null,"After installing the package:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm install --save https://cdn.sheetjs.com/xlsx-"+l.Z+"/xlsx-"+l.Z+".tgz")),(0,r.kt)("p",null,"The scripts will be available at ",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx/dist/xlsx.zahl")," (CommonJS) and\n",(0,r.kt)("inlineCode",{parentName:"p"},"xlsx/dist/xlsx.zahl.mjs")," (ESM)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'var XLSX = require("xlsx");\nvar XLSX_ZAHL_PAYLOAD = require("xlsx/dist/xlsx.zahl");\nvar wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([\n  ["SheetJS", "<3","\u0bb5\u0bbf\u0bb0\u0bbf\u0ba4\u0bbe\u0bb3\u0bcd"],\n  [72,,"Arbeitsbl\xe4tter"],\n  [,62,"\u6570\u636e"],\n  [true,false,],\n]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");\nXLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL_PAYLOAD, compression: true});\n'))),(0,r.kt)(o.Z,{value:"deno",label:"Deno",mdxType:"TabItem"},(0,r.kt)("div",null,(0,r.kt)("a",{href:"https://cdn.sheetjs.com/xlsx-"+l.Z+"/package/dist/xlsx.zahl.mjs"},"https://cdn.sheetjs.com/xlsx-",l.Z,"/package/dist/xlsx.zahl.mjs")," is the URL for ",l.Z),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import * as XLSX from 'https://cdn.sheetjs.com/xlsx-"+l.Z+"/package/xlsx.mjs';\nimport XLSX_ZAHL_PAYLOAD from 'https://cdn.sheetjs.com/xlsx-"+l.Z+'/package/dist/xlsx.zahl.mjs\';\n\nvar wb = XLSX.utils.book_new(); var ws = XLSX.utils.aoa_to_sheet([\n  ["SheetJS", "<3","\u0bb5\u0bbf\u0bb0\u0bbf\u0ba4\u0bbe\u0bb3\u0bcd"],\n  [72,,"Arbeitsbl\xe4tter"],\n  [,62,"\u6570\u636e"],\n  [true,false,],\n]); XLSX.utils.book_append_sheet(wb, ws, "Sheet1");\nXLSX.writeFile(wb, "textport.numbers", {numbers: XLSX_ZAHL_PAYLOAD, compression: true});\n'))))),(0,r.kt)("h2",{id:"supported-output-formats"},"Supported Output Formats"),(0,r.kt)("p",null,"For broad compatibility with third-party tools, this library supports many\noutput formats.  The specific file type is controlled with ",(0,r.kt)("inlineCode",{parentName:"p"},"bookType")," option:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"th"},"bookType")),(0,r.kt)("th",{parentName:"tr",align:"right"},"file ext"),(0,r.kt)("th",{parentName:"tr",align:"center"},"container"),(0,r.kt)("th",{parentName:"tr",align:"left"},"sheets"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"xlsx")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xlsx")),(0,r.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 2007+ XML Format")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"xlsm")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xlsm")),(0,r.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 2007+ Macro XML Format")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"xlsb")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xlsb")),(0,r.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 2007+ Binary Format")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"biff8")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xls")),(0,r.kt)("td",{parentName:"tr",align:"center"},"CFB"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 97-2004 Workbook Format")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"biff5")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xls")),(0,r.kt)("td",{parentName:"tr",align:"center"},"CFB"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 5.0/95 Workbook Format")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"biff4")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xls")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 4.0 Worksheet Format")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"biff3")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xls")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 3.0 Worksheet Format")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"biff2")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xls")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 2.0 Worksheet Format")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"xlml")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".xls")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Excel 2003-2004 (SpreadsheetML)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"numbers")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".numbers")),(0,r.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Numbers 3.0+ Spreadsheet")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"ods")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".ods")),(0,r.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"OpenDocument Spreadsheet")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"fods")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".fods")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Flat OpenDocument Spreadsheet")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"wk3")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".wk3")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Lotus Workbook (WK3)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"csv")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".csv")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Comma Separated Values")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"txt")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".txt")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"UTF-16 Unicode Text (TXT)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"sylk")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".sylk")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Symbolic Link (SYLK)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"html")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".html")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"HTML Document")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"dif")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".dif")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Data Interchange Format (DIF)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"dbf")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".dbf")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"dBASE II + VFP Extensions (DBF)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"wk1")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".wk1")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Lotus Worksheet (WK1)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"rtf")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".rtf")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Rich Text Format (RTF)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"prn")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".prn")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Lotus Formatted Text")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"eth")),(0,r.kt)("td",{parentName:"tr",align:"right"},(0,r.kt)("inlineCode",{parentName:"td"},".eth")),(0,r.kt)("td",{parentName:"tr",align:"center"},"none"),(0,r.kt)("td",{parentName:"tr",align:"left"},"single"),(0,r.kt)("td",{parentName:"tr",align:"left"},"Ethercalc Record Format (ETH)")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"compression")," only applies to formats with ZIP containers."),(0,r.kt)("li",{parentName:"ul"},"Formats that only support a single sheet require a ",(0,r.kt)("inlineCode",{parentName:"li"},"sheet")," option specifying\nthe worksheet.  If the string is empty, the first worksheet is used."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"writeFile")," will automatically guess the output file format based on the file\nextension if ",(0,r.kt)("inlineCode",{parentName:"li"},"bookType")," is not specified.  It will choose the first format in\nthe aforementioned table that matches the extension.")),(0,r.kt)("h2",{id:"output-type"},"Output Type"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"type")," argument for ",(0,r.kt)("inlineCode",{parentName:"p"},"write")," mirrors the ",(0,r.kt)("inlineCode",{parentName:"p"},"type")," argument for ",(0,r.kt)("inlineCode",{parentName:"p"},"read"),":"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"th"},"type")),(0,r.kt)("th",{parentName:"tr",align:null},"output"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},'"base64"')),(0,r.kt)("td",{parentName:"tr",align:null},"string: Base64 encoding of the file")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},'"binary"')),(0,r.kt)("td",{parentName:"tr",align:null},"string: binary string (byte ",(0,r.kt)("inlineCode",{parentName:"td"},"n")," is ",(0,r.kt)("inlineCode",{parentName:"td"},"data.charCodeAt(n)"),")")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},'"string"')),(0,r.kt)("td",{parentName:"tr",align:null},"string: JS string (characters interpreted as UTF8)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},'"buffer"')),(0,r.kt)("td",{parentName:"tr",align:null},"nodejs Buffer")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},'"array"')),(0,r.kt)("td",{parentName:"tr",align:null},"ArrayBuffer, fallback array of 8-bit unsigned int")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},'"file"')),(0,r.kt)("td",{parentName:"tr",align:null},"string: path of file that will be created (nodejs only)")))),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"For compatibility with Excel, ",(0,r.kt)("inlineCode",{parentName:"li"},"csv")," output will always include the UTF-8 byte\norder mark.")))}u.isMDXComponent=!0}}]);