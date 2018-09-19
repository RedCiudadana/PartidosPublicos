import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import EmberObject from '@ember/object';
import { hash } from 'rsvp';
import { A } from '@ember/array';

// TODO: Pendiente de completar implementación de pantalla de institución
export default Route.extend({
  spreadsheets: service(),
  _routing: service('-routing'),

  model() {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return hash({
      config: {},
      institucionFuncionalidades: spreadsheet
        .fetch('institucion-funcionalidades')
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
        }),
      institucionInformacionGeneralConfiguracion: spreadsheet
        .fetch('institucion-informacion-general-configuracion'),
      institucionData: spreadsheet
        .fetch('institucion-data')
        .then((institucionData) => {
          let institucionDataObject = EmberObject.create();

          A(institucionData).forEach((item) => {
            institucionDataObject.set(item.key, item.value);
          });

          return institucionDataObject;
        }),
    });
  },

  afterModel(model) {
    if (!isNone(model.institucionData.nombre)) {
      this.set('breadCrumb', {
        title: model.institucionData.nombre
      });
    }
  },

  setupController(controller, model) {
    this._super(controller, model);

    // TODO: validar que no vengan configurados campos no encontrados en la información
    // de la institución

    model.config.institucionFuncionalidades = model.institucionFuncionalidades;
    model.config.institucionInformacionGeneral = model.institucionInformacionGeneralConfiguracion;

    model.informacionGeneral = {};
    A(model.config.institucionInformacionGeneral)
      .map((element) => {

        if (isNone(model.institucionData[element.field])) {
          throw new Error(`Property '${element.field}' of institucion unedfined`);
        }

        model.informacionGeneral[element.field] = {
          label: element.label,
          value: model.institucionData[element.field]
        };
      });
  }
});
