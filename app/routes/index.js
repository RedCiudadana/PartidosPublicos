import Route from '@ember/routing/route';

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
    return this.modelFor('application');
  },

  setupController: function(controller, models) {
    controller.setProperties(models);
  }

});
