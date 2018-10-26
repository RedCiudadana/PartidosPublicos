import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { keys } from '@ember/polyfills';

/**
 * Nos permite utilizar 'store' con nuestro servicio 'spreadsheets'.
 * En otras palabras implementamos EmberData con spreadsheets. 
 * 
 * @class  Adapter.Spreadsheet
 * @extends DS.Adapter
 */
export default DS.Adapter.extend({

  /**
   * @type Service
   */
  spreadsheets: service(),

  /**
   * Returna todos los datos de un modelo.
   * @param  {Model} type  El modelo que queremos usar.
   * @return EmberRecord  Todos los datos de un modelo.
   */
  findAll(_, type) {
    return this.get('spreadsheets').fetch(type);
  },

  /**
   * Utiliza findAll y luego filtra según el id.
   * @param  {Model} type  [description]
   * @param  {integer} id  [description]
   * @return {Object}  Una clase del modelo del objeto si coincidio alguno o 'null'.
   */
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
