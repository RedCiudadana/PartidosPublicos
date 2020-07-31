import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PerfilFinanzasRoute extends Route {
  @service
  spreadsheets;

  model() {
    let profile = this.modelFor('perfil').profile;
    return this.spreadsheets.fetch('financiamiento').then((sanciones) => {
      return sanciones.filterBy('partidoId', profile.id).findBy('anoFinanzas', '2019');
    });
  }
}
