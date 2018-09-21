import Service from '@ember/service';
import Tabletop from 'tabletop';
import config from '../config/environment';
import {isNotFoundError} from 'ember-ajax/errors';
import { inject as service } from '@ember/service'
import { Promise } from 'rsvp';
import { isNone } from '@ember/utils';

/**
 * this service get data from /static-files/ or Google's spreadsheets, see environmnet.
 * @example
 * import { inject as service } from '@ember/service';
 * spreadsheets: service()
 */

export default Service.extend({

  ajax: service(),

  dataSpreadsheetUrl: null,

  configSpreadsheetUrl: null,

  // flashMessages: service(),

  /**
   * Get data by worksheetname.
   * @param {string} worksheetName - Name of worksheet.
   * @param {string} [spreadsheetKey='data'] - Can be 'data' or 'config', used to get the URL of Google's spreadsheets public file. Only live mode.
   */
  fetch(worksheetName, spreadsheetKey = 'data') {

    // Si config.APP.staticFilesUrl está definido, obtener la data de allí, independiente
    // del spreadsheetKey
    if (!isNone(config.APP.staticFilesUrl)) {
      return this.get('ajax')
        .request(config.APP.staticFilesUrl + worksheetName + '.json')
        .then((response) => {
          return new Promise((resolve) => {
            resolve(response);
          });
        })
        .catch((error) => {
          let errorMessage = 'Error durante carga de data JSON!';

          if (isNotFoundError(error)) {
            errorMessage = `Expected file ${worksheetName}.json not found`;
          }

          // this.get('flashMessages').danger(
          //   errorMessage,
          //   { sticky: true }
          // );

          // throw error;
          console.log(errorMessage);
        });
    }

    return new Promise((resolve) => {

      let spreadsheetUrl = this.get('dataSpreadsheetUrl');

      if ('config' === spreadsheetKey) {
        spreadsheetUrl = this.get('configSpreadsheetUrl');
      }

      Tabletop.init({
        key: spreadsheetUrl,
        callback: (data) => {
          if (isNone(data[worksheetName])) {
            let errorMessage = `Got no answer for spreadsheet ${worksheetName}`;
            // TODO: Get back vorkin
            // this.get('flashMessages').danger(errorMessage, {sticky: true});

            // TODO: Convertir en alerta de console.log
            console.log(errorMessage);

            return resolve();
          }

          if (isNone(data[worksheetName].elements)) {
            let errorMessage = `Got a problem with the elements for spreadsheet ${worksheetName}`;
            // TODO: Get back vorkin
            // this.get('flashMessages').danger(errorMessage, {sticky: true});

            // TODO: Convertir en alerta de console.log
            console.log(errorMessage);

            return resolve();
          }

          resolve(data[worksheetName].elements);
        }
      });
    });
  },

  /**
   * Wrap of fetch with spreadsheetKey='config'.
   * @param  {string} worksheetName Name of worksheet.
   * @return {Promise<string[], MyError>} Promise data.
   */
  fetchConfig(worksheetName) {
    return this.fetch(worksheetName, 'config');
  }
});
