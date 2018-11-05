import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: null,

  model() {
    return this.modelFor('perfil');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('perfilUnoId', model.profile.get('id'));

    let frenteAFrenteFields = this.store.serializerFor('magistrate').get('frenteAFrenteFields');

    controller.set('frenteAFrenteFields', frenteAFrenteFields);
  },

  actions: {
  }
});
