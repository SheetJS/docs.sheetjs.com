"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6166],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),p=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=p(n),u=r,m=d["".concat(i,".").concat(u)]||d[u]||h[u]||l;return n?a.createElement(m,s(s({ref:t},c),{},{components:n})):a.createElement(m,s({ref:t},c))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,s=new Array(l);s[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var p=2;p<l;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9518:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const l={title:"Svelte"},s=void 0,o={unversionedId:"demos/svelte",id:"demos/svelte",title:"Svelte",description:"Svelte is a JS library for building user interfaces.",source:"@site/docs/03-demos/14-svelte.md",sourceDirName:"03-demos",slug:"/demos/svelte",permalink:"/docs/demos/svelte",draft:!1,tags:[],version:"current",sidebarPosition:14,frontMatter:{title:"Svelte"},sidebar:"tutorialSidebar",previous:{title:"VueJS",permalink:"/docs/demos/vue"},next:{title:"Bundlers",permalink:"/docs/demos/bundler"}},i={},p=[{value:"Installation",id:"installation",level:2},{value:"Internal State",id:"internal-state",level:2},{value:"Array of Objects",id:"array-of-objects",level:3},{value:"HTML",id:"html",level:3}],c={toc:p};function h(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://svelte.dev/"},"Svelte")," is a JS library for building user interfaces."),(0,r.kt)("p",null,"This demo tries to cover common Svelte data flow ideas and strategies. Svelte\nfamiliarity is assumed."),(0,r.kt)("p",null,"Other demos cover general Svelte deployments, including:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./mobile#capacitorjs"},"iOS applications powered by CapacitorJS")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./desktop#wails"},"Desktop application powered by Wails"))),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../getting-started/installation/frameworks"},'The "Frameworks" section')," covers\ninstallation with Yarn and other package managers."),(0,r.kt)("p",null,"The library can be imported directly from Svelte files with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { read, utils, writeFile } from 'xlsx';\n")),(0,r.kt)("h2",{id:"internal-state"},"Internal State"),(0,r.kt)("p",null,"The various SheetJS APIs work with various data shapes.  The preferred state\ndepends on the application."),(0,r.kt)("h3",{id:"array-of-objects"},"Array of Objects"),(0,r.kt)("p",null,"Typically, some users will create a spreadsheet with source data that should be\nloaded into the site.  This sheet will have known columns.  For example, our\n",(0,r.kt)("a",{parentName:"p",href:"https://sheetjs.com/pres.xlsx"},"presidents sheet"),' has "Name" / "Index" columns:'),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"/pres.png",alt:"`pres.xlsx` data"})),(0,r.kt)("p",null,"This naturally maps to an array of typed objects, as in the TS example below:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { read, utils } from 'xlsx';\n\ninterface President {\n  Name: string;\n  Index: number;\n}\n\nconst f = await (await fetch(\"https://sheetjs.com/pres.xlsx\")).arrayBuffer();\nconst wb = read(f);\nconst data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);\nconsole.log(data);\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"data")," will be an array of objects:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'[\n  { Name: "Bill Clinton", Index: 42 },\n  { Name: "GeorgeW Bush", Index: 43 },\n  { Name: "Barack Obama", Index: 44 },\n  { Name: "Donald Trump", Index: 45 },\n  { Name: "Joseph Biden", Index: 46 }\n]\n')),(0,r.kt)("p",null,"A component will typically map over the data. The following example generates\na TABLE with a row for each President:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="src/SheetJSSvelteAoO.svelte"',title:'"src/SheetJSSvelteAoO.svelte"'},'<script>\nimport { onMount } from \'svelte\';\nimport { read, utils, writeFileXLSX } from \'xlsx\';\n\n/* the component state is an array of presidents */\nlet pres = [];\n\n/* Fetch and update the state once */\nonMount(async() => {\n  const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();\n  const wb = read(f); // parse the array buffer\n  const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet\n  // highlight-start\n  pres = utils.sheet_to_json(ws); // generate objects and update state\n  // highlight-end\n});\n\n/* get state data and export to XLSX */\nfunction exportFile() {\n  // highlight-next-line\n  const ws = utils.json_to_sheet(pres);\n  const wb = utils.book_new();\n  utils.book_append_sheet(wb, ws, "Data");\n  writeFileXLSX(wb, "SheetJSSvelteAoO.xlsx");\n}\n<\/script>\n\n<main>\n  <table><thead><th>Name</th><th>Index</th></thead><tbody>\n  \x3c!-- highlight-start --\x3e\n  {#each pres as p}<tr>\n    <td>{p.Name}</td>\n    <td>{p.Index}</td>\n  </tr>{/each}\n  \x3c!-- highlight-end --\x3e\n  </tbody><tfoot><td colSpan={2}>\n  <button on:click={exportFile}>Export XLSX</button>\n  </td></tfoot></table>\n</main>\n')),(0,r.kt)("h3",{id:"html"},"HTML"),(0,r.kt)("p",null,"The main disadvantage of the Array of Objects approach is the specific nature\nof the columns.  For more general use, passing around an Array of Arrays works.\nHowever, this does not handle merge cells well!"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"sheet_to_html")," function generates HTML that is aware of merges and other\nworksheet features.  Svelte ",(0,r.kt)("inlineCode",{parentName:"p"},"@html")," tag allows raw HTML strings:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="src/SheetJSSvelteHTML.svelte"',title:'"src/SheetJSSvelteHTML.svelte"'},'<script>\nimport { onMount } from \'svelte\';\nimport { read, utils, writeFileXLSX } from \'xlsx\';\n\nlet html = "";\nlet tbl;\n\n/* Fetch and update the state once */\nonMount(async() => {\n  const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();\n  const wb = read(f); // parse the array buffer\n  const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet\n  // highlight-start\n  html = utils.sheet_to_html(ws); // generate HTML and update state\n  // highlight-end\n});\n\n/* get state data and export to XLSX */\nfunction exportFile() {\n  // highlight-start\n  const elt = tbl.getElementsByTagName("TABLE")[0];\n  const wb = utils.table_to_book(elt);\n  // highlight-end\n  writeFileXLSX(wb, "SheetJSSvelteHTML.xlsx");\n}\n<\/script>\n\n<main>\n  <button on:click={exportFile}>Export XLSX</button>\n  \x3c!-- highlight-start --\x3e\n  <div bind:this={tbl}>{@html html}</div>\n  \x3c!-- highlight-end --\x3e\n</main>\n')))}h.isMDXComponent=!0}}]);