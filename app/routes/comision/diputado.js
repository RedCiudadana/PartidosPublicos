import Route from '@ember/routing/route';
import { isNone } from '@ember/utils';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    const diputado = this.store.peekRecord('diputado-comision', params.id);

    return hash({
      diputado
    });
  },

  afterModel(model) {
    if (!isNone(model.diputado.get('nombre'))) {
      this.set('breadCrumb', {
        title: model.diputado.get('nombre')
      });
    }
  },
});
