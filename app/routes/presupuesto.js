import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  spreadsheets: service(),

  model() {
    return RSVP.hash({
      rows: this.spreadsheets.fetch('presupuesto'),
      presupuestoResumen: this.spreadsheets.fetch('presupuestoResumen'),
      consultas: this.spreadsheets.fetch('consultas')
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
        valuePath: 'vigente',
        money: true
      },
      {
        name: 'Devengado',
        valuePath: 'devengado',
        money: true
      },
      {
        name: 'Porcentaje de ejecución',
        valuePath: 'porcentageEjecucion',
        percentage: true
      }
    ]);

    // Consultas
    controller.set('FuentePresupuesto', model.consultas.findBy('variable', 'FuentePresupuesto'));
    controller.set('FechaPresupuesto', model.consultas.findBy('variable', 'FechaPresupuesto'));
    controller.set('DescargarExcel', model.consultas.findBy('variable', 'DescargarExcel'));
    controller.set('DescargarPDF', model.consultas.findBy('variable', 'DescargarPDF'));

    // Presupuestos
    controller.set('presupuestogeneral', model.presupuestoResumen.findBy('variable', 'presupuestogeneral'));
    controller.set('presupuestoInicial', model.presupuestoResumen.findBy('variable', 'presupuestoInicial'));
    controller.set('Devengado', model.presupuestoResumen.findBy('variable', 'Devengado'));
    controller.set('porcentage', model.presupuestoResumen.findBy('variable', 'porcentage'));
  }
});
