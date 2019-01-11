import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
  model() {
    let data = this.modelFor('application');
    let miembros = A();
    let partido = this.modelFor('perfil').currentParty;
    miembros.pushObjects(data.presidents.toArray());
    miembros.pushObjects(data.distritos.toArray());
    miembros.pushObjects(data.listados.toArray());
    miembros.pushObjects(data.parlacens.toArray());
    miembros.pushObjects(data.mayors.toArray());

    miembros = miembros.filter((candidate) => {
      return candidate.get('partido').get('id') === partido.get('id')
    });

    return {
      partido: partido,
      miembros: miembros
    };
  }
});
