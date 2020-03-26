import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  spreadsheets: service(),

  model() {
    return this.spreadsheets.fetch('necesidades').then((necesidades) => necesidades.map((necesidad) => {
      necesidad.Unidades = parseInt(necesidad.Unidades);
      return necesidad;
    }));
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('columns', [
      {
        name: 'Categoria',
        valuePath: 'CategoriaCorto'
      },
      {
        name: 'Equipos',
        valuePath: 'Equipos'
      },
      {
        name: 'Unidades',
        valuePath: 'Unidades'
      }
    ]);
  }
});
