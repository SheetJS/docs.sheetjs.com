<script lang="ts">
import logo from './assets/logo.png'
import { onMount } from 'svelte';
import { read, utils, write, version } from 'xlsx';

async function writeFile(wb) {
  const path = await window['go']['main']['App']['SaveFile']();
  const b64 = write(wb, { bookType: path.slice(path.lastIndexOf(".")+1), type: "base64" });
  await window['go']['main']['App']['WriteFile'](b64, path);
  window['go']['main']['App']['ShowInfo']("Saved File", path);
}

async function readFile() {
  const res = await window['go']['main']['App']['ReadFile']();
  if(res.length == 0) throw "failed";
  return res;
}

async function err(body, title = "") {
  return window['go']['main']['App']['ShowError'](title, typeof body == "string" ? body : body.message);
}

let html = "";
let tbl;

/* Fetch and update the state once */
onMount(async() => {
  const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
  const wb = read(f); // parse the array buffer
  const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
  // highlight-start
  html = utils.sheet_to_html(ws); // generate HTML and update state
  // highlight-end
});

/* get state data and export to XLSX */
function exportFile() {
  const elt = tbl.getElementsByTagName("TABLE")[0];
  const wb = utils.table_to_book(elt);
  try { writeFile(wb); } catch(e) { err(e); }
}

/* show file picker, read file, load table */
async function importFile(evt) {
  try {
    const b64 = await readFile();
    const wb = read(b64, { type: "base64" });
    const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    html = utils.sheet_to_html(ws); // generate HTML and update state
  } catch(e) { err(e); }
}

</script>

<main>
  <img alt="Wails logo" id="logo" src="{logo}">
  <div class="result" id="result">SheetJS × Wails {version}</div>
  <button on:click={importFile}>Import File</button>
  <button on:click={exportFile}>Export XLSX</button>
  <div bind:this={tbl} class="ctr">{@html html}</div>
</main>

<style>

  #logo {
    display: block;
    width: 25%;
    height: 25%;
    margin: auto;
    padding: 10% 0 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-origin: content-box;
  }

  .result {
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    font-weight: bold;
    margin: 1.5rem auto;
  }

  .ctr {
    margin-left: auto;
    margin-right: auto;
  }

  .input-box .btn {
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: none;
    margin: 0 0 0 20px;
    padding: 0 8px;
    cursor: pointer;
  }

  .input-box .btn:hover {
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    color: #333333;
  }

  .input-box .input {
    border: none;
    border-radius: 3px;
    outline: none;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: rgba(240, 240, 240, 1);
    -webkit-font-smoothing: antialiased;
  }

  .input-box .input:hover {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

  .input-box .input:focus {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

</style>
