<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import { read, write, utils, version, WorkBook } from 'xlsx';
import { DialogFilter, message, open, save } from '@tauri-apps/api/dialog';
import { fetch, ResponseType } from '@tauri-apps/api/http';
import { readBinaryFile, writeBinaryFile } from '@tauri-apps/api/fs';

const ver = ref(version);
const data = shallowRef<any[][]>([[]])
const origin = ref("");

const update = (wb: WorkBook) => {
  const ws = wb.Sheets[wb.SheetNames[0]];
  data.value = utils.sheet_to_json<any[]>(ws, { header: 1})
};

/* Download from https://sheetjs.com/pres.numbers */
onMounted(async() => {
try {
  origin.value = "https://sheetjs.com/pres.numbers";
  const response = await fetch<Uint8Array>("https://sheetjs.com/pres.numbers", { method: "GET", responseType: ResponseType.Binary });
  const wb = read(new Uint8Array(response.data));
  update(wb);
} catch(e) { await message((e as Error).message || (e as string), { title: "Fetch Error", type: "error"}); }
});

const filters: DialogFilter[] = [
  {name: "Excel Binary Workbook", extensions: ["xlsb"]},
  {name: "Excel Workbook", extensions: ["xlsx"]},
  {name: "Excel 97-2004 Workbook", extensions: ["xls"]},
  {name: "Excel 2003 XML Spreadsheet", extensions: ["xml"]},
  {name: "Symbolic Link", extensions: ["slk"]},
  {name: "Flat OpenDocument Spreadsheet", extensions: ["fods"]},
  {name: "OpenDocument Spreadsheet", extensions: ["fods"]},
  // ...
];

/* Load from File */
const openFile = async() => {
try {
  const selected = await open({
    title: "Open Spreadsheet",
    multiple: false,
    directory: false,
    filters
  }) as string;
  const d = await readBinaryFile(selected);
  const wb = read(d);
  update(wb);
  origin.value = selected;
} catch(e) { await message((e as Error).message || (e as string), { title: "Load Error", type: "error"}); }
};

/* Save to File */
const saveFile = async() => {
try {
  const selected = await save({
    title: "Save to Spreadsheet",
    filters
  });
  const ws = utils.aoa_to_sheet(data.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "SheetJSTauri");
  const d = write(wb, {type: "buffer", bookType: selected.slice(selected.lastIndexOf(".") + 1) as any}) as Uint8Array;
  await writeBinaryFile(selected, d);
  await message(`File saved to ${selected}`);
} catch(e) { await message((e as Error).message || (e as string), { title: "Save Error", type: "error"}); }
};
</script>

<template>
  <div>
    <h1><a href="https://sheetjs.com" target="_blank">
      <img src="https://sheetjs.com/sketch128.png" class="logo" alt="SheetJS" />
    SheetJS × Tauri {{ ver }}</a></h1>

    <button type="button" @click="openFile()">Load Data</button> or
    <button type="button" @click="saveFile()">Save Data</button>
    <p><b>Data from {{ origin }}</b></p>
    <table class="center"><tbody>
    <tr v-for="(row, index) in data" v-bind:key="index">
      <td v-for="(cell, col) in row" v-bind:key="col">
        {{ cell }}
      </td>
    </tr>
    </tbody></table>
  </div>
</template>

<style scoped>
.logo {
  height: 64px; width: 64px;
  vertical-align: text-top;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
table.center {
  margin-left: auto;
  margin-right: auto;
}
</style>