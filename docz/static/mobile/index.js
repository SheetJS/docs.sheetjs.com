/* sheetjs (C) 2013-present  SheetJS -- http://sheetjs.com */
import { utils } from 'xlsx';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Button, Alert, Image, ScrollView } from 'react-native';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

const make_width = ws => {
  const aoa = utils.sheet_to_json(ws, {header:1}), res = [];
  aoa.forEach((r) => { r.forEach((c, C) => { res[C] = Math.max(res[C]||60, String(c).length * 10); }); });
  for(let C = 0; C < res.length; ++C) if(!res[C]) res[C] = 60;
  return res;
};

class SheetJSRN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["SheetJS".split(""),[5,4,3,3,7,9,5],[8,6,7,5,3,0,9]],
      widthArr: Array.from({length:7}, () => 20)
    };
    this.importFile = this.importFile.bind(this);
    this.exportFile = this.exportFile.bind(this);
  };

  async importFile() { try {
    /* select and parse file */
    const wb = await pickAndParse();

    /* convert first worksheet to AOA */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = utils.sheet_to_json(ws, {header:1});

    /* update state */
    this.setState({ data: data, widthArr: make_width(ws) });
  } catch(err) { Alert.alert("importFile Error", "Error " + err.message); }}

  async exportFile() { try {
    /* convert AOA back to worksheet */
    const ws = utils.aoa_to_sheet(this.state.data);

    /* build new workbook */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "SheetJS");

    /* write file */
    const res = await writeWorkbook(wb);
    Alert.alert("exportFile success", "Exported to " + res);
  }  catch(err) { Alert.alert("exportFile Error", "Error " + err.message); }}

  render() { return (
    <ScrollView contentContainerStyle={styles.container} vertical={true}>
      <Text style={styles.welcome}> </Text>
      <Text style={styles.welcome}> <Image source={require("./logo.png")} style={styles.image}/> &nbsp; SheetJS × React Native</Text>
      <Button onPress={this.importFile} title="Import data from a spreadsheet" color="#841584" />
      <Button disabled={!this.state.data.length} onPress={this.exportFile} title="Export data to XLSX" color="#841584" />
      <Text style={styles.bolded}>Current Data</Text>
      <ScrollView style={styles.table} horizontal={true} >
        <Table style={styles.table}>
          <TableWrapper>
            <Row data={this.state.data[0]} style={styles.thead} textStyle={styles.text} widthArr={this.state.widthArr}/>
          </TableWrapper>
          <ScrollView vertical={true}>
            <TableWrapper>
              <Rows data={this.state.data.slice(1)} style={styles.tr} textStyle={styles.text} widthArr={this.state.widthArr}/>
            </TableWrapper>
          </ScrollView>
        </Table>
      </ScrollView>
    </ScrollView>
  ); };
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' },
  welcome: { fontSize: 20, textAlign: 'center', margin: 10 },
  bolded: { textAlign: 'center', color: '#333333', marginBottom: 5, fontWeight: "bold" },
  thead: { height: 40, backgroundColor: '#f1f8ff' },
  tr: { height: 30 },
  text: { marginLeft: 5, },
  table: { width: "100%" },
  image: { height: 16, width: 16 }
});

AppRegistry.registerComponent('SheetJSRN', () => SheetJSRN);