import Route from '@ember/routing/route';

const resolver = {
  instituciones: 'institution',
  elecciones: 'election',
  perfiles: 'profile'
};

export default Route.extend({
  resolver: resolver,
  queryParams: {
    sector: false
  },
  model({ model, sector }) {
    let modelName = this.resolver[model];
    if(sector) {
      return this.store.query(modelName, {
        sector: sector
      });
    }
    return this.store.findAll(modelName);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('config', model.firstObject);
  }
});
