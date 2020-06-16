import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';
import Adapter from '@ember-data/adapter';

export default class Application extends Adapter {
  @service
  spreadsheets;

  cache = {};

  createRecord() {
    throw "Not supported";
  }

  updateRecord() {
    throw "Not supported";
  }

  deleteRecord() {
    throw "Not supported";
  }

  findRecord(store, type, id) {

    if (this.cache[type.modelName]) {
      debug(`cached file found: ${type.modelName}`);
      return this.cache[type.modelName].findBy("id", id);
    }

    if (id === "0") {
      return null;
    }

    return this.spreadsheets.fetch(type.modelName).then(objects => {
      this.cache[type.modelName] = objects;
      let result = objects.findBy("id", id);
      return result;
    });
  }

  findAll(store, type) {
    if (this.cache[type.modelName]) {
      debug(`cached file found: ${type.modelName}`);
      return this.cache[type.modelName];
    }

    return this.spreadsheets.fetch(type.modelName).then((objects => {
      this.cache[type.modelName] = objects;
      return objects;
    }));
  }

  query(store, type, query) {
    if (this.cache[type.modelName]) {
      debug(`cached file found: ${type.modelName}`);

      return this.cache[type.modelName].filter(object => {
        return !Object.keys(query).some(key => {
          if (object[key] !== query[key]) {
            return true;
          }
        });
      });
    }

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
}
