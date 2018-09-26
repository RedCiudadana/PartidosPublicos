import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: null,

  model() {
    return this.modelFor('comision.diputado');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.setProperties(model);
  }
});
