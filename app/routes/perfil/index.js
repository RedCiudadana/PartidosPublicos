import Route from '@ember/routing/route';
import config from '../../config/environment';

export default Route.extend({
  queryParams: {
    page: { refreshModel: false },
    size: { refreshModel: false }
  },

  setupController(controller, model) {
    this._super(controller, model);

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

    controller.setProperties(model);
    controller.setProperties({
      disqusShortname: config.disqus.shortname,
      years: true,
      charge: true
    });

    controller.set('FuenteAbastecimiento', model.consultas.findBy('variable', 'FuenteAbastecimiento'));
    controller.set('FechaAbastecimiento', model.consultas.findBy('variable', 'FechaAbastecimiento'));
    controller.set('FuenteCompras', model.consultas.findBy('variable', 'FuenteCompras'));
    controller.set('FechaCompras', model.consultas.findBy('variable', 'FechaCompras'));
  }
});
