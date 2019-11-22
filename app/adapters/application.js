import Adapter from '@ember-data/adapter';
import { inject as service } from '@ember/service';

export default Adapter.extend({
  spreadsheets: service(),

  createRecord() {
    throw "Not supported";
  },
  updateRecord() {
    throw "Not supported";
  },
  deleteRecord() {
    throw "Not supported";
  },

  findRecord(store, type, id) {
    if (id === "0") {
      return null;
    }

    return this.spreadsheets.fetch(type.modelName).then(objects => {
      let result = objects.findBy("id", id);
      return result;
    });
  },

  findAll(store, type) {
    return this.spreadsheets.fetch(type.modelName);
  },

  query(store, type, query) {
    return this.spreadsheets.fetch(type.modelName).then(objects => {
      return objects.filter(object => {
        return !Object.keys(query).some(key => {
          if (object[key] !== query[key]) {
            return true;
          }
        });
      });
    });
  }
});
