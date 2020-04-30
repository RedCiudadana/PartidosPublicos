import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  spreadsheets: service(),

  queryParams: {
    page: { refreshModel: false },
    size: { refreshModel: false }
  },

  model() {
    return RSVP.hash({
      compras: this.spreadsheets.fetch('compras').then((compras) => compras.map((compra) => {
        compra.Monto = parseFloat(compra.Monto.replace('Q','').replace(' ', '').replace(/,/g, ''));
        return compra;
      })),
      comprasresumen: this.spreadsheets.fetch('comprasresumen'),
      consultas: this.spreadsheets.fetch('consultas')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('columnsCompras', [
      {
        name: 'Unidad',
        valuePath: 'Unidad'
      },
      {
        name: 'Compras',
        valuePath: 'Compras'
      },
      {
        name: 'ModalidadLCE',
        valuePath: 'ModalidadLCE'
      },
      {
        name: 'Fecha',
        valuePath: 'Fecha'
      },
      {
        name: 'Estatus',
        valuePath: 'Estatus'
      },
      {
        name: 'Monto',
        valuePath: 'Monto',
        money: true
      }
    ]);
  },
});
