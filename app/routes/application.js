import Ember from 'ember';
import config from '../config/environment';
import injectScript from 'ember-inject-script';

const { isBlank, RSVP: { Promise }, set } = Ember;

export default Ember.Route.extend({

  spreadsheets: Ember.inject.service(),

  _routing: Ember.inject.service('-routing'),

  ajax: Ember.inject.service(),

  breadCrumb: {
    title: 'application breadcrumb'
  },

  /**
   * Setear la URL de datos y de configuración en el servicio spreadhseet.
   * 
   * Además procesar los campos de información general del perfil.
   *
   * TODO: Hacer esto en un lugar más decente, por amor al Señor
   */
  beforeModel() {
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
        if (!Ember.isBlank(config.APP.configSpreadsheetSourceUrl)) {
          return this.get('ajax')
            .request(config.APP.configSpreadsheetSourceUrl, { dataType: 'text' })
            .then((response) => spreadsheetService.set('configSpreadsheetUrl', response));
        }

        return Promise.resolve(this);
      })

      .then(() => Ember.RSVP.all([
        /**
         * Setear la información general del perfil mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('perfil-informacion-general-configuracion')
          .then((configuracionData) => {
            let perfilDataArray = Ember.A([]);

            Ember.A(configuracionData).forEach((item) => {
              perfilDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('perfil');

            prefilSerializer.set('informacionGeneralFields', perfilDataArray);
          }),

        /**
         * Setear la información de recuadros del perfil mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('perfil-recuadros-configuracion')
          .then((configuracionData) => {
            let perfilRecuadrosDataArray = Ember.A([]);

            Ember.A(configuracionData).forEach((item) => {
              perfilRecuadrosDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('perfil');

            prefilSerializer.set('recuadrosFields', perfilRecuadrosDataArray);
          }),

        // Información general de diputado
        // TODO: Evaluar pertinencia, ya que es una funcionalidad específica de
        // Elección PDH
        spreadsheetService
          .fetchConfig('diputado-informacion-general-configuracion')
          .then((configuracionData) => {
            let diputadoDataArray = Ember.A([]);

            Ember.A(configuracionData).forEach((item) => {
              diputadoDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let diputadoSerializer = this.store.serializerFor('diputado-comision');

            diputadoSerializer.set('informacionGeneralFields', Ember.A());
            diputadoSerializer.set('frenteAFrenteFields', Ember.A());
          }),

        /**
         * Setear los campos a utilizar en la funcionalidad de frente-a-frente
         */
        spreadsheetService
          .fetchConfig('perfil-frente-a-frente-configuracion')
          .then((configuracionData) => {
            let perfilFrenteAFrenteDataArray = Ember.A([]);

            Ember.A(configuracionData).forEach((item) => {
              perfilFrenteAFrenteDataArray.pushObject({
                field: item.field,
                label: item.label,
                section: item.section
              });
            });

            let prefilSerializer = this.store.serializerFor('perfil');

            prefilSerializer.set('frenteAFrenteFields', perfilFrenteAFrenteDataArray);
          })
      ]));
  },

  model() {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return Ember.RSVP.hash({
      partidos: this.store.findAll('partido'),
      perfiles: this.store.findAll('perfil'),
      config: spreadsheet.fetchConfig('configuracion')
        .then((configuracion) => {
          let configObject = Ember.Object.create();

          Ember.A(configuracion).forEach((item) => {
            configObject.set(item.key, item.value);
          });

          /**
           * Inject HelloBar if defined
           */
          if (!isBlank(configObject.helloBarUrl)) {
            injectScript(configObject.helloBarUrl);
          }

          return configObject;
        }),

      /**
       * Header links, top right
       */
      navbarLinks: spreadsheet.fetchConfig('navbar-links').then((links) => {
        return Ember.A(links).filter((link) => {
          return _routing.hasRoute(link.route);
        });
      }),

      /**
       * Front page image links.
       *
       * If the row does not include a link property it gets dissmissed
       */
      mainPageLinks: spreadsheet.fetchConfig('main-page-links').then((links) => {
        return Ember.A(links).filter((link) => {
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
          let institucionDataObject = Ember.Object.create();

          Ember.A(institucionData).forEach((item) => {
            institucionDataObject.set(item.key, item.value);
          });

          return institucionDataObject;
        }),

      frontTableVisualizationConfig: spreadsheet.fetchConfig('front-table-visualization-config')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    set(model.config, 'navbarLinks', model.navbarLinks);
    set(model.config, 'mainPageLinks', model.mainPageLinks);
    set(model.config, 'mainPageSliderData', model.mainPageSliderData);
  },

  actions: {
    selectPerfil(candidato) {
      this.transitionTo('perfil', candidato.get('id'));
    }
  }
});
