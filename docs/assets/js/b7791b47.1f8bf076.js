"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[809],{9613:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),u=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),m=r,f=c["".concat(o,".").concat(m)]||c[m]||d[m]||l;return n?a.createElement(f,i(i({ref:t},p),{},{components:n})):a.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=c;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},8264:function(e,t,n){n.d(t,{Z:function(){return i}});var a=n(9496),r=n(1626),l="tabItem_ZP9l";function i(e){var t=e.children,n=e.hidden,i=e.className;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(l,i),hidden:n},t)}},114:function(e,t,n){n.d(t,{Z:function(){return m}});var a=n(2848),r=n(9496),l=n(3026),i=n(8658),s=n(1823),o=n(4807),u=n(1626),p="tabList_XleC",d="tabItem_hpFr";function c(e){var t,n,l,c=e.lazy,m=e.block,f=e.defaultValue,h=e.values,k=e.groupId,b=e.className,g=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),v=null!=h?h:g.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),N=(0,i.l)(v,(function(e,t){return e.value===t.value}));if(N.length>0)throw new Error('Docusaurus error: Duplicate values "'+N.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var y=null===f?f:null!=(t=null!=f?f:null==(n=g.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(l=g[0])?void 0:l.props.value;if(null!==y&&!v.some((function(e){return e.value===y})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+v.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var w=(0,s.U)(),S=w.tabGroupChoices,O=w.setTabGroupChoices,T=(0,r.useState)(y),C=T[0],x=T[1],E=[],j=(0,o.o5)().blockElementScrollPositionUntilNextRender;if(null!=k){var I=S[k];null!=I&&I!==C&&v.some((function(e){return e.value===I}))&&x(I)}var L=function(e){var t=e.currentTarget,n=E.indexOf(t),a=v[n].value;a!==C&&(j(t),x(a),null!=k&&O(k,a))},D=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a=E.indexOf(e.currentTarget)+1;n=E[a]||E[0];break;case"ArrowLeft":var r=E.indexOf(e.currentTarget)-1;n=E[r]||E[E.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:(0,u.Z)("tabs-container",p)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,u.Z)("tabs",{"tabs--block":m},b)},v.map((function(e){var t=e.value,n=e.label,l=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:C===t?0:-1,"aria-selected":C===t,key:t,ref:function(e){return E.push(e)},onKeyDown:D,onFocus:L,onClick:L},l,{className:(0,u.Z)("tabs__item",d,null==l?void 0:l.className,{"tabs__item--active":C===t})}),null!=n?n:t)}))),c?(0,r.cloneElement)(g.filter((function(e){return e.props.value===C}))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},g.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==C})}))))}function m(e){var t=(0,l.Z)();return r.createElement(c,(0,a.Z)({key:String(t)},e))}},1150:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return p},default:function(){return h},frontMatter:function(){return u},metadata:function(){return d},toc:function(){return m}});var a=n(2848),r=n(9213),l=(n(9496),n(9613)),i=n(114),s=n(8264),o=["components"],u={sidebar_position:5},p="Contributing",d={unversionedId:"miscellany/contributing",id:"miscellany/contributing",title:"Contributing",description:"Due to the precarious nature of the Open Specifications Promise, it is very",source:"@site/docs/09-miscellany/05-contributing.md",sourceDirName:"09-miscellany",slug:"/miscellany/contributing",permalink:"/docs/miscellany/contributing",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Testing",permalink:"/docs/miscellany/testing"},next:{title:"License",permalink:"/docs/miscellany/license"}},c={},m=[{value:"OS-Specific Setup",id:"os-specific-setup",level:2},{value:"Development",id:"development",level:2},{value:"Tests",id:"tests",level:2}],f={toc:m};function h(e){var t=e.components,n=(0,r.Z)(e,o);return(0,l.kt)("wrapper",(0,a.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"contributing"},"Contributing"),(0,l.kt)("p",null,"Due to the precarious nature of the Open Specifications Promise, it is very\nimportant to ensure code is cleanroom.  ",(0,l.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/SheetJS/sheetjs/master/CONTRIBUTING.md"},"Contribution Notes")),(0,l.kt)("details",null,(0,l.kt)("summary",null,(0,l.kt)("b",null,"File organization")," (click to show)"),(0,l.kt)("p",null,"At a high level, the final script is a concatenation of the individual files in\nthe ",(0,l.kt)("inlineCode",{parentName:"p"},"bits")," folder.  Running ",(0,l.kt)("inlineCode",{parentName:"p"},"make")," should reproduce the final output on all\nplatforms."),(0,l.kt)("p",null,"Folders:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"folder"),(0,l.kt)("th",{parentName:"tr",align:"left"},"contents"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"bits")),(0,l.kt)("td",{parentName:"tr",align:"left"},"raw source files that make up the final script")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"bin")),(0,l.kt)("td",{parentName:"tr",align:"left"},"server-side bin scripts (",(0,l.kt)("inlineCode",{parentName:"td"},"xlsx.njs"),")")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"dist")),(0,l.kt)("td",{parentName:"tr",align:"left"},"dist files for web browsers and nonstandard JS environments")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"demos")),(0,l.kt)("td",{parentName:"tr",align:"left"},"demo projects for platforms like ExtendScript and Webpack")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"tests")),(0,l.kt)("td",{parentName:"tr",align:"left"},"browser tests (run ",(0,l.kt)("inlineCode",{parentName:"td"},"make ctest")," to rebuild)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"types")),(0,l.kt)("td",{parentName:"tr",align:"left"},"typescript definitions and tests")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"misc")),(0,l.kt)("td",{parentName:"tr",align:"left"},"miscellaneous supporting scripts")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("inlineCode",{parentName:"td"},"test_files")),(0,l.kt)("td",{parentName:"tr",align:"left"},"test files (pulled from the test files repository)"))))),(0,l.kt)("p",null,"After cloning the repo, running ",(0,l.kt)("inlineCode",{parentName:"p"},"make help")," will display a list of commands."),(0,l.kt)("h2",{id:"os-specific-setup"},"OS-Specific Setup"),(0,l.kt)(i.Z,{mdxType:"Tabs"},(0,l.kt)(s.Z,{value:"wsl",label:"Windows WSL",mdxType:"TabItem"},(0,l.kt)("p",null,"The MacOS/Linux workflow works in WSL.  Initial setup is involved:"),(0,l.kt)("p",null,"1) Install mercurial and subversion."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# Install support programs for the build and test commands\nsudo add-apt-repository ppa:mercurial-ppa/releases\nsudo apt-get update\nsudo apt-get install mercurial subversion\nsudo add-apt-repository --remove ppa:mercurial-ppa/releases\n")),(0,l.kt)("p",null,"2) Install NodeJS"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# Install bootstrap NodeJS and NPM within the WSL\ncurl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -\nsudo apt-get install -y nodejs\n\n# CLOSE AND REOPEN SHELL BEFORE CONTINUING\n\n# Switch to `n`-managed NodeJS\nsudo npm i -g n\nsudo n 16\n")),(0,l.kt)("p",null,"3) follow ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/paul-nelson-baker/git-openssl-shellscript"},"https://github.com/paul-nelson-baker/git-openssl-shellscript")," to\nbuild and install a version of Git with proper SSL support:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# Git does not support OpenSSL out of the box, must do this\ncurl -LO https://github.com/paul-nelson-baker/git-openssl-shellscript/raw/main/compile-git-with-openssl.sh\nchmod +x compile-git-with-openssl.sh\n./compile-git-with-openssl.sh\n")),(0,l.kt)("p",null,"(instructions continued in the MacOS/Linux part)")),(0,l.kt)(s.Z,{value:"osx",label:"MacOS/Linux",mdxType:"TabItem"},(0,l.kt)("p",null,"Initial setup:"),(0,l.kt)("p",null,"0) Ensure mercurial, subversion, and NodeJS are installed. The WSL instructions\nwill have installed these dependencies, so WSL users can skip to step 1."),(0,l.kt)("p",null,"On Linux:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt-get install mercurial subversion\n")),(0,l.kt)("p",null,"On MacOS, install using ",(0,l.kt)("a",{parentName:"p",href:"https://brew.sh/"},(0,l.kt)("inlineCode",{parentName:"a"},"brew")),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"brew install mercurial subversion\n")),(0,l.kt)("p",null,"NodeJS installers can be found at ",(0,l.kt)("a",{parentName:"p",href:"https://nodejs.org/en/download/"},"https://nodejs.org/en/download/")),(0,l.kt)("p",null,"1) Install NodeJS modules for building the scripts"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# Install dev dependencies\nnpm install\n\n# Install global dependencies\nsudo npm i -g mocha@2.5.3 voc @sheetjs/uglify-js\n")),(0,l.kt)("p",null,"2) Initialize the test files:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"make init\n")),(0,l.kt)("p",null,"This step may take a while as it will be downloading a number of test files."),(0,l.kt)("p",null,"3) Run a short test, then run a build"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"# Short test\nmake test_misc\n\n# Full Build\ncd modules; make; cd ..\nmake dist\n")),(0,l.kt)("p",null,"4) (For Deno testing) Install Deno:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"curl -fsSL https://deno.land/install.sh | sh\n")),(0,l.kt)("p",null,"5) (For Bun testing) Install Bun:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"curl https://bun.sh/install | bash\n")))),(0,l.kt)("h2",{id:"development"},"Development"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"xlsx.js")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"xlsx.mjs")," files are constructed from the files in the ",(0,l.kt)("inlineCode",{parentName:"p"},"bits"),"\nsubfolder. The build script (run ",(0,l.kt)("inlineCode",{parentName:"p"},"make"),") will concatenate the individual bits\nto produce the scripts."),(0,l.kt)("p",null,"To produce the dist files, run ",(0,l.kt)("inlineCode",{parentName:"p"},"make dist"),".  The dist files are updated in each\nversion release and ",(0,l.kt)("em",{parentName:"p"},"should not be committed between versions"),"."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"A note on Older Versions")),(0,l.kt)("p",null,"Some of the dependencies are wildly out of date.  While SheetJS aims to run in\nolder versions of NodeJS and browsers, some libraries have chosen to break\nbackwards compatibility.  The specific versions are used because they are known\nto work and known to produce consistent results."),(0,l.kt)("h2",{id:"tests"},"Tests"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"test_misc")," target runs the targeted feature tests.  It should take 5-10\nseconds to perform feature tests without testing against the full test battery.\nNew features should be accompanied with tests for the relevant file formats."),(0,l.kt)("p",null,"For tests involving the read side, an appropriate feature test would involve\nreading an existing file and checking the resulting workbook object.  If a\nparameter is involved, files should be read with different values to verify that\nthe feature is working as expected."),(0,l.kt)("p",null,"For tests involving a new write feature which can already be parsed, appropriate\nfeature tests would involve writing a workbook with the feature and then opening\nand verifying that the feature is preserved."),(0,l.kt)("p",null,"For tests involving a new write feature without an existing read ability, please\nadd a feature test to the kitchen sink ",(0,l.kt)("inlineCode",{parentName:"p"},"tests/write.js"),"."))}h.isMDXComponent=!0}}]);