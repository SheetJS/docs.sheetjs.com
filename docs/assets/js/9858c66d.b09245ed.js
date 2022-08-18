"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2039],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,h=u["".concat(i,".").concat(m)]||u[m]||d[m]||s;return n?a.createElement(h,o(o({ref:t},p),{},{components:n})):a.createElement(h,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var c=2;c<s;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3571:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const s={sidebar_position:21,title:"ReactJS"},o=void 0,l={unversionedId:"demos/react",id:"demos/react",title:"ReactJS",description:"ReactJS is a JS library for building user interfaces.",source:"@site/docs/03-demos/21-react.md",sourceDirName:"03-demos",slug:"/demos/react",permalink:"/docs/demos/react",draft:!1,tags:[],version:"current",sidebarPosition:21,frontMatter:{sidebar_position:21,title:"ReactJS"},sidebar:"tutorialSidebar",previous:{title:"Content and Site Generation",permalink:"/docs/demos/content"},next:{title:"VueJS",permalink:"/docs/demos/vue"}},i={},c=[{value:"Installation",id:"installation",level:2},{value:"Internal State",id:"internal-state",level:2},{value:"Array of Objects",id:"array-of-objects",level:3},{value:"HTML",id:"html",level:3},{value:"Rows and Columns",id:"rows-and-columns",level:3},{value:"Legacy Deployments",id:"legacy-deployments",level:2}],p={toc:c};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://reactjs.org/"},"ReactJS")," is a JS library for building user interfaces."),(0,r.kt)("p",null,"This demo tries to cover common React data flow ideas and strategies. React\nfamiliarity is assumed."),(0,r.kt)("p",null,"Other demos cover general React deployments, including:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./content#nextjs"},"Static Site Generation powered by NextJS")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./mobile#react-native"},"iOS and Android applications powered by React Native")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"./grid#react-data-grid"},"React Data Grid UI component"))),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../getting-started/installation/frameworks"},'The "Frameworks" section')," covers\ninstallation with Yarn and other package managers."),(0,r.kt)("p",null,"The library can be imported directly from JS or JSX code with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { read, utils, writeFile } from 'xlsx';\n")),(0,r.kt)("h2",{id:"internal-state"},"Internal State"),(0,r.kt)("p",null,"The various SheetJS APIs work with various data shapes.  The preferred state\ndepends on the application."),(0,r.kt)("h3",{id:"array-of-objects"},"Array of Objects"),(0,r.kt)("p",null,"Typically, some users will create a spreadsheet with source data that should be\nloaded into the site.  This sheet will have known columns.  For example, our\n",(0,r.kt)("a",{parentName:"p",href:"https://sheetjs.com/pres.xlsx"},"presidents sheet"),' has "Name" / "Index" columns:'),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"/pres.png",alt:"`pres.xlsx` data"})),(0,r.kt)("p",null,"This naturally maps to an array of typed objects, as in the TS example below:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { read, utils } from 'xlsx';\n\ninterface President {\n  Name: string;\n  Index: number;\n}\n\nconst f = await (await fetch(\"https://sheetjs.com/pres.xlsx\")).arrayBuffer();\nconst wb = read(f);\nconst data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);\nconsole.log(data);\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"data")," will be an array of objects:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'[\n  { Name: "Bill Clinton", Index: 42 },\n  { Name: "GeorgeW Bush", Index: 43 },\n  { Name: "Barack Obama", Index: 44 },\n  { Name: "Donald Trump", Index: 45 },\n  { Name: "Joseph Biden", Index: 46 }\n]\n')),(0,r.kt)("p",null,"A component will typically map over the data. The following example generates\na TABLE with a row for each President:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/SheetJSReactAoO.tsx"',title:'"src/SheetJSReactAoO.tsx"'},'import React, { useEffect, useState } from "react";\nimport { read, utils } from \'xlsx\';\n\ninterface President { Name: string; Index: number; }\n\nexport default function SheetJSReactAoO() {\n  /* the component state is an array of presidents */\n  const [pres, setPres] = useState<President[]>([]);\n\n  /* Fetch and update the state once */\n  useEffect(() => { (async() => {\n    const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();\n    // highlight-start\n    const wb = read(f); // parse the array buffer\n    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet\n    const data = utils.sheet_to_json<President>(ws); // generate objects\n    setPres(data); // update state\n    // highlight-end\n  })(); }, []);\n\n  return (<table><thead><th>Name</th><th>Index</th></thead><tbody>\n    { /* generate row for each president */\n// highlight-start\n      pres.map(pres => (<tr>\n        <td>{pres.Name}</td>\n        <td>{pres.Index}</td>\n      </tr>))\n// highlight-end\n    }\n  </tbody></table>);\n}\n')),(0,r.kt)("h3",{id:"html"},"HTML"),(0,r.kt)("p",null,"The main disadvantage of the Array of Objects approach is the specific nature\nof the columns.  For more general use, passing around an Array of Arrays works.\nHowever, this does not handle merge cells well!"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"sheet_to_html")," function generates HTML that is aware of merges and other\nworksheet features.  React ",(0,r.kt)("inlineCode",{parentName:"p"},"dangerouslySetInnerHTML")," attribute allows code to\nset the ",(0,r.kt)("inlineCode",{parentName:"p"},"innerHTML")," attribute, effectively inserting the code into the page:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/SheetJSReactHTML.tsx"',title:'"src/SheetJSReactHTML.tsx"'},'import React, { useEffect, useState } from "react";\nimport { read, utils } from \'xlsx\';\n\nexport default function SheetJSReactHTML() {\n  /* the component state is an HTML string */\n  const [html, setHtml] = useState<string>("");\n\n  /* Fetch and update the state once */\n  useEffect(() => { (async() => {\n    const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();\n    const wb = read(f); // parse the array buffer\n    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet\n    // highlight-start\n    const data = utils.sheet_to_html(ws); // generate HTML\n    setHtml(data); // update state\n    // highlight-end\n  })(); }, []);\n\n  // highlight-next-line\n  return ( <div dangerouslySetInnerHTML={{ __html: html }} />);\n}\n')),(0,r.kt)("h3",{id:"rows-and-columns"},"Rows and Columns"),(0,r.kt)("p",null,"Some data grids and UI components split worksheet state in two parts: an array\nof column attribute objects and an array of row objects.  The former is used to\ngenerate column headings and for indexing into the row objects."),(0,r.kt)("p",null,"The safest approach is to use an array of arrays for state and to generate\ncolumn objects that map to A1-style column headers."),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"./grid#rows-and-columns-state"},"React Data Grid demo")," uses this approach\nwith the following column and row structure:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'/* rows are generated with a simple array of arrays */\nconst rows = utils.sheet_to_json(worksheet, { header: 1 });\n\n/* column objects are generated based on the worksheet range */\nconst range = utils.decode_range(ws["!ref"]||"A1");\nconst columns = Array.from({ length: range.e.c + 1 }, (_, i) => ({\n  /* for an array of arrays, the keys are "0", "1", "2", ... */\n  key: String(i),\n  /* column labels: encode_col translates 0 -> "A", 1 -> "B", 2 -> "C", ... */\n  name: XLSX.utils.encode_col(i)\n}));\n\n')),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"/react/cols.png",alt:"Column labels for headers"})),(0,r.kt)("h2",{id:"legacy-deployments"},"Legacy Deployments"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"../getting-started/installation/standalone"},"The Standalone Scripts")," play nice\nwith legacy deployments that do not use a bundler."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"pathname:///react/index.html"},"The legacy demo")," shows a simple React component\ntranspiled in the browser using Babel standalone library."))}d.isMDXComponent=!0}}]);