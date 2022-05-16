"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3924],{9613:function(t,e,n){n.d(e,{Zo:function(){return m},kt:function(){return s}});var a=n(9496);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),d=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},m=function(t){var e=d(t.components);return a.createElement(p.Provider,{value:e},t.children)},k={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},N=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,p=t.parentName,m=o(t,["components","mdxType","originalType","parentName"]),N=d(n),s=r,g=N["".concat(p,".").concat(s)]||N[s]||k[s]||i;return n?a.createElement(g,l(l({ref:e},m),{},{components:n})):a.createElement(g,l({ref:e},m))}));function s(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,l=new Array(i);l[0]=N;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,l[1]=o;for(var d=2;d<i;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}N.displayName="MDXCreateElement"},6219:function(t,e,n){n.r(e),n.d(e,{assets:function(){return m},contentTitle:function(){return p},default:function(){return s},frontMatter:function(){return o},metadata:function(){return d},toc:function(){return k}});var a=n(2848),r=n(9213),i=(n(9496),n(9613)),l=["components"],o={sidebar_position:7,hide_table_of_contents:!0,title:"Writing Files"},p="Writing Options",d={unversionedId:"api/write-options",id:"api/write-options",title:"Writing Files",description:"XLSX.write(wb, write_opts) attempts to write the workbook wb",source:"@site/docs/08-api/07-write-options.md",sourceDirName:"08-api",slug:"/api/write-options",permalink:"/docs/api/write-options",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,hide_table_of_contents:!0,title:"Writing Files"},sidebar:"tutorialSidebar",previous:{title:"Reading Files",permalink:"/docs/api/parse-options"},next:{title:"Utility Functions",permalink:"/docs/api/utilities"}},m={},k=[{value:"Supported Output Formats",id:"supported-output-formats",level:2},{value:"Output Type",id:"output-type",level:2}],N={toc:k};function s(t){var e=t.components,n=(0,r.Z)(t,l);return(0,i.kt)("wrapper",(0,a.Z)({},N,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"writing-options"},"Writing Options"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.write(wb, write_opts)")," attempts to write the workbook ",(0,i.kt)("inlineCode",{parentName:"p"},"wb")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.writeFile(wb, filename, write_opts)")," attempts to write ",(0,i.kt)("inlineCode",{parentName:"p"},"wb")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"filename"),".\nIn browser-based environments, it will attempt to force a client-side download."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"XLSX.writeFileAsync(filename, wb, o, cb)")," attempts to write ",(0,i.kt)("inlineCode",{parentName:"p"},"wb")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"filename"),".\nIf ",(0,i.kt)("inlineCode",{parentName:"p"},"o")," is omitted, the writer will use the third argument as the callback."),(0,i.kt)("p",null,"The write functions accept an options argument:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Option Name"),(0,i.kt)("th",{parentName:"tr",align:"right"},"Default"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"type")),(0,i.kt)("td",{parentName:"tr",align:"right"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Output data encoding (see Output Type below)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"cellDates")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},"false")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Store dates as type ",(0,i.kt)("inlineCode",{parentName:"td"},"d")," (default is ",(0,i.kt)("inlineCode",{parentName:"td"},"n"),")")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"bookSST")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},"false")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Generate Shared String Table **")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"bookType")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},'"xlsx"')),(0,i.kt)("td",{parentName:"tr",align:"left"},"Type of Workbook (see below for supported formats)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"sheet")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},'""')),(0,i.kt)("td",{parentName:"tr",align:"left"},"Name of Worksheet for single-sheet formats **")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"compression")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},"false")),(0,i.kt)("td",{parentName:"tr",align:"left"},"Use ZIP compression for ZIP-based formats **")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"Props")),(0,i.kt)("td",{parentName:"tr",align:"right"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Override workbook properties when writing **")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"themeXLSX")),(0,i.kt)("td",{parentName:"tr",align:"right"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Override theme XML when writing XLSX/XLSB/XLSM **")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ignoreEC")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},"true")),(0,i.kt)("td",{parentName:"tr",align:"left"},'Suppress "number as text" errors **')),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"numbers")),(0,i.kt)("td",{parentName:"tr",align:"right"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"Payload for NUMBERS export **")))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"bookSST")," is slower and more memory intensive, but has better compatibility\nwith older versions of iOS Numbers"),(0,i.kt)("li",{parentName:"ul"},"The raw data is the only thing guaranteed to be saved.  Features not described\nin this README may not be serialized."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"cellDates")," only applies to XLSX output and is not guaranteed to work with\nthird-party readers.  Excel itself does not usually write cells with type ",(0,i.kt)("inlineCode",{parentName:"li"},"d"),"\nso non-Excel tools may ignore the data or error in the presence of dates."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"Props")," is an object mirroring the workbook ",(0,i.kt)("inlineCode",{parentName:"li"},"Props")," field.  See the table from\nthe ",(0,i.kt)("a",{parentName:"li",href:"../csf/book#file-properties"},"Workbook File Properties")," section."),(0,i.kt)("li",{parentName:"ul"},"if specified, the string from ",(0,i.kt)("inlineCode",{parentName:"li"},"themeXLSX")," will be saved as the primary theme\nfor XLSX/XLSB/XLSM files (to ",(0,i.kt)("inlineCode",{parentName:"li"},"xl/theme/theme1.xml")," in the ZIP)"),(0,i.kt)("li",{parentName:"ul"},'Due to a bug in the program, some features like "Text to Columns" will crash\nExcel on worksheets where error conditions are ignored.  The writer will mark\nfiles to ignore the error by default.  Set ',(0,i.kt)("inlineCode",{parentName:"li"},"ignoreEC")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"false")," to suppress."),(0,i.kt)("li",{parentName:"ul"},"Due to the size of the data, the NUMBERS data is not included by default. The\nincluded ",(0,i.kt)("inlineCode",{parentName:"li"},"xlsx.zahl.js")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"xlsx.zahl.mjs")," scripts include the data.")),(0,i.kt)("h2",{id:"supported-output-formats"},"Supported Output Formats"),(0,i.kt)("p",null,"For broad compatibility with third-party tools, this library supports many\noutput formats.  The specific file type is controlled with ",(0,i.kt)("inlineCode",{parentName:"p"},"bookType")," option:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"th"},"bookType")),(0,i.kt)("th",{parentName:"tr",align:"right"},"file ext"),(0,i.kt)("th",{parentName:"tr",align:"center"},"container"),(0,i.kt)("th",{parentName:"tr",align:"left"},"sheets"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"xlsx")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xlsx")),(0,i.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 2007+ XML Format")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"xlsm")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xlsm")),(0,i.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 2007+ Macro XML Format")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"xlsb")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xlsb")),(0,i.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 2007+ Binary Format")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"biff8")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xls")),(0,i.kt)("td",{parentName:"tr",align:"center"},"CFB"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 97-2004 Workbook Format")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"biff5")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xls")),(0,i.kt)("td",{parentName:"tr",align:"center"},"CFB"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 5.0/95 Workbook Format")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"biff4")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xls")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 4.0 Worksheet Format")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"biff3")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xls")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 3.0 Worksheet Format")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"biff2")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xls")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 2.0 Worksheet Format")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"xlml")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".xls")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Excel 2003-2004 (SpreadsheetML)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"numbers")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".numbers")),(0,i.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Numbers 3.0+ Spreadsheet")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"ods")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".ods")),(0,i.kt)("td",{parentName:"tr",align:"center"},"ZIP"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"OpenDocument Spreadsheet")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"fods")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".fods")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Flat OpenDocument Spreadsheet")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"wk3")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".wk3")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"multi"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Lotus Workbook (WK3)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"csv")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".csv")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Comma Separated Values")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"txt")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".txt")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"UTF-16 Unicode Text (TXT)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"sylk")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".sylk")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Symbolic Link (SYLK)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"html")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".html")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"HTML Document")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"dif")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".dif")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Data Interchange Format (DIF)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"dbf")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".dbf")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"dBASE II + VFP Extensions (DBF)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"wk1")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".wk1")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Lotus Worksheet (WK1)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"rtf")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".rtf")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Rich Text Format (RTF)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"prn")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".prn")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Lotus Formatted Text")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"eth")),(0,i.kt)("td",{parentName:"tr",align:"right"},(0,i.kt)("inlineCode",{parentName:"td"},".eth")),(0,i.kt)("td",{parentName:"tr",align:"center"},"none"),(0,i.kt)("td",{parentName:"tr",align:"left"},"single"),(0,i.kt)("td",{parentName:"tr",align:"left"},"Ethercalc Record Format (ETH)")))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"compression")," only applies to formats with ZIP containers."),(0,i.kt)("li",{parentName:"ul"},"Formats that only support a single sheet require a ",(0,i.kt)("inlineCode",{parentName:"li"},"sheet")," option specifying\nthe worksheet.  If the string is empty, the first worksheet is used."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"writeFile")," will automatically guess the output file format based on the file\nextension if ",(0,i.kt)("inlineCode",{parentName:"li"},"bookType")," is not specified.  It will choose the first format in\nthe aforementioned table that matches the extension.")),(0,i.kt)("h2",{id:"output-type"},"Output Type"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"type")," argument for ",(0,i.kt)("inlineCode",{parentName:"p"},"write")," mirrors the ",(0,i.kt)("inlineCode",{parentName:"p"},"type")," argument for ",(0,i.kt)("inlineCode",{parentName:"p"},"read"),":"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"th"},"type")),(0,i.kt)("th",{parentName:"tr",align:null},"output"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},'"base64"')),(0,i.kt)("td",{parentName:"tr",align:null},"string: Base64 encoding of the file")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},'"binary"')),(0,i.kt)("td",{parentName:"tr",align:null},"string: binary string (byte ",(0,i.kt)("inlineCode",{parentName:"td"},"n")," is ",(0,i.kt)("inlineCode",{parentName:"td"},"data.charCodeAt(n)"),")")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},'"string"')),(0,i.kt)("td",{parentName:"tr",align:null},"string: JS string (characters interpreted as UTF8)")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},'"buffer"')),(0,i.kt)("td",{parentName:"tr",align:null},"nodejs Buffer")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},'"array"')),(0,i.kt)("td",{parentName:"tr",align:null},"ArrayBuffer, fallback array of 8-bit unsigned int")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},'"file"')),(0,i.kt)("td",{parentName:"tr",align:null},"string: path of file that will be created (nodejs only)")))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"For compatibility with Excel, ",(0,i.kt)("inlineCode",{parentName:"li"},"csv")," output will always include the UTF-8 byte\norder mark.")))}s.isMDXComponent=!0}}]);