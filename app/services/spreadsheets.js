import Service from '@ember/service';
import Tabletop from 'tabletop';
import config from '../config/environment';
import {isNotFoundError} from 'ember-ajax/errors';
import { inject as service } from '@ember/service'
import { Promise } from 'rsvp';
import { isNone } from '@ember/utils';

export default Service.extend({

  ajax: service(),

  dataSpreadsheetUrl: null,

  configSpreadsheetUrl: null,

  // flashMessages: service(),

  /**
   * Los posibles valores para spreadsheetKey son 'data' y 'config'
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

  fetchConfig(worksheetName) {
    return this.fetch(worksheetName, 'config');
  }
});
