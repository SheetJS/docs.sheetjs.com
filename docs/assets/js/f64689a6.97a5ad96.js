"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5201],{9613:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),u=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,h=d["".concat(i,".").concat(m)]||d[m]||c[m]||o;return n?a.createElement(h,s(s({ref:t},p),{},{components:n})):a.createElement(h,s({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var u=2;u<o;u++)s[u]=n[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},122:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return c}});var a=n(2848),r=n(9213),o=(n(9496),n(9613)),s=["components"],l={sidebar_position:22,title:"VueJS"},i=void 0,u={unversionedId:"demos/vue",id:"demos/vue",title:"VueJS",description:"VueJS is a JS library for building user interfaces.",source:"@site/docs/03-demos/22-vue.md",sourceDirName:"03-demos",slug:"/demos/vue",permalink:"/docs/demos/vue",draft:!1,tags:[],version:"current",sidebarPosition:22,frontMatter:{sidebar_position:22,title:"VueJS"},sidebar:"tutorialSidebar",previous:{title:"ReactJS",permalink:"/docs/demos/react"},next:{title:"Angular",permalink:"/docs/demos/angular"}},p={},c=[{value:"Installation",id:"installation",level:2},{value:"Internal State",id:"internal-state",level:2},{value:"Array of Objects",id:"array-of-objects",level:3},{value:"HTML",id:"html",level:3},{value:"Rows and Columns",id:"rows-and-columns",level:3},{value:"Legacy Deployments",id:"legacy-deployments",level:2}],d={toc:c};function m(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://vuejs.org/"},"VueJS")," is a JS library for building user interfaces."),(0,o.kt)("p",null,"This demo tries to cover common Vue data flow ideas and strategies. Single-File\nComponents (SFC) and VueJS familiarity is assumed."),(0,o.kt)("p",null,"Other demos cover general VueJS deployments, including:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"./content#nuxtjs"},"Static Site Generation powered by NuxtJS")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"./mobile#quasar"},"iOS and Android applications powered by Quasar")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"./grid#vue3-table-lite"},(0,o.kt)("inlineCode",{parentName:"a"},"vue3-table-lite")," UI component"))),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../getting-started/installation/frameworks"},'The "Frameworks" section')," covers\ninstallation with Yarn and other package managers."),(0,o.kt)("p",null,"The library can be imported directly from JS or JSX code with:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { read, utils, writeFile } from 'xlsx';\n")),(0,o.kt)("h2",{id:"internal-state"},"Internal State"),(0,o.kt)("p",null,"The various SheetJS APIs work with various data shapes.  The preferred state\ndepends on the application."),(0,o.kt)("h3",{id:"array-of-objects"},"Array of Objects"),(0,o.kt)("p",null,"Typically, some users will create a spreadsheet with source data that should be\nloaded into the site.  This sheet will have known columns.  For example, our\n",(0,o.kt)("a",{parentName:"p",href:"https://sheetjs.com/pres.xlsx"},"presidents sheet"),' has "Name" / "Index" columns:'),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"/pres.png",alt:"`pres.xlsx` data"})),(0,o.kt)("p",null,"This naturally maps to an array of typed objects, as in the TS example below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import { read, utils } from 'xlsx';\n\ninterface President {\n  Name: string;\n  Index: number;\n}\n\nconst f = await (await fetch(\"https://sheetjs.com/pres.xlsx\")).arrayBuffer();\nconst wb = read(f);\nconst data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);\nconsole.log(data);\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"data")," will be an array of objects:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'[\n  { Name: "Bill Clinton", Index: 42 },\n  { Name: "GeorgeW Bush", Index: 43 },\n  { Name: "Barack Obama", Index: 44 },\n  { Name: "Donald Trump", Index: 45 },\n  { Name: "Joseph Biden", Index: 46 }\n]\n')),(0,o.kt)("p",null,"A component will typically map over the data. The following example generates\na TABLE with a row for each President:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="src/SheetJSVueAoO.vue"',title:'"src/SheetJSVueAoO.vue"'},'<script setup>\nimport { ref, onMounted } from "vue";\nimport { read, utils, writeFileXLSX } from \'xlsx\';\n\nconst rows = ref([]);\n\nonMounted(async() => {\n  /* Download from https://sheetjs.com/pres.numbers */\n  const f = await fetch("https://sheetjs.com/pres.numbers");\n  const ab = await f.arrayBuffer();\n\n  /* parse workbook */\n  const wb = read(ab);\n\n  /* update data */\n  rows.value = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);\n});\n\n/* get state data and export to XLSX */\nfunction exportFile() {\n  const ws = utils.json_to_sheet(rows.value);\n  const wb = utils.book_new();\n  utils.book_append_sheet(wb, ws, "Data");\n  writeFileXLSX(wb, "SheetJSVueAoO.xlsx");\n}\n<\/script>\n\n<template>\n  <table><thead><th>Name</th><th>Index</th></thead><tbody>\n    <tr v-for="(row, idx) in rows" :key="idx">\n      <td>{{ row.Name }}</td>\n      <td>{{ row.Index }}</td>\n    </tr>\n  </tbody><tfoot><td colSpan={2}>\n    <button @click="exportFile">Export XLSX</button>\n  </td></tfoot></table>\n</template>\n')),(0,o.kt)("h3",{id:"html"},"HTML"),(0,o.kt)("p",null,"The main disadvantage of the Array of Objects approach is the specific nature\nof the columns.  For more general use, passing around an Array of Arrays works.\nHowever, this does not handle merge cells well!"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"sheet_to_html")," function generates HTML that is aware of merges and other\nworksheet features.  VueJS ",(0,o.kt)("inlineCode",{parentName:"p"},"v-html")," attribute allows assignment of ",(0,o.kt)("inlineCode",{parentName:"p"},"innerHTML"),"\nattribute, effectively inserting the code into the page:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="src/SheetJSVueHTML.vue"',title:'"src/SheetJSVueHTML.vue"'},'<script setup>\nimport { ref, onMounted } from "vue";\nimport { read, utils, writeFileXLSX } from \'xlsx\';\n\nconst html = ref("");\nconst tableau = ref();\n\nonMounted(async() => {\n  /* Download from https://sheetjs.com/pres.numbers */\n  const f = await fetch("https://sheetjs.com/pres.numbers");\n  const ab = await f.arrayBuffer();\n\n  /* parse workbook */\n  const wb = read(ab);\n\n  /* update data */\n  html.value = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);\n});\n\n/* get live table and export to XLSX */\nfunction exportFile() {\n  const wb = utils.table_to_book(tableau.value.getElementsByTagName("TABLE")[0])\n  writeFileXLSX(wb, "SheetJSVueHTML.xlsx");\n}\n<\/script>\n\n<template>\n  <div v-html="html"></div>\n  <button @click="exportFile">Export XLSX</button>\n</template>\n')),(0,o.kt)("h3",{id:"rows-and-columns"},"Rows and Columns"),(0,o.kt)("p",null,"Some data grids and UI components split worksheet state in two parts: an array\nof column attribute objects and an array of row objects.  The former is used to\ngenerate column headings and for indexing into the row objects."),(0,o.kt)("p",null,"The safest approach is to use an array of arrays for state and to generate\ncolumn objects that map to A1-Style column headers."),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"./grid#rows-and-columns-bindings"},"Vue Table Lite demo")," uses this approach\nwith the following column and row structure:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'/* rows are generated with a simple array of arrays */\nrows.value = utils.sheet_to_json(worksheet, { header: 1 });\n\n/* column objects are generated based on the worksheet range */\nconst range = utils.decode_range(ws["!ref"]||"A1");\ncolumns.value = Array.from({ length: range.e.c + 1 }, (_, i) => ({\n  /* for an array of arrays, the keys are "0", "1", "2", ... */\n  field: String(i),\n  /* column labels: encode_col translates 0 -> "A", 1 -> "B", 2 -> "C", ... */\n  label: XLSX.utils.encode_col(i)\n}));\n')),(0,o.kt)("h2",{id:"legacy-deployments"},"Legacy Deployments"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"../getting-started/installation/standalone"},"The Standalone Scripts")," play nice\nwith legacy deployments that do not use a bundler."),(0,o.kt)("p",null,'The legacy demos show a simple VueJS component.  It is written in ES5 syntax.\nThe pages are not minified and "View Source" should be used to inspect.'),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"pathname:///vue/index2.html"},"VueJS version 2")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"pathname:///vue/index3.html"},"VueJS version 3"))),(0,o.kt)("p",null,"There is a shared component ",(0,o.kt)("a",{parentName:"p",href:"pathname:///vue/SheetJS-vue.js"},(0,o.kt)("inlineCode",{parentName:"a"},"SheetJS-vue.js"))),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"The entire demo is designed to run in Internet Explorer and does not reflect\nmodern design patterns."))))}m.isMDXComponent=!0}}]);