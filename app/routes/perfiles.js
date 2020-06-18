import Route from '@ember/routing/route';

const resolver = {
  hospitales: 'institution',
  elecciones: 'election',
  autoridades: 'profile',
  partidos: 'partido'
};

export default class PerfilesRoute extends Route {
  resolver = resolver;

  queryParams = {
    sector: {
      refreshModel: true
    },
    page: { refreshModel: false },
    size: { refreshModel: false }
  };

  model(/* { model, sector } */) {
    return this.store.findAll('institution');
    // let modelName = this.resolver[model];
    // if(sector) {
    //   return this.store.query(modelName, {
    //     sector: sector
    //   });
    // }
    // return this.store.findAll(modelName, { reload: true });
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('allProfiles', model.toArray());
    controller.set('config', model.firstObject);
    controller.set('departamentos', model.mapBy('departamento').uniq());
    // @TODO Refactorizar un requestn o deberia ocurrir aquí
    // controller.set('institutions', this.store.findAll("institution"));
  }
}
