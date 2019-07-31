import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model({ name }) {
    return this.store.query('institution', {
      sector: name
    });
  }
});
