"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5032],{9613:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),d=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=r,h=u["".concat(i,".").concat(m)]||u[m]||c[m]||o;return n?a.createElement(h,s(s({ref:t},p),{},{components:n})):a.createElement(h,s({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,s[1]=l;for(var d=2;d<o;d++)s[d]=n[d];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7073:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(9496),r=n(1626),o="tabItem_XTJJ";function s(e){var t=e.children,n=e.hidden,s=e.className;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,s),hidden:n},t)}},7632:function(e,t,n){n.d(t,{Z:function(){return m}});var a=n(2848),r=n(9496),o=n(8745),s=n(2586),l=n(1060),i=n(2876),d=n(1626),p="tabList_ECWZ",c="tabItem_T58J";function u(e){var t,n,o,u=e.lazy,m=e.block,h=e.defaultValue,b=e.values,k=e.groupId,f=e.className,g=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),w=null!=b?b:g.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),v=(0,s.l)(w,(function(e,t){return e.value===t.value}));if(v.length>0)throw new Error('Docusaurus error: Duplicate values "'+v.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var N=null===h?h:null!=(t=null!=h?h:null==(n=g.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(o=g[0])?void 0:o.props.value;if(null!==N&&!w.some((function(e){return e.value===N})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+N+'" but none of its children has the corresponding value. Available values are: '+w.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var S=(0,l.U)(),y=S.tabGroupChoices,x=S.setTabGroupChoices,j=(0,r.useState)(N),L=j[0],T=j[1],C=[],_=(0,i.o5)().blockElementScrollPositionUntilNextRender;if(null!=k){var E=y[k];null!=E&&E!==L&&w.some((function(e){return e.value===E}))&&T(E)}var X=function(e){var t=e.currentTarget,n=C.indexOf(t),a=w[n].value;a!==L&&(_(t),T(a),null!=k&&x(k,a))},O=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a=C.indexOf(e.currentTarget)+1;n=C[a]||C[0];break;case"ArrowLeft":var r=C.indexOf(e.currentTarget)-1;n=C[r]||C[C.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:(0,d.Z)("tabs-container",p)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,d.Z)("tabs",{"tabs--block":m},f)},w.map((function(e){var t=e.value,n=e.label,o=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:L===t?0:-1,"aria-selected":L===t,key:t,ref:function(e){return C.push(e)},onKeyDown:O,onFocus:X,onClick:X},o,{className:(0,d.Z)("tabs__item",c,null==o?void 0:o.className,{"tabs__item--active":L===t})}),null!=n?n:t)}))),u?(0,r.cloneElement)(g.filter((function(e){return e.props.value===L}))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},g.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==L})}))))}function m(e){var t=(0,o.Z)();return r.createElement(u,(0,a.Z)({key:String(t)},e))}},2656:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return p},default:function(){return b},frontMatter:function(){return d},metadata:function(){return c},toc:function(){return m}});var a=n(2848),r=n(9213),o=(n(9496),n(9613)),s=n(7632),l=n(7073),i=["components"],d={sidebar_position:10,title:"Databases and SQL"},p=void 0,c={unversionedId:"getting-started/demos/database",id:"getting-started/demos/database",title:"Databases and SQL",description:'"Database" is a catch-all term referring to traditional RDBMS as well as K/V',source:"@site/docs/04-getting-started/03-demos/10-database.md",sourceDirName:"04-getting-started/03-demos",slug:"/getting-started/demos/database",permalink:"/docs/getting-started/demos/database",draft:!1,tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10,title:"Databases and SQL"},sidebar:"tutorialSidebar",previous:{title:"Bundlers",permalink:"/docs/getting-started/demos/bundler"},next:{title:"NoSQL Data Stores",permalink:"/docs/getting-started/demos/nosql"}},u={},m=[{value:"Structured Tables",id:"structured-tables",level:2},{value:"Building Worksheets from Structured Tables",id:"building-worksheets-from-structured-tables",level:3},{value:"Building Schemas from Worksheets",id:"building-schemas-from-worksheets",level:3},{value:"Databases",id:"databases",level:2},{value:"SQLite",id:"sqlite",level:3},{value:"WebSQL",id:"websql",level:3},{value:"LocalStorage and SessionStorage",id:"localstorage-and-sessionstorage",level:3},{value:"IndexedDB",id:"indexeddb",level:3},{value:"MongoDB Structured Collections",id:"mongodb-structured-collections",level:3}],h={toc:m};function b(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,'"Database" is a catch-all term referring to traditional RDBMS as well as K/V\nstores, document databases, and other "NoSQL" storages. There are many external\ndatabase systems as well as browser APIs like WebSQL and ',(0,o.kt)("inlineCode",{parentName:"p"},"localStorage")),(0,o.kt)("p",null,"This demo discusses general strategies and provides examples for a variety of\ndatabase systems.  The examples are merely intended to demonstrate very basic\nfunctionality."),(0,o.kt)("p",null,"Key-value stores, unstructured use of Document Databases, and other schema-less\ndatabases are covered in the ",(0,o.kt)("a",{parentName:"p",href:"./nosql"},"NoSQL demo"),"."),(0,o.kt)("h2",{id:"structured-tables"},"Structured Tables"),(0,o.kt)("p",null,"Database tables are a common import and export target for spreadsheets.  One\ncommon representation of a database table is an array of JS objects whose keys\nare column headers and whose values are the underlying data values. For example,"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,o.kt)("th",{parentName:"tr",align:"right"},"Index"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"Barack Obama"),(0,o.kt)("td",{parentName:"tr",align:"right"},"44")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"Donald Trump"),(0,o.kt)("td",{parentName:"tr",align:"right"},"45")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"left"},"Joseph Biden"),(0,o.kt)("td",{parentName:"tr",align:"right"},"46")))),(0,o.kt)("p",null,"is naturally represented as an array of objects"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'[\n  { Name: "Barack Obama", Index: 44 },\n  { Name: "Donald Trump", Index: 45 },\n  { Name: "Joseph Biden", Index: 46 }\n]\n')),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"sheet_to_json")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"json_to_sheet")," helper functions work with objects of\nsimilar shape, converting to and from worksheet objects.  The corresponding\nworksheet would include a header row for the labels:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"XXX|      A       |   B   |\n---+--------------+-------+\n 1 | Name         | Index |\n 2 | Barack Obama |    44 |\n 3 | Donald Trump |    45 |\n 3 | Joseph Biden |    46 |\n")),(0,o.kt)("h3",{id:"building-worksheets-from-structured-tables"},"Building Worksheets from Structured Tables"),(0,o.kt)("p",null,"There are NodeJS connector libraries for many popular RDBMS systems.  Libraries\nhave facilities for connecting to a database, executing queries, and obtaining\nresults as arrays of JS objects that can be passed to ",(0,o.kt)("inlineCode",{parentName:"p"},"json_to_sheet"),".  The main\ndifferences surround API shape and supported data types."),(0,o.kt)("p",null,"For example, ",(0,o.kt)("inlineCode",{parentName:"p"},"better-sqlite3")," is a connector library for SQLite. The result of\na ",(0,o.kt)("inlineCode",{parentName:"p"},"SELECT")," query is an array of objects suitable for ",(0,o.kt)("inlineCode",{parentName:"p"},"json_to_sheet"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"var aoo = db.prepare(\"SELECT * FROM 'Presidents' LIMIT 100000\").all();\n// highlight-next-line\nvar worksheet = XLSX.utils.json_to_sheet(aoo);\n")),(0,o.kt)("p",null,"Other databases will require post-processing.  For example, MongoDB results\ninclude the Object ID (usually stored in the ",(0,o.kt)("inlineCode",{parentName:"p"},"_id")," key).  This can be removed\nbefore generating a worksheet:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const aoo = await db.collection('coll').find({}).toArray();\n// highlight-next-line\naoo.forEach((x) => delete x._id);\nconst ws = XLSX.utils.json_to_sheet(aoo);\n")),(0,o.kt)("h3",{id:"building-schemas-from-worksheets"},"Building Schemas from Worksheets"),(0,o.kt)("p",null,"When a strict schema is needed, the ",(0,o.kt)("inlineCode",{parentName:"p"},"sheet_to_json"),' helper function generates\narrays of JS objects that can be scanned to determine the column "types".'),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Document databases like MongoDB tend not to require schemas. Arrays of objects\ncan be used directly without setting up a schema:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const aoo = XLSX.utils.sheet_to_json(ws);\n// highlight-next-line\nawait db.collection('coll').insertMany(aoo, { ordered: true });\n")))),(0,o.kt)("p",null,"This example will fetch ",(0,o.kt)("a",{parentName:"p",href:"https://sheetjs.com/cd.xls"},"https://sheetjs.com/cd.xls"),", scan the columns of the\nfirst worksheet to determine data types, and generate 6 PostgreSQL statements."),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("b",null,"Explanation")," (click to show)"),(0,o.kt)("p",null,"The relevant ",(0,o.kt)("inlineCode",{parentName:"p"},"generate_sql")," function takes a worksheet name and a table name:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// define mapping between determined types and PostgreSQL types\nconst PG = { "n": "float8", "s": "text", "b": "boolean" };\n\nfunction generate_sql(ws, wsname) {\n\n  // generate an array of objects from the data\n  const aoo = XLSX.utils.sheet_to_json(ws);\n\n  // types will map column headers to types, while hdr holds headers in order\n  const types = {}, hdr = [];\n\n  // loop across each row object\n  aoo.forEach(row => \n    // Object.entries returns a row of [key, value] pairs.  Loop across those\n    Object.entries(row).forEach(([k,v]) => {\n\n      // If this is first time seeing key, mark unknown and append header array\n      if(!types[k]) { types[k] = "?"; hdr.push(k); }\n\n      // skip null and undefined\n      if(v == null) return;\n\n      // check and resolve type\n      switch(typeof v) {\n        case "string": // strings are the broadest type\n          types[k] = "s"; break;\n        case "number": // if column is not string, number is the broadest type\n          if(types[k] != "s") types[k] = "n"; break;\n        case "boolean": // only mark boolean if column is unknown or boolean\n          if("?b".includes(types[k])) types[k] = "b"; break;\n        default: types[k] = "s"; break; // default to string type\n      }\n    })\n  );\n\n  // The final array consists of the CREATE TABLE query and a series of INSERTs\n  return [\n    // generate CREATE TABLE query and return batch\n    `CREATE TABLE \\`${wsname}\\` (${hdr.map(h => \n      // column name must be wrapped in backticks\n      `\\`${h}\\` ${PG[types[h]]}`\n    ).join(", ")});`\n  ].concat(aoo.map(row => { // generate INSERT query for each row\n    // entries will be an array of [key, value] pairs for the data in the row\n    const entries = Object.entries(row);\n    // fields will hold the column names and values will hold the values\n    const fields = [], values = [];\n    // check each key/value pair in the row\n    entries.forEach(([k,v]) => {\n      // skip null / undefined\n      if(v == null) return;\n      // column name must be wrapped in backticks\n      fields.push(`\\`${k}\\``);\n      // when the field type is numeric, `true` -> 1 and `false` -> 0\n      if(types[k] == "n") values.push(typeof v == "boolean" ? (v ? 1 : 0) : v);\n      // otherwise, \n      else values.push(`\'${v.toString().replaceAll("\'", "\'\'")}\'`);\n    })\n    if(fields.length) return `INSERT INTO \\`${wsname}\\` (${fields.join(", ")}) VALUES (${values.join(", ")})`;\n  })).filter(x => x); // filter out skipped rows\n}\n'))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},'function SheetJSQLWriter() {\n  // define mapping between determined types and PostgreSQL types\n  const PG = { "n": "float8", "s": "text", "b": "boolean" };\n  function generate_sql(ws, wsname) {\n    const aoo = XLSX.utils.sheet_to_json(ws);\n    const types = {}, hdr = [];\n    // loop across each key in each column\n    aoo.forEach(row => Object.entries(row).forEach(([k,v]) => {\n      // set up type if header hasn\'t been seen\n      if(!types[k]) { types[k] = "?"; hdr.push(k); }\n      // check and resolve type\n      switch(typeof v) {\n        case "string": types[k] = "s"; break;\n        case "number": if(types[k] != "s") types[k] = "n"; break;\n        case "boolean": if("?b".includes(types[k])) types[k] = "b"; break;\n        default: types[k] = "s"; break;\n      }\n    }));\n    return [\n      // generate CREATE TABLE query and return batch\n      `CREATE TABLE \\`${wsname}\\` (${hdr.map(h => `\\`${h}\\` ${PG[types[h]]}`).join(", ")});`\n    ].concat(aoo.map(row => {\n      const entries = Object.entries(row);\n      const fields = [], values = [];\n      entries.forEach(([k,v]) => {\n        if(v == null) return;\n        fields.push(`\\`${k}\\``);\n        if(types[k] == "n") values.push(typeof v == "boolean" ? (v ? 1 : 0) : v);\n        else values.push(`\'${v.toString().replaceAll("\'", "\'\'")}\'`);\n      })\n      if(fields.length) return `INSERT INTO \\`${wsname}\\` (${fields.join(", ")}) VALUES (${values.join(", ")})`;\n    })).filter(x => x).slice(0, 6);\n  }\n  const [url, setUrl] = React.useState("https://sheetjs.com/cd.xls");\n  const set_url = React.useCallback((evt) => setUrl(evt.target.value));\n  const [out, setOut] = React.useState("");\n  const xport = React.useCallback(async() => {\n    const ab = await (await fetch(url)).arrayBuffer();\n    const wb = XLSX.read(ab), wsname = wb.SheetNames[0];\n    setOut(generate_sql(wb.Sheets[wsname], wsname).join("\\n"));\n  });\n\n  return ( <> {out && (<><a href={url}>{url}</a><pre>{out}</pre></>)}\n    <b>URL: </b><input type="text" value={url} onChange={set_url} size="50"/>\n    <br/><button onClick={xport}><b>Fetch!</b></button>\n  </> );\n}\n')),(0,o.kt)("h2",{id:"databases"},"Databases"),(0,o.kt)("h3",{id:"sqlite"},"SQLite"),(0,o.kt)("p",null,"Most platforms offer a simple way to query SQLite databases."),(0,o.kt)("p",null,"The following example shows how to query for each table in an SQLite database,\nquery for the data for each table, add each non-empty table to a workbook, and\nexport as XLSX."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/jpwhite3/northwind-SQLite3/raw/master/Northwind_large.sqlite.zip"},"The Northwind database is available in SQLite form"),".\nDownload and expand the zip archive to reveal ",(0,o.kt)("inlineCode",{parentName:"p"},"Northwind_large.sqlite")),(0,o.kt)(s.Z,{mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"nodejs",label:"NodeJS",mdxType:"TabItem"},(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/better-sqlite3"},"The ",(0,o.kt)("inlineCode",{parentName:"a"},"better-sqlite3")," module"),"\nprovides a very simple API for working with SQLite databases.  ",(0,o.kt)("inlineCode",{parentName:"p"},"Statement#all"),"\nruns a prepared statement and returns an array of JS objects."),(0,o.kt)("p",null,"1) Install the dependencies:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz better-sqlite3\n")),(0,o.kt)("p",null,"2) Save the following to ",(0,o.kt)("inlineCode",{parentName:"p"},"node.mjs"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="node.mjs"',title:'"node.mjs"'},'/* Load SQLite3 connector library */\nimport Database from "better-sqlite3";\n\n/* Load SheetJS library */\nimport * as XLSX from \'xlsx/xlsx.mjs\';\nimport * as fs from \'fs\';\nXLSX.set_fs(fs);\n\n/* Initialize database */\nvar db = Database("Northwind_large.sqlite");\n\n/* Create new workbook */\nvar wb = XLSX.utils.book_new();\n\n/* Get list of table names */\nvar sql = db.prepare("SELECT name FROM sqlite_master WHERE type=\'table\'");\nvar result = sql.all();\n\n/* Loop across each name */\nresult.forEach(function(row) {\n  /* Get first 100K rows */\n    var aoo = db.prepare("SELECT * FROM \'" + row.name + "\' LIMIT 100000").all();\n    if(aoo.length > 0) {\n    /* Create Worksheet from the row objects */\n    var ws = XLSX.utils.json_to_sheet(aoo, {dense: true});\n    /* Add to Workbook */\n    XLSX.utils.book_append_sheet(wb, ws, row.name);\n  }\n});\n\n/* Write File */\nXLSX.writeFile(wb, "node.xlsx");\n')),(0,o.kt)("p",null,"3) Run ",(0,o.kt)("inlineCode",{parentName:"p"},"node node.mjs")," and open ",(0,o.kt)("inlineCode",{parentName:"p"},"node.xlsx"))),(0,o.kt)(l.Z,{value:"bun",label:"Bun",mdxType:"TabItem"},(0,o.kt)("p",null,"Bun ships with a built-in high-performance module ",(0,o.kt)("inlineCode",{parentName:"p"},"bun:sqlite"),"."),(0,o.kt)("p",null,"1) Install the dependencies:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz\n")),(0,o.kt)("p",null,"2) Save the following to ",(0,o.kt)("inlineCode",{parentName:"p"},"bun.mjs"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="bun.mjs"',title:'"bun.mjs"'},'/* Load SQLite3 connector library */\nimport { Database } from "bun:sqlite";\n\n/* Load SheetJS library */\nimport * as XLSX from \'xlsx/xlsx.mjs\';\nimport * as fs from \'fs\';\nXLSX.set_fs(fs);\n\n/* Initialize database */\nvar db = Database.open("Northwind_large.sqlite");\n\n/* Create new workbook */\nvar wb = XLSX.utils.book_new();\n\n/* Get list of table names */\nvar sql = db.prepare("SELECT name FROM sqlite_master WHERE type=\'table\'");\nvar result = sql.all();\n\n/* Loop across each name */\nresult.forEach(function(row) {\n  /* Get first 100K rows */\n    var aoo = db.prepare("SELECT * FROM \'" + row.name + "\' LIMIT 100000").all();\n    if(aoo.length > 0) {\n    /* Create Worksheet from the row objects */\n    var ws = XLSX.utils.json_to_sheet(aoo, {dense: true});\n    /* Add to Workbook */\n    XLSX.utils.book_append_sheet(wb, ws, row.name);\n  }\n});\n\n/* Write File */\nXLSX.writeFile(wb, "bun.xlsx");\n')),(0,o.kt)("p",null,"3) Run ",(0,o.kt)("inlineCode",{parentName:"p"},"bun bun.mjs")," and open ",(0,o.kt)("inlineCode",{parentName:"p"},"bun.xlsx")))),(0,o.kt)("h3",{id:"websql"},"WebSQL"),(0,o.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This information is included for legacy deployments.  Web SQL is deprecated."),(0,o.kt)("p",{parentName:"div"},(0,o.kt)("a",{parentName:"p",href:"https://caniuse.com/sql-storage"},"https://caniuse.com/sql-storage")," has up-to-date info on browser support.\n",(0,o.kt)("a",{parentName:"p",href:"https://nolanlawson.com/2014/04/26/web-sql-database-in-memoriam/"},"Firefox"),"\nnever supported Web SQL. Safari 13 dropped support. As of the time of writing,\nthe current Chrome version (103) supports WebSQL."))),(0,o.kt)("p",null,"WebSQL was a popular SQL-based in-browser database available on Chrome.  In\npractice, it is powered by SQLite, and most simple SQLite-compatible queries\nwork as-is in WebSQL."),(0,o.kt)("p",null,"The public demo ",(0,o.kt)("a",{parentName:"p",href:"http://sheetjs.com/sql"},"http://sheetjs.com/sql")," generates a database from workbook."),(0,o.kt)("p",null,"Importing data from spreadsheets is straightforward using the ",(0,o.kt)("inlineCode",{parentName:"p"},"generate_sql"),"\nhelper function from ",(0,o.kt)("a",{parentName:"p",href:"#building-schemas-from-worksheets"},'"Building Schemas"'),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const db = openDatabase('sheetql', '1.0', 'SheetJS WebSQL Test', 2097152);\nconst stmts = generate_sql(ws, wsname);\n// NOTE: tx.executeSql and db.transaction use callbacks. This wraps in Promises\nfor(var i = 0; i < stmts.length; ++i) await new Promise((res, rej) => {\n  db.transaction(tx => \n    tx.executeSql(stmts[i], [], \n      (tx, data) => res(data), // if the query is successful, return the data\n      (tx, err) => rej(err) // if the query fails, reject with the error\n  ));\n});\n")),(0,o.kt)("p",null,"The result of a SQL SELECT statement is a ",(0,o.kt)("inlineCode",{parentName:"p"},"SQLResultSet"),".  The ",(0,o.kt)("inlineCode",{parentName:"p"},"rows")," property\nis a ",(0,o.kt)("inlineCode",{parentName:"p"},"SQLResultSetRowList"),'.  It is an "array-like" structure that has ',(0,o.kt)("inlineCode",{parentName:"p"},"length"),"\nand properies like ",(0,o.kt)("inlineCode",{parentName:"p"},"0"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"1"),", etc.  However, this is not a real Array object.\nA real Array can be created using ",(0,o.kt)("inlineCode",{parentName:"p"},"Array.from"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const db = openDatabase('sheetql', '1.0', 'SheetJS WebSQL Test', 2097152);\ndb.readTransaction(tx =>\n  tx.executeSQL(\"SELECT * FROM DatabaseTable\", [], (tx, data) => {\n    // data.rows is \"array-like\", so `Array.from` can make it a real array\n    const aoo = Array.from(data.rows);\n    const ws = XLSX.utils.json_to_sheet(aoo);\n    // ... it is recommended to perform an export here OR wrap in a Promise\n  })\n);\n")),(0,o.kt)("p",null,'The following demo generates a database with hardcoded SQL statements. Queries\ncan be changed in the Live Editor.  The WebSQL database can be inspected in the\n"WebSQL" section of the "Application" Tab of Developer Tools:'),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"/files/websql.png",alt:"WebSQL DevTools"})),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},'function SheetQL() {\n  const [out, setOut] = React.useState("");\n  const queries = [\n    \'DROP TABLE IF EXISTS Presidents\',\n    \'CREATE TABLE Presidents (Name TEXT, Idx REAL)\',\n    \'INSERT INTO Presidents  (Name, Idx) VALUES ("Barack Obama", 44)\',\n    \'INSERT INTO Presidents  (Name, Idx) VALUES ("Donald Trump", 45)\',\n    \'INSERT INTO Presidents  (Name, Idx) VALUES ("Joseph Biden", 46)\'\n  ];\n  const xport = React.useCallback(async() => {\n    // prep database\n    const db = openDatabase(\'sheetql\', \'1.0\', \'SheetJS WebSQL Test\', 2097152);\n\n    for(var i = 0; i < queries.length; ++i) await new Promise((res, rej) => {\n      db.transaction((tx) => {\n        tx.executeSql(queries[i], [], (tx, data) => res(data), (tx, err) => rej(err));\n      });\n    });\n\n    // pull data and generate rows\n    db.readTransaction(tx => {\n      tx.executeSql("SELECT * FROM Presidents", [], (tx, data) => {\n        const aoo = Array.from(data.rows);\n        setOut("QUERY RESULT:\\n" + aoo.map(r => JSON.stringify(r)).join("\\n") + "\\n")\n        const ws = XLSX.utils.json_to_sheet(aoo);\n        const wb = XLSX.utils.book_new();\n        XLSX.utils.book_append_sheet(wb, ws, "Presidents");\n        XLSX.writeFile(wb, "SheetQL.xlsx");\n      });\n    });\n  });\n  return ( <pre>{out}<button onClick={xport}><b>Fetch!</b></button></pre> );\n}\n')),(0,o.kt)("h3",{id:"localstorage-and-sessionstorage"},"LocalStorage and SessionStorage"),(0,o.kt)("p",null,"The Storage API, encompassing ",(0,o.kt)("inlineCode",{parentName:"p"},"localStorage")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"sessionStorage"),", describes\nsimple key-value stores that only support string values and keys."),(0,o.kt)("p",null,"Arrays of objects can be stored using ",(0,o.kt)("inlineCode",{parentName:"p"},"JSON.stringify")," using row index as key:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const aoo = XLSX.utils.sheet_to_json(ws);\nfor(var i = 0; i < aoo.length; ++i) localStorage.setItem(i, JSON.stringify(aoo[i]));\n")),(0,o.kt)("p",null,"Recovering the array of objects is possible by using ",(0,o.kt)("inlineCode",{parentName:"p"},"JSON.parse"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const aoo = [];\nfor(var i = 0; i < localStorage.length; ++i) aoo.push(JSON.parse(localStorage.getItem(i)));\nconst ws = XLSX.utils.json_to_sheet(aoo);\n")),(0,o.kt)("p",null,"This example will fetch ",(0,o.kt)("a",{parentName:"p",href:"https://sheetjs.com/cd.xls"},"https://sheetjs.com/cd.xls"),", fill ",(0,o.kt)("inlineCode",{parentName:"p"},"localStorage")," with\nrows, then generate a worksheet from the rows and write to a new file."),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This example is for illustration purposes. If array of objects is available, it\nis strongly recommended to convert that array to a worksheet directly."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},'function SheetJStorage() {\n  const [url, setUrl] = React.useState("https://sheetjs.com/cd.xls");\n  const set_url = React.useCallback((evt) => setUrl(evt.target.value));\n  const [out, setOut] = React.useState("");\n  const xport = React.useCallback(async() => {\n    // get first worksheet data as array of objects\n    const ab = await (await fetch(url)).arrayBuffer();\n    const wb = XLSX.read(ab), wsname = wb.SheetNames[0];\n    const aoo = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);\n\n    // reset and populate localStorage\n    localStorage.clear();\n    for(var i = 0; i < aoo.length; ++i) localStorage.setItem(i, JSON.stringify(aoo[i]));\n\n    // create new array of objects from localStorage\n    const new_aoo = [];\n    for(var i = 0; i < localStorage.length; ++i) {\n      const row = JSON.parse(localStorage.getItem(i));\n      new_aoo.push(row);\n    }\n\n    setOut(`Number of rows in LocalStorage: ${localStorage.length}`);\n\n    // create and export workbook\n    const new_ws = XLSX.utils.json_to_sheet(new_aoo);\n    const new_wb = XLSX.utils.book_new();\n    XLSX.utils.book_append_sheet(new_wb, new_ws, "Sheet1");\n    XLSX.writeFile(new_wb, "SheetJStorage.xlsx");\n  });\n\n  return ( <> {out && (<><a href={url}>{url}</a><pre>{out}</pre></>)}\n    <b>URL: </b><input type="text" value={url} onChange={set_url} size="50"/>\n    <br/><button onClick={xport}><b>Fetch!</b></button>\n  </> );\n}\n')),(0,o.kt)("h3",{id:"indexeddb"},"IndexedDB"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://localforage.github.io/localForage/"},(0,o.kt)("inlineCode",{parentName:"a"},"localForage"))," is a lightweight\nIndexedDB wrapper that presents an async Storage interface."),(0,o.kt)("p",null,"Arrays of objects can be stored using ",(0,o.kt)("inlineCode",{parentName:"p"},"JSON.stringify")," using row index as key:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const aoo = XLSX.utils.sheet_to_json(ws);\nfor(var i = 0; i < aoo.length; ++i) await localForage.setItem(i, JSON.stringify(aoo[i]));\n")),(0,o.kt)("p",null,"Recovering the array of objects is possible by using ",(0,o.kt)("inlineCode",{parentName:"p"},"JSON.parse"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const aoo = [];\nfor(var i = 0; i < localForage.length; ++i) aoo.push(JSON.parse(await localForage.getItem(i)));\nconst wb = XLSX.utils.json_to_sheet(aoo);\n")),(0,o.kt)("h3",{id:"mongodb-structured-collections"},"MongoDB Structured Collections"),(0,o.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"MongoDB Relicense")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},'This demo was originally written when MongoDB was licensed under AGPLv3. It was\nrelicensed in 2018 to the Server-Side Public License. This demo was tested with\nthe "MongoDB Community Server" and may not work with the "Enterprise" Server.'))),(0,o.kt)("p",null,"MongoDB is a popular document-oriented database engine."),(0,o.kt)("p",null,"It is straightforward to treat collections as worksheets.  Each object maps to\na row in the table."),(0,o.kt)("p",null,"The official NodeJS connector is ",(0,o.kt)("a",{parentName:"p",href:"https://npm.im/mongodb"},(0,o.kt)("inlineCode",{parentName:"a"},"mongodb")," on NPM"),"."),(0,o.kt)("p",null,"Worksheets can be generated from collections by using ",(0,o.kt)("inlineCode",{parentName:"p"},"Collection#find"),".  A\n",(0,o.kt)("inlineCode",{parentName:"p"},"projection")," can suppress the object ID field:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"/* generate a worksheet from a collection */\nconst aoo = await collection.find({}, {projection:{_id:0}}).toArray();\nconst ws = utils.json_to_sheet(aoo);\n")),(0,o.kt)("p",null,"Collections can be populated with data from a worksheet using ",(0,o.kt)("inlineCode",{parentName:"p"},"insertMany"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"/* import data from a worksheet to a collection */\nconst aoo = XLSX.utils.sheet_to_json(ws);\nawait collection.insertMany(aoo, {ordered: true});\n")),(0,o.kt)("details",null,(0,o.kt)("summary",null,(0,o.kt)("b",null,"Complete Example")," (click to show)"),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"When this demo was last tested, the ",(0,o.kt)("inlineCode",{parentName:"p"},"mongodb")," module did not work with Node 18.\nIt was verified in Node 16.16.0."))),(0,o.kt)("p",null,"1) Install the dependencies:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"$ npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz mongodb\n")),(0,o.kt)("p",null,"2) Start a MongoDB server on localhost (follow official instructions)"),(0,o.kt)("p",null,"3) Save the following to ",(0,o.kt)("inlineCode",{parentName:"p"},"SheetJSMongoCRUD.mjs")," (the key step is highlighted):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="SheetJSMongoCRUD.mjs"',title:'"SheetJSMongoCRUD.mjs"'},"import { writeFile, set_fs, utils } from 'xlsx/xlsx.mjs';\nimport * as fs from 'fs'; set_fs(fs);\nimport { MongoClient } from 'mongodb';\n\nconst url = 'mongodb://localhost:27017/sheetjs';\nconst db_name = 'sheetjs';\n\n(async() => {\n/* Connect to mongodb server */\nconst client = await MongoClient.connect(url, { useUnifiedTopology: true });\n\n/* Sample data table */\nconst db = client.db(db_name);\ntry { await db.collection('pres').drop(); } catch(e) {}\nconst pres = db.collection('pres');\nawait pres.insertMany([\n    { name: \"Barack Obama\", idx: 44 },\n    { name: \"Donald Trump\", idx: 45 },\n    { name: \"Joseph Biden\", idx: 46 }\n], {ordered: true});\n\n// highlight-start\n/* Export database to XLSX */\nconst wb = utils.book_new();\nconst aoo = await pres.find({}, {projection:{_id:0}}).toArray();\nconst ws = utils.json_to_sheet(aoo);\nutils.book_append_sheet(wb, ws, \"Presidents\");\nwriteFile(wb, \"SheetJSMongoCRUD.xlsx\");\n// highlight-end\n\n/* Close connection */\nclient.close();\n})();\n")),(0,o.kt)("p",null,"4) Run ",(0,o.kt)("inlineCode",{parentName:"p"},"node SheetJSMongoCRUD.mjs")," and open ",(0,o.kt)("inlineCode",{parentName:"p"},"SheetJSMongoCRUD.xlsx"))))}b.isMDXComponent=!0}}]);