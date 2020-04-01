import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  spreadsheets: service(),

  model() {
    return RSVP.hash({
      consultas: this.spreadsheets.fetch('consultas'),
      rows: this.spreadsheets.fetch('necesidades').then((models) => {
        return models.map((model) => {
          model.Unidades = parseInt(model.Unidades);
          return model;
        });
      })
    })
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

    controller.set('rows1', model.rows.filterBy('CategoriaCorto', 'Equipos de Protección Personal'));
    controller.set('rows2', model.rows.filterBy('CategoriaCorto', 'Equipo Hospitalario'));
    controller.set('rows3', model.rows.filterBy('CategoriaCorto', 'Equipo Hospitalario Parque de la Industria'));
    controller.set('rows4', model.rows.filterBy('CategoriaCorto', 'Medicamentos: 45 hospitales'));

    controller.set('Fuente', model.consultas.findBy('variable', 'FuentePrioridades'));
    controller.set('Fecha', model.consultas.findBy('variable', 'FechaPrioridades'));
  }
});
