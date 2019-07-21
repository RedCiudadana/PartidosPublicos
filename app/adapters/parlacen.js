import SpreadsheetAdapter from './spreadsheet';

export default SpreadsheetAdapter.extend({
  findAll() {
    return this.spreadsheets.fetch('parlacen');
  }
});
