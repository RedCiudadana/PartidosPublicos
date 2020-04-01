import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  spreadsheets: service(),

  model() {
    return RSVP.hash({
      consultas: this.spreadsheets.fetch('consultas'),
      rows: this.spreadsheets.fetch('presupuesto').then((presupuestos) => presupuestos.map((presupuesto) => {
        presupuesto.vigente = parseFloat(presupuesto.vigente.replace(',', ''));
        presupuesto.devengado = parseFloat(presupuesto.devengado.replace(',', ''));
        presupuesto.porcentageEjecucion = parseFloat(presupuesto.porcentageEjecucion.replace(',', ''));

        return presupuesto;
      }))
    });
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

    controller.set('Fuente', model.consultas.findBy('variable', 'FuenteAbastecimiento'));
    controller.set('Fecha', model.consultas.findBy('variable', 'FechaAbastecimiento'));
  }
});
