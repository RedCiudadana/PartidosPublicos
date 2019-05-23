
import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { keys } from '@ember/polyfills';

export default DS.Adapter.extend({
  spreadsheets: service(),

  findAll(_, type) {
    return this.spreadsheets.fetch(type);
  },

  find(store, type, id) {
    return this.findAll(store, type).then(function(data) {
      return data.findBy('id', id);
    });
  },

  findQuery: function(store, type, query) {
    return this.findAll(store, type).then(function(data) {
      return data.filter(function(datum) {
        return keys(query).every(function(key) {
          return datum[key] === query[key];
        });
      });
    });
  },

  createRecord() { throw('Not supported'); },
  updateRecord() { throw('Not supported'); },
  deleteRecord() { throw('Not supported'); }
});