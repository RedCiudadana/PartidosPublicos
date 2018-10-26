import SpreadsheetAdapter from './spreadsheet';

export default SpreadsheetAdapter.extend({
  findAll() {
    return this.get('spreadsheets').fetch('postuladores-comision');
  }
});
