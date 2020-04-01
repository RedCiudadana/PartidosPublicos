import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  spreadsheets: service(),

  model() {
    return this.spreadsheets.fetch('presupuesto').then((presupuestos) => presupuestos.map((presupuesto) => {
      presupuesto.vigente = parseFloat(presupuesto.vigente.replace(',', ''));
      presupuesto.devengado = parseFloat(presupuesto.devengado.replace(',', ''));
      presupuesto.porcentageEjecucion = parseFloat(presupuesto.porcentageEjecucion.replace(',', ''));

      return presupuesto;
    }));
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('columns', [
      {
        name: 'Unidad',
        valuePath: 'unidad'
      },
      {
        name: 'Vigente',
        valuePath: 'vigente'
      },
      {
        name: 'Devengado',
        valuePath: 'devengado'
      },
      {
        name: 'Porcentage ejecución',
        valuePath: 'porcentageEjecucion'
      }
    ]);
  }
});
