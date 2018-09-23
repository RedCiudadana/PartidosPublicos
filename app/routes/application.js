// import injectScript from 'ember-inject-script';
import config from '../config/environment';
import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { Promise } from 'rsvp';
import { set } from '@ember/object';

/**
 * Application Route
 *
 * @class Route.Application
 */
export default Route.extend({

  /**
   * Spreadsheets Service
   *
   * @property spreadsheets
   * @type Service
   */
  spreadsheets: service(),

  /**
   * Routing Service
   *
   * @property _routing
   * @type Service
   */
  _routing: service('-routing'),

  /**
   * Ajax Service
   *
   * @property ajax
   * @type Service
   */
  ajax: service(),

  /**
   * TODO: Hacer esto en un lugar más decente, por amor al Señor
   */
  /**
   * Before model hook. Setear la URL de datos y de configuración en el servicio spreadsheet. Además procesar los campos de información general del perfil.
   *
   * @method beforeModel
   * @param  {Promise} transition 
   * @return {Object}            Un objecto con los datos de la configuración del proyecto desde el sevicio Spreadsheets.
   */
  beforeModel(transition) {
    const spreadsheetService = this.get('spreadsheets');

    // TODO: Agregar validación: si config.APP.dataSpreadsheetSourceUrl no esta definida,
    // lanzar error

    // Si en los query parameters viene definido el valor para 'loadDataFromSpreadsheet',
    // hacer override a la configuración para forzar la carga de data de los spreadsheets
    if (transition.queryParams.hasOwnProperty('loadDataFromSpreadsheet')) {
      config.APP.staticFilesUrl = null;
    }

    return this.get('ajax')

      .request(config.APP.dataSpreadsheetSourceUrl, { dataType: 'text' })

      .then((response) => {
        spreadsheetService.set('dataSpreadsheetUrl', response);
        spreadsheetService.set('configSpreadsheetUrl', response);

        // Si config.APP.configSpreadsheetSourceUrl está definida, entonces obtener
        // también ese valor y setearlo en el spreadsheet service
        if (!isBlank(config.APP.configSpreadsheetSourceUrl)) {
          return this.get('ajax')
            .request(config.APP.configSpreadsheetSourceUrl, { dataType: 'text' })
            .then((response) => spreadsheetService.set('configSpreadsheetUrl', response));
        }

        return Promise.resolve(this);
      })

      .then(() => RSVP.all([
        /**
         * Setear la información general del perfil mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('perfil-informacion-general-configuracion')
          .then((configuracionData) => {
            let perfilDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('magistrate');

            prefilSerializer.set('informacionGeneralFields', perfilDataArray);
          }),

        /**
         * Setear la información de recuadros del perfil mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('perfil-recuadros-configuracion')
          .then((configuracionData) => {
            let perfilRecuadrosDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilRecuadrosDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('magistrate');

            prefilSerializer.set('recuadrosFields', perfilRecuadrosDataArray);
          }),

        // Información general de diputado
        // TODO: Evaluar pertinencia, ya que es una funcionalidad específica de
        // Elección PDH
        spreadsheetService
          .fetchConfig('diputado-informacion-general-configuracion')
          .then((configuracionData) => {
            let diputadoDataArray = A([]);

            A(configuracionData).forEach((item) => {
              diputadoDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let diputadoSerializer = this.store.serializerFor('diputado-comision');

            diputadoSerializer.set('informacionGeneralFields', A());
            diputadoSerializer.set('frenteAFrenteFields', A());
          }),

        /**
         * Setear los campos a utilizar en la funcionalidad de frente-a-frente
         */
        spreadsheetService
          .fetchConfig('perfil-frente-a-frente-configuracion')
          .then((configuracionData) => {
            let perfilFrenteAFrenteDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilFrenteAFrenteDataArray.pushObject({
                field: item.field,
                label: item.label,
                section: item.section
              });
            });

            let prefilSerializer = this.store.serializerFor('magistrate');

            prefilSerializer.set('frenteAFrenteFields', perfilFrenteAFrenteDataArray);
          })
      ]));
  },

  /**
   * Model hook
   *
   * @method model
   * @return {Object} Datos de nuestro aplicación, perfiles y datos de configuración.
   */
  model() {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return hash({
      partidos: this.store.findAll('partido'),
      perfiles: this.store.findAll('magistrate'),
      config: spreadsheet.fetchConfig('configuracion')
        .then((configuracion) => {
          let configObject = EmberObject.create();

          A(configuracion).forEach((item) => {
            configObject.set(item.key, item.value);
          });

          /**
           * Inject HelloBar if defined
           */
          // if (!isBlank(configObject.helloBarUrl)) {
          //   injectScript(configObject.helloBarUrl);
          // }

          return configObject;
        }),

      /**
       * Header links, top right
       */
      navbarLinks: spreadsheet.fetchConfig('navbar-links').then((links) => {
        return A(links).filter((link) => {
          return _routing.hasRoute(link.route);
        });
      }),

      /**
       * Front page image links.
       *
       * If the row does not include a link property it gets dissmissed
       */
      mainPageLinks: spreadsheet.fetchConfig('main-page-links').then((links) => {
        return A(links).filter((link) => {
          if (link.link) {
            return true;
          }

          return _routing.hasRoute(link.route);
        });
      }),

      /**
       * Main page slider profiles list
       */
      mainPageSliderData: spreadsheet.fetchConfig('main-page-slider-data'),

      institucionData: spreadsheet
        .fetch('institucion-data')
        .then((institucionData) => {
          let institucionDataObject = EmberObject.create();

          A(institucionData).forEach((item) => {
            institucionDataObject.set(item.key, item.value);
          });

          return institucionDataObject;
        }),

      frontTableVisualizationConfig: spreadsheet.fetchConfig('front-table-visualization-config')
    });
  },

  /**
   * Levanta un controlador y asigna unos valores.
   *
   * @method setupController
   * @param  {[type]} controller Clase controller.
   * @param  {[type]} model      Modelo de esta ruta.
   */
  setupController(controller, model) {
    this._super(controller, model);

    set(model.config, 'navbarLinks', model.navbarLinks);
    set(model.config, 'mainPageLinks', model.mainPageLinks);
    set(model.config, 'mainPageSliderData', model.mainPageSliderData);
  },

  /**
   * Acciones: selectPerfil.
   * @property actions
   * @type {Object}
   */
  actions: {
    selectPerfil(candidato) {
      this.transitionTo('perfil', candidato.get('id'));
    }
  }
});
