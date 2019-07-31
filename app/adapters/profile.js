import SpreadsheetAdapter from './spreadsheet';

export default class Profile extends SpreadsheetAdapter {
  findRecord(store, type, id) {
    return this.spreadsheets.fetch('perfil').then((perfiles) => {
      return perfiles.findBy('id', id);
    });
  }

  query(store, type, query) {
    return this.spreadsheets.fetch('perfil').then((perfiles) => {
      return perfiles.filterBy('institution', query.institution);
    });
  }

  findAll() {
    return this.spreadsheets.fetch('perfil');
  }
}
