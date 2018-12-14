import Route from '@ember/routing/route';

const types = {
  presidentes: 'president',
  diputados: 'deputie',
  parlacen: 'parlacen',
  alcaldes: 'mayor'
};

export default Route.extend({

  types: types,

  model(params) {
    return this.modelFor('application')[this.get('types')[params.type] + 's'];
  }
});
