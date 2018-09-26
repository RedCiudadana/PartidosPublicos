import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: null,

  model() {
    return this.modelFor('perfil');
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('perfilUnoId', model.perfil.get('id'));
    controller.set(
      'frenteAFrenteFuncionalidad',
      model
        .config
        .perfilFuncionalidades
        .findBy('route', 'perfil.frente-a-frente')
    );

    let frenteAFrenteFields = this.store.serializerFor('magistrate').get('frenteAFrenteFields');

    controller.set('frenteAFrenteFields', frenteAFrenteFields);
  },

  actions: {
  }
});
