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
    return this.modelFor('application')[this.types[params.type] + 's'];
  },

  setupController(controller, model) {
    this._super(controller, model);

    // Limpia los filtros
    controller.set('departamento', null);
    controller.set('municipio', null);
    controller.set('partido', null);
    controller.set('distrito', null);

    controller.set('partidos', this.modelFor('application').parties);

    controller.set('config', model.firstObject);
  }
});
