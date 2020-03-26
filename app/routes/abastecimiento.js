import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  spreadsheets: service(),

  model() {
    return this.spreadsheets.fetch('abastecimiento').then((models) => {
      return models.map((model) => {
        model.trazadores1MFebrero = parseInt(model.trazadores1MFebrero);
        model.quirurgicoTrazador1MFebrero = parseInt(model.quirurgicoTrazador1MFebrero);
        model.medicamentos1MFebrero = parseInt(model.medicamentos1MFebrero);
        model.quirurgico1MFebrero = parseInt(model.quirurgico1MFebrero);
        model.laboratorio1MFebrero = parseInt(model.laboratorio1MFebrero);
        model.banco1MFebrero = parseInt(model.banco1MFebrero);
        model.medicamentos3MFebrero = parseInt(model.medicamentos3MFebrero);
        model.quirurgico3MFebrero = parseInt(model.quirurgico3MFebrero);
        model.laboratorio3MFebrero = parseInt(model.laboratorio3MFebrero);
        model.banco3MFebrero = parseInt(model.banco3MFebrero);

        return model;
      })
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('columnsTrazadores', [
      {
        name: 'Nombre',
        valuePath: 'nombre'
      },
      {
        name: 'Medicamentos trazadores',
        valuePath: 'trazadores1MFebrero'
      },
      {
        name: 'Medicamentos quirurgico trazador',
        valuePath: 'quirurgicoTrazador1MFebrero'
      }
    ]);

    controller.set('columns1M', [
      {
        value: 'Nombre',
        valuePath: 'nombre'
      },
      {
        value: 'Medicamentos con disponibilidad',
        valuePath: 'medicamentos1MFebrero'
      },
      {
        value: 'Medicamentos quirurgicos con disponibilidad',
        valuePath: 'quirurgico1MFebrero'
      },
      {
        value: 'Reactivos para Laboratorio Clínico',
        valuePath: 'laboratorio1MFebrero'
      },
      {
        value: 'Reactivos para Banco de Sangre',
        valuePath: 'banco1MFebrero'
      }
    ]);

    controller.set('columns3M', [
      {
        value: 'Nombre',
        valuePath: 'nombre'
      },
      {
        value: 'Medicamentos',
        valuePath: 'medicamentos3MFebrero'
      },
      {
        value: 'Medicamentos quirurgicos',
        valuePath: 'quirurgico3MFebrero'
      },
      {
        value: 'Reactivos para Laboratorio Clínico',
        valuePath: 'laboratorio3MFebrero'
      },
      {
        value: 'Reactivos para Banco de Sangre',
        valuePath: 'banco3MFebrero'
      }
    ]);
  }
});
