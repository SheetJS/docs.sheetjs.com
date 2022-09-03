import React, { useEffect, useState, ChangeEvent } from "react";
import DataGrid, { textEditor, Column } from "react-data-grid";
import { read, utils, WorkSheet, writeFile } from "xlsx";

import './App.css';

type DataSet = { [index: string]: WorkSheet; };
type Row = any[];
type AOAColumn = Column<Row>;
type RowCol = { rows: Row[]; columns: AOAColumn[]; };

function arrayify(rows: any[]): Row[] {
  return rows.map(row => {
    if(Array.isArray(row)) return row;
    var length = Object.keys(row).length;
    for(; length > 0; --length) if(row[length-1] != null) break;
    return Array.from({length, ...row});
  });
}

/* this method returns `rows` and `columns` data for sheet change */
const getRowsCols = ( data: DataSet, sheetName: string ): RowCol => ({
  rows: utils.sheet_to_json<Row>(data[sheetName], {header:1}),
  columns: Array.from({
    length: utils.decode_range(data[sheetName]["!ref"]||"A1").e.c + 1
  }, (_, i) => ({ key: String(i), name: utils.encode_col(i), editor: textEditor }))
});

export default function App() {
  const [rows, setRows] = useState<Row[]>([]); // data rows
  const [columns, setColumns] = useState<AOAColumn[]>([]); // columns
  const [workBook, setWorkBook] = useState<DataSet>({} as DataSet); // workbook
  const [sheets, setSheets] = useState<string[]>([]); // list of sheet names
  const [current, setCurrent] = useState<string>(""); // selected sheet

  /* called when sheet dropdown is changed */
  function selectSheet(name: string) {
    /* update workbook cache in case the current worksheet was changed */
    workBook[current] = utils.aoa_to_sheet(arrayify(rows));

    /* get data for desired sheet and update state */
    const { rows: new_rows, columns: new_columns } = getRowsCols(workBook, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  /* this method handles refreshing the state with new workbook data */
  async function handleAB(file: ArrayBuffer): Promise<void> {
    /* read file data */
    const data = read(file);

    /* update workbook state */
    setWorkBook(data.Sheets);
    setSheets(data.SheetNames);

    /* select the first worksheet */
    const name = data.SheetNames[0];
    const { rows: new_rows, columns: new_columns } = getRowsCols(data.Sheets, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  /* called when file input element is used to select a new file */
  async function handleFile(ev: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = await ev.target.files?.[0]?.arrayBuffer();
    if(file) await handleAB(file);
  }

  /* when page is loaded, fetch and processs worksheet */
  useEffect(() => { (async () => {
      const f = await fetch("https://sheetjs.com/pres.numbers");
      await handleAB(await f.arrayBuffer());
  })(); }, []);

  /* method is called when one of the save buttons is clicked */
  function saveFile(ext: string): void {
    console.log(rows);
    /* update current worksheet in case changes were made */
    workBook[current] = utils.aoa_to_sheet(arrayify(rows));

    /* construct workbook and loop through worksheets */
    const wb = utils.book_new();
    sheets.forEach((n) => { utils.book_append_sheet(wb, workBook[n], n); });

    /* generate a file and download it */
    writeFile(wb, "SheetJSRDG." + ext);
  }

  return (
    <>
      <h3>SheetJS × React-Data-Grid Demo</h3>
      <input type="file" onChange={handleFile} />
      {sheets.length > 0 && ( <>
        <p>Use the dropdown to switch to a worksheet:&nbsp;
          <select onChange={async (e) => selectSheet(sheets[+(e.target.value)])}>
            {sheets.map((sheet, idx) => (<option key={sheet} value={idx}>{sheet}</option>))}
          </select>
        </p>
        <div className="flex-cont"><b>Current Sheet: {current}</b></div>
        <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
        <p>Click one of the buttons to create a new file with the modified data</p>
        <div className="flex-cont">{["xlsx", "xlsb", "xls"].map((ext) => (
          <button key={ext} onClick={() => saveFile(ext)}>export [.{ext}]</button>
        ))}</div>
      </>)}
    </>
  );
}
