import SpreadsheetAdapter from './spreadsheet';

export default class Institution extends SpreadsheetAdapter {
  findRecord(store, type, id) {
    return this.spreadsheets.fetch('institucion').then((instituciones) => {
      return instituciones.findBy('id', id);
    });
  }

  query(store, type, query) {
    return this.spreadsheets.fetch('institucion').then((instituciones) => {
      return instituciones.filterBy('sector', query.sector);
    });
  }

  findAll() {
    return this.spreadsheets.fetch('institucion');
  }
}
