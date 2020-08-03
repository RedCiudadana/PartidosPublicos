import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class PerfilPresenciaRoute extends Route {
  @service
  spreadsheets;

  model() {
    let profile = this.modelFor('perfil').profile;

    let sedes = this.spreadsheets.fetch('sedes').then((sanciones) => {
      return sanciones.filterBy('partidoId', profile.id);
    });

    let presencia = this.spreadsheets.fetch('presencia').then((presencia) => {
      return presencia.findBy('partidoId', profile.id);
    });

    return hash({ presencia, sedes });
  }
}
