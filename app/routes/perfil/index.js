import Route from '@ember/routing/route';
import config from '../../config/environment';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    if(model.profile._internalModel.modelName === 'institution') {
      controller.set('campos',
        ['nombre', 'sector', 'telefono']);
    }

    if(model.profile._internalModel.modelName === 'profile') {
      controller.set('campos',
        ['puesto', 'estadocivil', 'profesion', 'nocolegiado', 'anosexperiencia']);
    }

    if(model.profile._internalModel.modelName === 'election') {
      controller.set('campos',
        ['nombre', 'fechaEleccion']);
    }

    controller.setProperties(model);
    controller.setProperties({
      disqusShortname: config.disqus.shortname,
      years: true,
      charge: true
    });
  }
});
