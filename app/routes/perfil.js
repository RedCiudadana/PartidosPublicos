import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { hash } from 'rsvp';
import { A } from '@ember/array';

/**
 * Perfil Route
 *
 * @class Route.Perfil
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
   * @return {Object} Datos del perfil según el id. Algunos campos son: config, perfil, institucion, partidoActual, perfilInformacionGeneralConfiguracion, perfiles, documentosDisponibles, datosTablaGradacion, totalPuntajeGradacion, perfilFuncionalidades, entre otros.
   */
  model(params) {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');
    const perfil = this.store.peekRecord('perfil', params.id);
    const institucion = perfil.get('institucion');
    const partidoActual = perfil.get('partidoActual');

    return hash({
      config: {},
      perfil: perfil,
      institucion: institucion,
      partidoActual: partidoActual,
      perfilInformacionGeneralConfiguracion: spreadsheet
        .fetchConfig('perfil-informacion-general-configuracion'),
      perfiles: this.modelFor('application').perfiles,
      documentosDisponibles: spreadsheet
        .fetch('documentos-disponibles')
        .then((documentos) => {
          return A(documentos)
            .filterBy('perfil', perfil.get('id'));
        }),
      datosTablaGradacion: spreadsheet
        .fetch('tabla-gradacion')
        .then((registros) => {
          return A(registros)
            .filterBy('perfil', perfil.get('id'))
            .filter((e) => e.aspecto !== 'Total');
        }),
      totalPuntajeGradacion: spreadsheet
        .fetch('tabla-gradacion')
        .then((registros) => {
          return A(registros)
            .filterBy('perfil', perfil.get('id'))
            .filter((e) => e.aspecto !== 'Total' && e.aspecto !== 'Cualidades Éticas y de Probidad')
            .reduce((previousValue, item) => previousValue + parseInt(item.puntaje), 0);
        }),
      perfilFuncionalidades: spreadsheet
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
   * Levanta un controlador y asigna model.config.perfilFuncionalidades = model.perfilFuncionalidades.
   *
   * @method setupController
   * @param  {[type]} controller Clase controller.
   * @param  {[type]} model      Modelo de esta ruta.
   */
  setupController(controller, model) {
    this._super(controller, model);

    model.config.perfilFuncionalidades = model.perfilFuncionalidades;
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
