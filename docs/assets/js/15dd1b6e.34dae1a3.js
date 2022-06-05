"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[158],{9613:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(f,i(i({ref:t},c),{},{components:n})):r.createElement(f,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4707:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return d}});var r=n(2848),a=n(9213),o=(n(9496),n(9613)),i=["components"],s={sidebar_position:1},l="Roadmap",p={unversionedId:"getting-started/roadmap",id:"getting-started/roadmap",title:"Roadmap",description:"Most scenarios involving spreadsheets and data can be divided into 5 parts:",source:"@site/docs/04-getting-started/01-roadmap.md",sourceDirName:"04-getting-started",slug:"/getting-started/roadmap",permalink:"/docs/getting-started/roadmap",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Complete Example",permalink:"/docs/example"},next:{title:"Zen of SheetJS",permalink:"/docs/getting-started/zen"}},c={},d=[{value:"Highlights",id:"highlights",level:2}],u={toc:d};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"roadmap"},"Roadmap"),(0,o.kt)("p",null,"Most scenarios involving spreadsheets and data can be divided into 5 parts:"),(0,o.kt)("p",null,"1) ",(0,o.kt)("strong",{parentName:"p"},"Acquire Data"),":  Data may be stored anywhere: local or remote files,\ndatabases, HTML TABLE, or even generated programmatically in the web browser."),(0,o.kt)("p",null,"2) ",(0,o.kt)("strong",{parentName:"p"},"Extract Data"),":  For spreadsheet files, this involves parsing raw bytes to\nread the cell data. For general JS data, this involves reshaping the data."),(0,o.kt)("p",null,"3) ",(0,o.kt)("strong",{parentName:"p"},"Process Data"),":  From generating summary statistics to cleaning data\nrecords, this step is the heart of the problem."),(0,o.kt)("p",null,"4) ",(0,o.kt)("strong",{parentName:"p"},"Package Data"),":  This can involve making a new spreadsheet or serializing\nwith ",(0,o.kt)("inlineCode",{parentName:"p"},"JSON.stringify")," or writing XML or simply flattening data for UI tools."),(0,o.kt)("p",null,"5) ",(0,o.kt)("strong",{parentName:"p"},"Release Data"),":  Spreadsheet files can be uploaded to a server or written\nlocally.  Data can be presented to users in an HTML TABLE or data grid."),(0,o.kt)("p",null,"A common problem involves generating a valid spreadsheet export from data stored\nin an HTML table.  In this example, an HTML TABLE on the page will be scraped,\na row will be added to the bottom with the date of the report, and a new file\nwill be generated and downloaded locally. ",(0,o.kt)("inlineCode",{parentName:"p"},"XLSX.writeFile")," takes care of\npackaging the data and attempting a local download:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// Acquire Data (reference to the HTML table)\nvar table_elt = document.getElementById("my-table-id");\n\n// Extract Data (create a workbook object from the table)\nvar workbook = XLSX.utils.table_to_book(table_elt);\n\n// Process Data (add a new row)\nvar ws = workbook.Sheets["Sheet1"];\nXLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});\n\n// Package and Release Data (`writeFile` tries to write and save an XLSB file)\nXLSX.writeFile(workbook, "Report.xlsb");\n')),(0,o.kt)("p",null,"This library tries to simplify steps 2 and 4 with functions to extract useful\ndata from spreadsheet files (",(0,o.kt)("inlineCode",{parentName:"p"},"read")," / ",(0,o.kt)("inlineCode",{parentName:"p"},"readFile"),") and generate new spreadsheet\nfiles from data (",(0,o.kt)("inlineCode",{parentName:"p"},"write")," / ",(0,o.kt)("inlineCode",{parentName:"p"},"writeFile"),").  Additional utility functions like\n",(0,o.kt)("inlineCode",{parentName:"p"},"table_to_book")," work with other common data sources like HTML tables."),(0,o.kt)("p",null,"This documentation and various demo projects cover a number of common scenarios\nand approaches for steps 1 and 5."),(0,o.kt)("p",null,"Utility functions help with step 3."),(0,o.kt)("h2",{id:"highlights"},"Highlights"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../solutions/input"},'"Data Import"')," describes solutions for common data import\nscenarios."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../solutions/output"},'"Data Export"')," describes solutions for common data export\nscenarios."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../solutions/processing"},'"Data Processing"')," describes solutions for common\nworkbook processing and manipulation scenarios."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../api/utilities"},'"Utility Functions"')," details utility functions for\ntranslating JSON Arrays and other common JS structures into worksheet objects."))}m.isMDXComponent=!0}}]);