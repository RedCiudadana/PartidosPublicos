import Service from '@ember/service';
import config from '../config/environment';
import fetch from 'fetch';
import { Promise } from 'rsvp';
import { debug } from '@ember/debug';

/**
 * Servicios para obtener datos desde /static-files/ or Google's spreadsheets, según la configuración en 'environment'.
 * Para generar los archivos ejecutar 'node build-data.js'. Antes revisar la documentación en la carpeta 'Documentation'.
 * Preferiblemente usar 'static-files' porque el 'live-mode' es muy lento por la forma que obtiene los datos.
 *
 * @class Service.Spreadsheets
 * @example
 * import { inject as service } from '@ember/service';
 * spreadsheets: service()
 */

export default class SpreadsheetsService extends Service {
  /**
   * URL de la hoja de datos (perfiles, partidos, etc). Luego se obtiene de 'environment'
   *
   * @property dataSpreadsheetUrl
   * @type String
   * @default null
   */
  dataSpreadsheetUrl = null;

  /**
   * URL de la hoja de configuraciones (aspecto de la pagina, campos de perfiles, etc). Luego se obtiene de 'environment'
   *
   * @property configSpreadsheetUrl
   * @type String
   * @default null
   */
  configSpreadsheetUrl = null;

  cache = {};

  // flashMessages: service(),

  /**
   * Obtiene datos de una hoja especifica.
   *
   * @method fetch
   * @param {string} worksheetName - Nombre de la hoja.
   */
  fetch(worksheetName) {
    if (this.cache[worksheetName]) {
      debug(`cached file found: ${worksheetName}`);

      return new Promise((resolve) => {
        resolve(this.cache[worksheetName]);
      });
    }

    return fetch(config.APP.staticFilesUrl + worksheetName + '.json')
      .then((response) => {
        return new Promise((resolve) => {
          response.json().then((json) => {
            this.cache[worksheetName] = json;
            resolve(json);
          });
        });
      })
      .catch(() => {
        /* AJAX muestra un error */
      });
  }

  /**
   * Wrap de fetch que tiene 'spreadsheetKey' como 'config'.
   *
   * @method fetchConfig
   * @param  {string} worksheetName Nombre de la hoja.
   * @return {Promise<string[], MyError>} Promesa con los datos.
   */
  fetchConfig(worksheetName) {
    return this.fetch(worksheetName, 'config');
  }
}
