import Adapter from '@ember-data/adapter';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends Adapter {
  @service spreadsheets;

  createRecord() { throw('Not supported'); }
  updateRecord() { throw('Not supported'); }
  deleteRecord() { throw('Not supported'); }

  findRecord(store, type, id) {
    return this.spreadsheets.fetch(type.modelName).then((objects) => {
      return objects.findBy('id', id);
    });
  }

  findAll(store, type) {
    return this.spreadsheets.fetch(type.modelName);
  }

  query(store, type, query) {
    console.log(query);
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
