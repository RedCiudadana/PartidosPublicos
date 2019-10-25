import Route from '@ember/routing/route';
import config from '../../config/environment';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);

    if(model.profile._internalModel.modelName === 'institution') {
      controller.set('campos',{
        nombre: 'Nombre',
        sector: 'Sector',
        telefono: 'Telefono'
      });
    }

    if(model.profile._internalModel.modelName === 'profile') {
      controller.set('campos',
        {
          puesto: 'Puesto',
          estadocivil: 'Estado civil',
          profesion: 'Profesión',
          nocolegiado: 'No. Colegiado',
          anosexperiencia: 'Años de experiencia',
        });
    }

    if(model.profile._internalModel.modelName === 'election') {
      controller.set('campos',
        {
          fechaEleccion: 'Fecha a realizarse la elección',
          descripcion: 'Descripción',
          requisitos: 'Requisitos'
        }
      );
    }

    controller.setProperties(model);
    controller.setProperties({
      disqusShortname: config.disqus.shortname,
      years: true,
      charge: true
    });
  }
});
