import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { A } from '@ember/array';

const resolver = {
  instituciones: 'institution',
  elecciones: 'election',
  perfiles: 'profile'
};

/**
 * profile Route
 *
 * @class Route.profile
 */
export default Route.extend({
  resolver: resolver,

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
  model({ model, id}) {
    const spreadsheet = this.spreadsheets;
    const _routing = this._routing;

    return this.store.findRecord(resolver[model], id).then((profile) => {
      return hash({
        config: {},
        profile: profile,
        profiles: this.store.query('profile', {
          institucion: profile.name
        }),
        comissions: this.store.query('election', {
          institution: profile.name
        }),
        candidates: this.store.query('profile', {
          election: profile.name
        }),
        commissioners: this.store.query('profile', {
          comission: profile.name
        })
      });
    });

    /**
     * @TODO Revisar que va la pena conservar.
     * @TODO Validar en el caso que no exite perifl, aunque nunca deberia pasar.
     */
    // Obtiene el partido actual del profile
    // const currentParty = profile.get('partido');

      // currentParty: currentParty,
      // availableInfo: spreadsheet
      //   .fetch('info-' + this.types[model])
      //   .then((documentos) => {
      //     return documentos.findBy('id', profile.get('id'));
      //   }),
      // profileFunctions: spreadsheet
      //   .fetchConfig('perfil-funcionalidades')
      //   .then((links) => {
      //     return A(links)
      //       .filter((link) => {
      //         if (link.link) {
      //           return true;
      //         }

      //         if (!_routing.hasRoute(link.route)) {
      //           throw new Error(`Route not recognized: ${link.route}`);
      //         }

      //         return true;
      //       });
      //   }),
      // fuentes: spreadsheet
      //   .fetch('fuentes')
      //   .then((documento) => {
      //     return documento.filterBy('perfil', profile.get('id'));
      // }),
      // entrevistas: spreadsheet
      //   .fetch('entrevistas')
      //   .then((documento) => {
      //     return documento.filterBy('perfil', profile.get('id'));
      // }),
      // historial: spreadsheet
      //   .fetch('historial')
      //   .then((documento) => {
      //     return documento.filterBy('perfil', profile.get('id'));
      // })
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

    // model.config.profileFunctions = model.profileFunctions;
    // this.controllerFor('perfil.index').set('isPresident', model.profile.type === 'president');
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
