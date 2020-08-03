import Route from '@ember/routing/route';
import config from '../../config/environment';

export default class IndexRoute extends Route {
  queryParams = {
    page: { refreshModel: false },
    size: { refreshModel: false }
  };

  setupController(controller, model) {
    super.setupController(controller, model);

    if(model.profile._internalModel.modelName === 'partido') {
      controller.set('campos',{
        nombre: 'Nombre',
        lema: 'Lema',
        fundacion: 'Fundación',
        direccion: 'Dirección',
        telefono: 'Teléfono'
      });
    }

    if(model.profile._internalModel.modelName === 'institution') {
      controller.set('campos',{
        horarioVisita: 'Horario de atención',
        telefono: 'Teléfono',
        direccion: 'Dirección',
        departamento: 'Departamento'
      });
    }

    if(model.profile._internalModel.modelName === 'profile') {
      controller.set('campos',
        {
          puesto: 'Puesto',
          profesion: 'Profesión',
          estado: 'Estado',
          nocolegiado: 'No. Colegiado'
        });
    }

    if(model.profile._internalModel.modelName === 'election') {
      controller.set('campos',
        {
          fechaEleccion: 'Fecha a realizarse la elección',
          fechaEleccionProyectada: 'Fecha proyectada de Comision de Postulacion',
          descripcion: 'Descripción'
        }
      );
    }

    if(model.profile._internalModel.modelName === 'autoridad') {
      controller.set('campos',
        {
          nombre: 'Nombre',
          partido: 'Partido',
          puesto: 'Puesto'
        });
    }

    controller.setProperties(model);

    if (config.disqus && config.disqus.shortname) {
      controller.setProperties({
        disqusShortname: config.disqus.shortname,
        years: true,
        charge: true
      });
    }
  }
}
