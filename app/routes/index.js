import Route from '@ember/routing/route';
import { A } from '@ember/array';

/**
 * Ruta principal '/'.
 *
 * @class Route.Index
 */
export default Route.extend({

  /**
   * Extiende el modelo de application.
   *
   * @method model
   * @return {Object} Objeto con los datos de Route.Application.model().
   */
  model() {
    return this.store.query('profile', {
      // sector: 'justicia',
      sexo: 'Femenino'
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    // this.controllerFor('index').set('profiles', this.modelFor('application').presidents);
  }

});
