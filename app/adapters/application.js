import Adapter from '@ember-data/adapter';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends Adapter {
  @service spreadsheets;

  findRecord() { throw 'Not suported method.' }
  createRecord() { throw 'Not suported method.' }
  updateRecord() { throw 'Not suported method.' }
  deleteRecord() { throw 'Not suported method.' }
  findAll() { throw 'Not suported method.' }

  query(store, type, query) {
    return this.spreadsheets.fetch(type.modelName).then((objects) => {
      return objects.filter((object) => {
        return !Object.keys(query).some((key) => {
          if (object[key] !== query[key]) {
            return true;
          }
        });
      });
    });
  }
}
