import Route from '@ember/routing/route';
import { scheduleOnce } from '@ember/runloop';

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
  }

});
