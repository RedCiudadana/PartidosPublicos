import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model({ id }) {
    return this.store.find('institution', id).then((institution) => {
      return this.store.query('profile', { institucion: institution.name }).then((profiles) => {
        institution.profiles = profiles;
        return institution;
      });
    });
  }
});
