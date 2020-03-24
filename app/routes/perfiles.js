import Route from '@ember/routing/route';

const resolver = {
  hospitales: 'institution',
  elecciones: 'election',
  perfiles: 'profile'
};

export default Route.extend({
  resolver: resolver,
  queryParams: {
    sector: {
      refreshModel: true
    },
    page: { refreshModel: false },
    size: { refreshModel: false }
  },

  model({ model, sector }) {
    let modelName = this.resolver[model];
    if(sector) {
      return this.store.query(modelName, {
        sector: sector
      });
    }
    return this.store.findAll(modelName, { reload: true });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('allProfiles', model.toArray());
    controller.set('config', model.firstObject);
    controller.set('institutions', this.store.findAll("institution"));
  }
});
