import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import EmberObject from '@ember/object';
import { hash } from 'rsvp';
import { A } from '@ember/array';

/**
 * Institucion Route
 *
 * @class Route.Institucion
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
   * Model hook. Obtiene las funcionalidades, configuraciones y datos de las instituciones.
   *
   * @method model
   * @return {Object} Datos de instituciones.
   */
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

  /**
   * Levanta un controlador y asigna unos valores con datos del modelo. Tambien asigna model.informacionGeneral  como un objeto con la información a mostrar de la institución con los datos de model.config.institucionInformacionGeneral.
   *
   * @method setupController
   * @param  {[type]} controller Clase controller.
   * @param  {[type]} model      Modelo de esta ruta.
   */
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
