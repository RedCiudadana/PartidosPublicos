import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { A } from '@ember/array';

/**
 * profile Route
 *
 * @class Route.profile
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
   * Model hook. Obtiene toda la información de un perfil según el id que obtiene de 'params'.
   *
   * @method model
   * @return {Object} Datos del perfil según el id. Algunos campos son: config, perfil, institucion, currentParty, profileGeneralInformationConfiguration, profiles, avaibleDocuments, dataTableGradation, totalGraduationScore, profileFunctions, entre otros.
   */
  model(params) {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    // Obtiene el profile según el id
    const profile = this.store.peekRecord('magistrate', params.id);
    // Obtiene el partido actual del profile
    const currentParty = profile.get('partidoActual');

    return hash({
      config: {},
      profile: profile,
      currentParty: currentParty,
      profileGeneralInformationConfiguration: spreadsheet
        .fetchConfig('perfil-informacion-general-configuracion'),
      profiles: this.modelFor('application').profiles,
      avaibleDocuments: spreadsheet
        .fetch('documentos-disponibles')
        .then((documentos) => {
          return A(documentos)
            .filterBy('profile', profile.get('id'));
        }),
      dataTableGradation: spreadsheet
        .fetch('tabla-gradacion')
        .then((registros) => {
          return A(registros)
            .filterBy('profile', profile.get('id'))
            .filter((e) => e.aspecto !== 'Total');
        }),
      totalGraduationScore: spreadsheet
        .fetch('tabla-gradacion')
        .then((registros) => {
          return A(registros)
            .filterBy('profile', profile.get('id'))
            .filter((e) => e.aspecto !== 'Total' && e.aspecto !== 'Cualidades Éticas y de Probidad')
            .reduce((previousValue, item) => previousValue + parseInt(item.puntaje), 0);
        }),
      profileFunctions: spreadsheet
        .fetchConfig('perfil-funcionalidades')
        .then((links) => {
          return A(links)
            .filter((link) => {
              if (link.link) {
                return true;
              }

              if (!_routing.hasRoute(link.route)) {
                throw new Error(`Route not recognized: ${link.route}`);
              }

              return true;
            });
        })
    });
  },

  /**
   * Levanta un controlador y asigna model.config.profileFunctions = model.profileFunctions.
   *
   * @method setupController
   * @param  {[type]} controller Clase controller.
   * @param  {[type]} model      Modelo de esta ruta.
   */
  setupController(controller, model) {
    this._super(controller, model);

    model.config.profileFunctions = model.profileFunctions;
  },

  /**
   * Acciones: didTransition.
   * @property actions
   * @type {Object}
   */
  actions: {
    didTransition() {
      window.scrollTo(0, 0);
    }
  }
});
