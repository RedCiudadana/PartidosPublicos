import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { hash } from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
  spreadsheets: service(),
  _routing: service('-routing'),

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

  afterModel(model) {
    if (!isNone(model.perfil.get('nombre'))) {
      this.set('breadCrumb', {
        title: model.perfil.get('nombre')
      });
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    model.config.perfilFuncionalidades = model.perfilFuncionalidades;
  },

  actions: {
    didTransition() {
      window.scrollTo(0, 0);
    }
  }
});
