import Route from '@ember/routing/route';

const types = {
  presidentes: 'president',
  listado: 'listado',
  distrito: 'distrito',
  parlacen: 'parlacen',
  alcaldes: 'mayor'
};

export default Route.extend({

  types: types,

  model(params) {
    return this.modelFor('application')[this.get('types')[params.type] + 's'];
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('perfiles').set('config', model.firstObject);
  }
});
