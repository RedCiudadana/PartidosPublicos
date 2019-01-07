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
    let modelData = A();
    let app = this.modelFor('application');
    modelData.pushObjects(app.presidents.toArray());
    modelData.pushObjects(app.listado.toArray());
    modelData.pushObjects(app.distrito.toArray());
    modelData.pushObjects(app.parlacens.toArray());
    modelData.pushObjects(app.mayors.toArray());
    return modelData;
  }

});
