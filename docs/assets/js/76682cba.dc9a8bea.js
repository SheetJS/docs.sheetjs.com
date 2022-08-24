"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[423],{9613:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return h}});var a=n(9496);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,s=e.originalType,l=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=p(n),h=i,u=c["".concat(l,".").concat(h)]||c[h]||m[h]||s;return n?a.createElement(u,r(r({ref:t},d),{},{components:n})):a.createElement(u,r({ref:t},d))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=n.length,r=new Array(s);r[0]=c;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,r[1]=o;for(var p=2;p<s;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3288:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return m}});var a=n(2848),i=n(9213),s=(n(9496),n(9613)),r=["components"],o={sidebar_position:20,title:"Content and Site Generation"},l=void 0,p={unversionedId:"demos/content",id:"demos/content",title:"Content and Site Generation",description:"With the advent of server-side frameworks and content management systems, it is",source:"@site/docs/03-demos/20-content.md",sourceDirName:"03-demos",slug:"/demos/content",permalink:"/docs/demos/content",draft:!1,tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_position:20,title:"Content and Site Generation"},sidebar:"tutorialSidebar",previous:{title:"iOS and Android Apps",permalink:"/docs/demos/mobile"},next:{title:"ReactJS",permalink:"/docs/demos/react"}},d={},m=[{value:"GatsbyJS",id:"gatsbyjs",level:2},{value:"NextJS",id:"nextjs",level:2},{value:"Strategies",id:"strategies",level:3},{value:"&quot;Static Site Generation&quot; using <code>getStaticProps</code>",id:"static-site-generation-using-getstaticprops",level:4},{value:"&quot;Static Site Generation with Dynamic Routes&quot; using <code>getStaticPaths</code>",id:"static-site-generation-with-dynamic-routes-using-getstaticpaths",level:4},{value:"&quot;Server-Side Rendering&quot; using <code>getServerSideProps</code>",id:"server-side-rendering-using-getserversideprops",level:4},{value:"Demo",id:"demo",level:3},{value:"NuxtJS",id:"nuxtjs",level:2},{value:"nuxt.config.js configuration",id:"nuxtconfigjs-configuration",level:4},{value:"Template Use",id:"template-use",level:4},{value:"Nuxt Content Demo",id:"nuxt-content-demo",level:3},{value:"Lume",id:"lume",level:2}],c={toc:m};function h(e){var t=e.components,n=(0,i.Z)(e,r);return(0,s.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"With the advent of server-side frameworks and content management systems, it is\npossible to build sites whose source of truth is a spreadsheet!  This demo\nexplores a number of approaches."),(0,s.kt)("h2",{id:"gatsbyjs"},"GatsbyJS"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://www.gatsbyjs.com/plugins/gatsby-transformer-excel/"},(0,s.kt)("inlineCode",{parentName:"a"},"gatsby-transformer-excel")),"\ngenerates nodes for each data row of each worksheet. The official documentation\nincludes examples and more detailed usage instructions."),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},(0,s.kt)("inlineCode",{parentName:"p"},"gatsby-transformer-excel")," is maintained by the Gatsby core team and all bugs\nshould be directed to the main Gatsby project.  If it is determined to be a bug\nin the parsing logic, issues should then be raised with the SheetJS project."))),(0,s.kt)("h2",{id:"nextjs"},"NextJS"),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"This was tested against ",(0,s.kt)("inlineCode",{parentName:"p"},"next v12.2.5")," on 2022 August 16."))),(0,s.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"At a high level, there are two ways to pull spreadsheet data into NextJS apps:\nloading an asset module or performing the file read operations from the NextJS\nlifecycle.  At the time of writing, NextJS does not offer an out-of-the-box\nasset module solution, so this demo focuses on raw operations.  NextJS does not\nwatch the spreadsheets, so ",(0,s.kt)("inlineCode",{parentName:"p"},"next dev")," hot reloading will not work!"))),(0,s.kt)("p",null,"The general strategy with NextJS apps is to generate HTML snippets or data from\nthe lifecycle functions and reference them in the template."),(0,s.kt)("p",null,"HTML output can be generated using ",(0,s.kt)("inlineCode",{parentName:"p"},"XLSX.utils.sheet_to_html")," and inserted into\nthe document using the ",(0,s.kt)("inlineCode",{parentName:"p"},"dangerouslySetInnerHTML")," attribute:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx"},"export default function Index({html, type}) { return (\n  // ...\n// highlight-next-line\n  <div dangerouslySetInnerHTML={{ __html: html }} />\n  // ...\n); }\n")),(0,s.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},(0,s.kt)("inlineCode",{parentName:"p"},"fs")," cannot be statically imported from the top level in NextJS pages.  The\ndynamic import must happen within a lifecycle function.  For example:"),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-js"},"/* it is safe to import the library from the top level */\nimport { readFile, utils, set_fs } from 'xlsx';\n/* it is not safe to import 'fs' from the top level ! */\n// import * as fs from 'fs'; // this will fail\nimport { join } from 'path';\nimport { cwd } from 'process';\n\nexport async function getServerSideProps() {\n// highlight-next-line\n  set_fs(await import(\"fs\")); // dynamically import 'fs' when needed\n  const wb = readFile(join(cwd(), \"public\", \"sheetjs.xlsx\")); // works\n  // ...\n}\n")))),(0,s.kt)("h3",{id:"strategies"},"Strategies"),(0,s.kt)("h4",{id:"static-site-generation-using-getstaticprops"},'"Static Site Generation" using ',(0,s.kt)("inlineCode",{parentName:"h4"},"getStaticProps")),(0,s.kt)("p",null,"When using ",(0,s.kt)("inlineCode",{parentName:"p"},"getStaticProps"),", the file will be read once during build time."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"import { readFile, set_fs, utils } from 'xlsx';\n\nexport async function getStaticProps() {\n  /* read file */\n  set_fs(await import(\"fs\"));\n  const wb = readFile(path_to_file)\n\n  /* generate and return the html from the first worksheet */\n  const html = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);\n  return { props: { html } };\n};\n")),(0,s.kt)("h4",{id:"static-site-generation-with-dynamic-routes-using-getstaticpaths"},'"Static Site Generation with Dynamic Routes" using ',(0,s.kt)("inlineCode",{parentName:"h4"},"getStaticPaths")),(0,s.kt)("p",null,"Typically a static site with dynamic routes has an endpoint ",(0,s.kt)("inlineCode",{parentName:"p"},"/sheets/[id]")," that\nimplements both ",(0,s.kt)("inlineCode",{parentName:"p"},"getStaticPaths")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"getStaticProps"),"."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"getStaticPaths")," should return an array of worksheet indices:")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'export async function getStaticPaths() {\n  /* read file */\n  set_fs(await import("fs"));\n  const wb = readFile(path);\n\n  /* generate an array of objects that will be used for generating pages */\n  const paths = wb.SheetNames.map((name, idx) => ({ params: { id: idx.toString() } }));\n  return { paths, fallback: false };\n};\n')),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"For a pure static site, ",(0,s.kt)("inlineCode",{parentName:"p"},"fallback")," must be set to ",(0,s.kt)("inlineCode",{parentName:"p"},"false"),"!"))),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"getStaticProps")," will generate the actual HTML for each page:")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'export async function getStaticProps(ctx) {\n  /* read file */\n  set_fs(await import("fs"));\n  const wb = readFile(path);\n\n  /* get the corresponding worksheet and generate HTML */\n  const ws = wb.Sheets[wb.SheetNames[ctx.params.id]]; // id from getStaticPaths\n  const html = utils.sheet_to_html(ws);\n  return { props: { html } };\n};\n')),(0,s.kt)("h4",{id:"server-side-rendering-using-getserversideprops"},'"Server-Side Rendering" using ',(0,s.kt)("inlineCode",{parentName:"h4"},"getServerSideProps")),(0,s.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Do not use on a static site")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"These routes require a NodeJS dynamic server. Static page generation will fail!"),(0,s.kt)("p",{parentName:"div"},(0,s.kt)("inlineCode",{parentName:"p"},"getStaticProps")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"getStaticPaths")," support static site generation (SSG)."),(0,s.kt)("p",{parentName:"div"},(0,s.kt)("inlineCode",{parentName:"p"},"getServerSideProps")," is suited for NodeJS hosted deployments where the workbook\nchanges frequently and a static site is undesirable."))),(0,s.kt)("p",null,"When using ",(0,s.kt)("inlineCode",{parentName:"p"},"getServerSideProps"),", the file will be read on each request."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"import { readFile, set_fs, utils } from 'xlsx';\n\nexport async function getServerSideProps() {\n  /* read file */\n  set_fs(await import(\"fs\"));\n  const wb = readFile(path_to_file);\n\n  /* generate and return the html from the first worksheet */\n  const html = utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]]);\n  return { props: { html } };\n};\n")),(0,s.kt)("h3",{id:"demo"},"Demo"),(0,s.kt)("details",{open:!0},(0,s.kt)("summary",null,(0,s.kt)("b",null,"Complete Example")," (click to show)"),(0,s.kt)("p",null,"0) Disable NextJS telemetry:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"npx next telemetry disable\n")),(0,s.kt)("p",null,"Confirm it is disabled by running"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"npx next telemetry status\n")),(0,s.kt)("p",null,"1) Set up folder structure.  At the end, a ",(0,s.kt)("inlineCode",{parentName:"p"},"pages")," folder with a ",(0,s.kt)("inlineCode",{parentName:"p"},"sheets"),"\nsubfolder must be created.  On Linux or MacOS or WSL:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir -p pages/sheets/\n")),(0,s.kt)("p",null,"2) Download the ",(0,s.kt)("a",{parentName:"p",href:"pathname:///next/sheetjs.xlsx"},"test file")," and place in the\nproject root.  On Linux or MacOS or WSL:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"curl -LO https://docs.sheetjs.com/next/sheetjs.xlsx\n")),(0,s.kt)("p",null,"3) Install dependencies:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz next\n")),(0,s.kt)("p",null,"4) Download test scripts:"),(0,s.kt)("p",null,"Download and place the following scripts in the ",(0,s.kt)("inlineCode",{parentName:"p"},"pages")," subfolder:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"pathname:///next/index.js"},(0,s.kt)("inlineCode",{parentName:"a"},"index.js"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"pathname:///next/getServerSideProps.js"},(0,s.kt)("inlineCode",{parentName:"a"},"getServerSideProps.js"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"pathname:///next/getStaticPaths.js"},(0,s.kt)("inlineCode",{parentName:"a"},"getStaticPaths.js"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"pathname:///next/getStaticProps.js"},(0,s.kt)("inlineCode",{parentName:"a"},"getStaticProps.js")))),(0,s.kt)("p",null,"Download ",(0,s.kt)("a",{parentName:"p",href:"pathname:///next/%5Bid%5D.js"},(0,s.kt)("inlineCode",{parentName:"a"},"[id].js"))," and place in the\n",(0,s.kt)("inlineCode",{parentName:"p"},"pages/sheets")," subfolder."),(0,s.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Percent-Encoding in the script name")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"The ",(0,s.kt)("inlineCode",{parentName:"p"},"[id].js")," script must have the literal square brackets in the name. If your\nbrowser saved the file to ",(0,s.kt)("inlineCode",{parentName:"p"},"%5Bid%5D.js"),". rename the file."))),(0,s.kt)("p",null,"On Linux or MacOS or WSL:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"cd pages\ncurl -LO https://docs.sheetjs.com/next/index.js\ncurl -LO https://docs.sheetjs.com/next/getServerSideProps.js\ncurl -LO https://docs.sheetjs.com/next/getStaticPaths.js\ncurl -LO https://docs.sheetjs.com/next/getStaticProps.js\ncd sheets\ncurl -LOg 'https://docs.sheetjs.com/next/[id].js'\ncd ../..\n")),(0,s.kt)("p",null,"5) Test the deployment:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npx next\n")),(0,s.kt)("p",null,"Open a web browser and access:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"http://localhost:3000 landing page"),(0,s.kt)("li",{parentName:"ul"},"http://localhost:3000/getStaticProps shows data from the first sheet"),(0,s.kt)("li",{parentName:"ul"},"http://localhost:3000/getServerSideProps shows data from the first sheet"),(0,s.kt)("li",{parentName:"ul"},"http://localhost:3000/getStaticPaths shows a list (3 sheets)")),(0,s.kt)("p",null,"The individual worksheets are available at"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"http://localhost:3000/sheets/0"),(0,s.kt)("li",{parentName:"ul"},"http://localhost:3000/sheets/1"),(0,s.kt)("li",{parentName:"ul"},"http://localhost:3000/sheets/2")),(0,s.kt)("p",null,"6) Stop the server and run a production build:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npx next build\n")),(0,s.kt)("p",null,"The final output will show a list of the routes and types:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"Route (pages)                              Size     First Load JS\n\u250c \u25cb /                                      551 B          81.7 kB\n\u251c \u25cb /404                                   194 B          77.2 kB\n\u251c \u03bb /getServerSideProps                    602 B          81.7 kB\n\u251c \u25cf /getStaticPaths                        2.7 kB         83.8 kB\n\u251c \u25cf /getStaticProps                        600 B          81.7 kB\n\u2514 \u25cf /sheets/[id] (312 ms)                  580 B          81.7 kB\n    \u251c /sheets/0\n    \u251c /sheets/1\n    \u2514 /sheets/2\n")),(0,s.kt)("p",null,"As explained in the summary, the ",(0,s.kt)("inlineCode",{parentName:"p"},"/getStaticPaths")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"/getStaticProps")," routes\nare completely static.  3 ",(0,s.kt)("inlineCode",{parentName:"p"},"/sheets/#")," pages were generated, corresponding to 3\nworksheets in the file.  ",(0,s.kt)("inlineCode",{parentName:"p"},"/getServerSideProps")," is server-rendered."),(0,s.kt)("p",null,"7) Try to build a static site:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npx next export\n")),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"The static export will fail!")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"A static page cannot be generated at this point because ",(0,s.kt)("inlineCode",{parentName:"p"},"/getServerSideProps"),"\nis still server-rendered."))),(0,s.kt)("p",null,"8) Remove ",(0,s.kt)("inlineCode",{parentName:"p"},"pages/getServerSideProps.js")," and rebuild with ",(0,s.kt)("inlineCode",{parentName:"p"},"npx next build"),"."),(0,s.kt)("p",null,"Inspecting the output, there should be no lines with the ",(0,s.kt)("inlineCode",{parentName:"p"},"\u03bb")," symbol:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"Route (pages)                              Size     First Load JS\n\u250c \u25cb /                                      551 B          81.7 kB\n\u251c \u25cb /404                                   194 B          77.2 kB\n\u251c \u25cf /getStaticPaths                        2.7 kB         83.8 kB\n\u251c \u25cf /getStaticProps                        600 B          81.7 kB\n\u2514 \u25cf /sheets/[id] (312 ms)                  580 B          81.7 kB\n    \u251c /sheets/0\n    \u251c /sheets/1\n    \u2514 /sheets/2\n")),(0,s.kt)("p",null,"9) Generate the static site:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npx next export\n")),(0,s.kt)("p",null,"The static site will be written to the ",(0,s.kt)("inlineCode",{parentName:"p"},"out")," subfolder, which can be hosted with"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npx http-server out\n")),(0,s.kt)("p",null,"The command will start a local HTTP server on port 8080.")),(0,s.kt)("h2",{id:"nuxtjs"},"NuxtJS"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"@nuxt/content")," is a file-based CMS for Nuxt, enabling static-site generation\nand on-demand server rendering powered by spreadsheets."),(0,s.kt)("h4",{id:"nuxtconfigjs-configuration"},"nuxt.config.js configuration"),(0,s.kt)("p",null,"Through an override in ",(0,s.kt)("inlineCode",{parentName:"p"},"nuxt.config.js"),", Nuxt Content will use custom parsers.\nDifferences from a stock ",(0,s.kt)("inlineCode",{parentName:"p"},"create-nuxt-app")," config are shown below:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'// highlight-start\nimport { readFile, utils } from \'xlsx\';\n\n// This will be called when the files change\nconst parseSheet = (file, { path }) => {\n  // `path` is a path that can be read with `XLSX.readFile`\n  const wb = readFile(path);\n  const o = wb.SheetNames.map(name => ({ name, data: utils.sheet_to_json(wb.Sheets[name])}));\n  return { data: o };\n}\n// highlight-end\n\nexport default {\n// ...\n\n// highlight-start\n  // content.extendParser allows us to hook into the parsing step\n  content: {\n    extendParser: {\n      // the keys are the extensions that will be matched.  The "." is required\n      ".numbers": parseSheet,\n      ".xlsx": parseSheet,\n      ".xls": parseSheet,\n      // can add other extensions like ".fods" as desired\n    }\n  },\n// highlight-end\n\n// ...\n}\n')),(0,s.kt)("h4",{id:"template-use"},"Template Use"),(0,s.kt)("p",null,"When a spreadsheet is placed in the ",(0,s.kt)("inlineCode",{parentName:"p"},"content")," folder, Nuxt will find it.  The\ndata can be referenced in a view with ",(0,s.kt)("inlineCode",{parentName:"p"},"asyncData"),".  The name should not include\nthe extension, so ",(0,s.kt)("inlineCode",{parentName:"p"},'"sheetjs.numbers"')," would be referenced as ",(0,s.kt)("inlineCode",{parentName:"p"},'"sheetjs"'),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"  async asyncData ({$content}) {\n    return {\n      // $content('sheetjs') will match files with extensions in nuxt.config.js\n      data: await $content('sheetjs').fetch()\n    };\n  }\n")),(0,s.kt)("p",null,"In the template, ",(0,s.kt)("inlineCode",{parentName:"p"},"data.data")," is an array of objects.  Each object has a ",(0,s.kt)("inlineCode",{parentName:"p"},"name"),"\nproperty for the worksheet name and a ",(0,s.kt)("inlineCode",{parentName:"p"},"data")," array of row objects.  This maps\nneatly with nested ",(0,s.kt)("inlineCode",{parentName:"p"},"v-for"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-xml"},'  \x3c!-- loop over the worksheets --\x3e\n  <div v-for="item in data.data" v-bind:key="item.name">\n    <table>\n      \x3c!-- loop over the rows of each worksheet --\x3e\n      <tr v-for="row in item.data" v-bind:key="row.Index">\n        \x3c!-- here `row` is a row object generated from sheet_to_json --\x3e\n        <td>{{ row.Name }}</td>\n        <td>{{ row.Index }}</td>\n      </tr>\n    </table>\n  </div>\n')),(0,s.kt)("h3",{id:"nuxt-content-demo"},"Nuxt Content Demo"),(0,s.kt)("details",null,(0,s.kt)("summary",null,(0,s.kt)("b",null,"Complete Example")," (click to show)"),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"This was tested against ",(0,s.kt)("inlineCode",{parentName:"p"},"create-nuxt-app v4.0.0")," on 2022 August 13."))),(0,s.kt)("p",null,"1) Create a stock app:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npx create-nuxt-app SheetJSNuxt\n")),(0,s.kt)("p",null,"When prompted, enter the following options:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Project name"),": press Enter (use default ",(0,s.kt)("inlineCode",{parentName:"li"},"SheetJSNuxt"),")"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Programming language"),": press Down Arrow (",(0,s.kt)("inlineCode",{parentName:"li"},"TypeScript")," selected) then Enter"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Package manager"),": select ",(0,s.kt)("inlineCode",{parentName:"li"},"Npm")," and press Enter"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"UI framework"),": select ",(0,s.kt)("inlineCode",{parentName:"li"},"None")," and press Enter"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Nuxt.js modules"),": scroll to ",(0,s.kt)("inlineCode",{parentName:"li"},"Content"),", select with Space, then press Enter"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Linting tools"),": press Enter (do not select any Linting tools)"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Testing framework"),": select ",(0,s.kt)("inlineCode",{parentName:"li"},"None")," and press Enter"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Rendering mode"),": select ",(0,s.kt)("inlineCode",{parentName:"li"},"Universal (SSR / SSG)")," and press Enter"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Deployment target"),": select ",(0,s.kt)("inlineCode",{parentName:"li"},"Static (Static/Jamstack hosting)")," and press Enter"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Development tools"),": press Enter (do not select any Development tools)"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"What is your GitHub username?"),": press Enter"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Version control system"),": select ",(0,s.kt)("inlineCode",{parentName:"li"},"None"))),(0,s.kt)("p",null,"The project will be configured and modules will be installed."),(0,s.kt)("p",null,"2) Install the SheetJS library and start the server:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"cd SheetJSNuxt\nnpm i --save https://cdn.sheetjs.com/xlsx-latest/xlsx-latest.tgz\nnpm run dev\n")),(0,s.kt)("p",null,"When the build finishes, the terminal will display a URL like:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"\u2139 Listening on: http://localhost:64688/\n")),(0,s.kt)("p",null,"The server is listening on that URL.  Open the link in a web browser."),(0,s.kt)("p",null,"3) Download ",(0,s.kt)("a",{parentName:"p",href:"https://sheetjs.com/pres.xlsx"},"https://sheetjs.com/pres.xlsx")," and move to the ",(0,s.kt)("inlineCode",{parentName:"p"},"content")," folder."),(0,s.kt)("p",null,"4) Modify ",(0,s.kt)("inlineCode",{parentName:"p"},"nuxt.config.js")," as described ",(0,s.kt)("a",{parentName:"p",href:"#nuxtconfigjs-configuration"},"earlier")),(0,s.kt)("p",null,"5) Replace ",(0,s.kt)("inlineCode",{parentName:"p"},"pages/index.vue")," with the following:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com --\x3e\n<template><div>\n  <div v-for="item in data.data" v-bind:key="item.name">\n    <h2>{{ item.name }}</h2>\n    <table><thead><tr><th>Name</th><th>Index</th></tr></thead><tbody>\n      <tr v-for="row in item.data" v-bind:key="row.Index">\n        <td>{{ row.Name }}</td>\n        <td>{{ row.Index }}</td>\n      </tr>\n    </tbody></table>\n  </div>\n</div></template>\n\n<script>\nexport default {\n  async asyncData ({$content}) {\n    return {\n      data: await $content(\'pres\').fetch()\n    };\n  }\n}\n<\/script>\n')),(0,s.kt)("p",null,"The browser should refresh to show the contents of the spreadsheet.  If it does\nnot, click Refresh manually or open a new browser window."),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"/nuxt/nuxt5.png",alt:"Nuxt Demo end of step 5"})),(0,s.kt)("p",null,"6) To verify that hot loading works, open ",(0,s.kt)("inlineCode",{parentName:"p"},"pres.xlsx")," from the ",(0,s.kt)("inlineCode",{parentName:"p"},"content")," folder\nin Excel.  Add a new row to the bottom and save the file:"),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"/nuxt/nuxl6.png",alt:"Adding a new line to `pres.xlsx`"})),(0,s.kt)("p",null,"The server terminal window should show a line like:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"\u2139 Updated ./content/pres.xlsx                                       @nuxt/content 05:43:37\n")),(0,s.kt)("p",null,"The page should automatically refresh with the new content:"),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"/nuxt/nuxt6.png",alt:"Nuxt Demo end of step 6"})),(0,s.kt)("p",null,"7) Stop the server (press ",(0,s.kt)("inlineCode",{parentName:"p"},"CTRL+C")," in the terminal window) and run"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npm run generate\n")),(0,s.kt)("p",null,"This will create a static site in the ",(0,s.kt)("inlineCode",{parentName:"p"},"dist")," folder, which can be served with:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"npx http-server dist\n")),(0,s.kt)("p",null,"Accessing the page http://localhost:8080 will show the page contents. Verifying\nthe static nature is trivial: make another change in Excel and save.  The page\nwill not change.")),(0,s.kt)("h2",{id:"lume"},"Lume"),(0,s.kt)("p",null,"Lume is a static site generator for the Deno platform."),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"lume#loadData")," can add custom loaders for data.  The loader method receives a\npath to the file, which can be read with ",(0,s.kt)("inlineCode",{parentName:"p"},"XLSX.readFile"),".  This should be added\nto ",(0,s.kt)("inlineCode",{parentName:"p"},"_config.js"),", like in the example below:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="_config.js"',title:'"_config.js"'},'import lume from "lume/mod.ts";\nimport { readFile, utils } from \'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs\';\n\nfunction wbLoader(path) {\n  const wb = readFile(path);\n  const res = wb.SheetNames.map(n => ({\n    name: n,\n    data: utils.sheet_to_json(wb.Sheets[n])\n  }));\n  return { data: res };\n}\n\nconst site = lume();\nconst exts = [".xlsx", ".numbers", /* ... other supported extensions */];\n// highlight-next-line\nsite.loadData(exts, wbLoader);\n\nexport default site;\n')),(0,s.kt)("p",null,"The actual spreadsheets should be placed in the ",(0,s.kt)("inlineCode",{parentName:"p"},"_data")," subfolder."),(0,s.kt)("p",null,"The variable name is the stem of the filename (",(0,s.kt)("inlineCode",{parentName:"p"},"sheetjs")," if ",(0,s.kt)("inlineCode",{parentName:"p"},"sheetjs.xlsx")," or\n",(0,s.kt)("inlineCode",{parentName:"p"},"sheetjs.numbers")," exists).  A Nunjucks or JSX template can loop through the\nworksheets and the data rows. The example assumes each worksheet has a ",(0,s.kt)("inlineCode",{parentName:"p"},"name")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"index")," column:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="index.jsx"',title:'"index.jsx"'},"export default ({sheetjs}) => {\n  return (<>{(sheetjs.data).map(sheet => (<>\n    <h2>{sheet.name}</h2>\n    <table><thead><th>Name</th><th>Index</th></thead>\n    <tbody>{sheet.data.map(row => (<tr>\n      <td>{row.name}</td>\n      <td>{row.index}</td>\n    </tr>))}</tbody>\n    </table>\n  </>))}</>);\n};\n")))}h.isMDXComponent=!0}}]);