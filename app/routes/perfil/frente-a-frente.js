import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { A } from '@ember/array';

const types = {
  presidentes: 'president',
  listado: 'listado',
  distrito: 'distrito',
  parlacen: 'parlacen',
  alcaldes: 'mayor'
};

export default Route.extend({

  types: types,

  spreadsheets: service(),

  model() {
    const spreadsheet = this.get('spreadsheets');
    let modelData = A();
    let app = this.modelFor('perfil');
    modelData = this.modelFor('application')[app.profile.type + 's'].toArray();
    return hash({
      profiles: modelData,
      info: spreadsheet.fetch('info-' + app.profile.type),
      historial: spreadsheet.fetch('historial')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('perfil.frente-a-frente').set('perfilUno', model.profiles.firstObject);
    this.controllerFor('perfil.frente-a-frente').set('perfilDos', model.profiles.firstObject);
  }
});
