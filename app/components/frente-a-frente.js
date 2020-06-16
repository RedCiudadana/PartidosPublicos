import { computed } from '@ember/object';
import Component from '@glimmer/component';

export default class FrenteAFrente extends Component {
  @computed('perfilUno')
  get availableInfoUno() {
    let data = this.model.info.findBy('id', this.get('perfilUno.id'));
    if (this.model.historial.filterBy('perfil', this.get('perfilUno.id'))) {
      data['historial'] = this.model.historial.filterBy('perfil', this.get('perfilUno.id'));
    }
    return data;
  }

  @computed('perfilDos')
  get availableInfoDos() {
    let data = this.model.info.findBy('id', this.get('perfilDos.id'));
    if (this.model.historial.filterBy('perfil', this.get('perfilDos.id'))) {
      data['historial'] = this.model.historial.filterBy('perfil', this.get('perfilDos.id'));
    }
    return data;
  }
}
