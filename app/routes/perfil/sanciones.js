import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PerfilSancionesRoute extends Route {
  @service
  spreadsheets;

  model() {
    let profile = this.modelFor('perfil').profile;
    return this.spreadsheets.fetch('sanciones').then((sanciones) => {
      return sanciones.filterBy('partidoId', profile.id);
    });
  }
}
