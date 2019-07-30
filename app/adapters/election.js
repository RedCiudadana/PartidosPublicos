import SpreadsheetAdapter from './spreadsheet';

export default class Election extends SpreadsheetAdapter {
  find(id) {
    return this.spreadsheets.fetch('elections').filterBy('id', id);
  }

  findAll() {
    return this.spreadsheets.fetch('elections');
  }
}
