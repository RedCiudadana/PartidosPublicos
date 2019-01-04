import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  availableInfoUno: computed('perfilUno', function() {
    return this.get('model').info.findBy('id', this.get('perfilUno.id'));
  }),

  availableInfoDos: computed('perfilDos', function() {
    return this.get('model').info.findBy('id', this.get('perfilDos.id'));
  })
});
