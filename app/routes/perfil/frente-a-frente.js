import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({

  spreadsheets: service(),

  model() {
    const spreadsheet = this.get('spreadsheets');
    let modelData = A();
    let app = this.modelFor('application');
    modelData.pushObjects(app.presidents.toArray());
    modelData.pushObjects(app.deputies.toArray());
    modelData.pushObjects(app.parlacens.toArray());
    modelData.pushObjects(app.mayors.toArray());
    return hash({
      profiles: modelData,
      info: spreadsheet.fetch('info-president'),
      historial: spreadsheet.fetch('historial')
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('perfil.frente-a-frente').set('perfilUno', model.profiles.firstObject);
    this.controllerFor('perfil.frente-a-frente').set('perfilDos', model.profiles.firstObject);
  }
});
