import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Model.extend({
  // Attributes
  nombre: attr('string'),
  fechaEleccion: attr('string'),
  fechaEleccionProyectada: attr('string'),
  descripcion: attr('string'),
  requisitos: attr('string'),
  comision: attr('string'),

  infografiaURL: attr('string'),
  cronogramaURL: attr('string'),
  fotoURL: attr('string'),

  // Relationships
  institution: belongsTo('institution'),
  candidates: hasMany('profile', {
    inverse: 'election'
  }),

  committee: hasMany('profile'),

  /**
   * This computed property return photoURL if is not blank, else return a default image.
   */
  photo: computed('fotoURL', function() {
    if (!isBlank(this.fotoURL)) {
      return this.fotoURL;
    }

    return 'http://centrumnaukiwesola.pl/wp-content/themes/bulhak-edu/img/default-avatar.png';
  })
});
