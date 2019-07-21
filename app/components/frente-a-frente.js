import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  availableInfoUno: computed('perfilUno', function() {
    let data = this.model.info.findBy('id', this.get('perfilUno.id'));
    if (this.model.historial.filterBy('perfil', this.get('perfilUno.id'))) {
      data['historial'] = this.model.historial.filterBy('perfil', this.get('perfilUno.id'));
    }
    return data;
  }),

  availableInfoDos: computed('perfilDos', function() {
    let data = this.model.info.findBy('id', this.get('perfilDos.id'));
    if (this.model.historial.filterBy('perfil', this.get('perfilDos.id'))) {
      data['historial'] = this.model.historial.filterBy('perfil', this.get('perfilDos.id'));
    }
    return data;
  })
});
