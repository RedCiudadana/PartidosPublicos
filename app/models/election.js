import { computed } from '@ember/object';
import Model, { belongsTo, hasMany, attr } from '@ember-data/model';
import { isBlank } from '@ember/utils';

export default class Election extends Model {
  // Attributes
  @attr('string')
  nombre;

  @attr('string')
  fechaEleccion;

  @attr('string')
  fechaEleccionProyectada;

  @attr('string')
  descripcion;

  @attr('string')
  requisitos;

  @attr('string')
  comision;

  @attr('string')
  infografiaURL;

  @attr('string')
  cronogramaURL;

  @attr('string')
  fotoURL;

  // Relationships
  @belongsTo('institution')
  institution;

  @hasMany('profile', {
    inverse: 'election'
  })
  candidates;

  @hasMany('profile')
  committee;

  /**
   * This computed property return photoURL if is not blank, else return a default image.
   */
  @computed('fotoURL')
  get photo() {
    if (!isBlank(this.fotoURL)) {
      return this.fotoURL;
    }

    return 'http://centrumnaukiwesola.pl/wp-content/themes/bulhak-edu/img/default-avatar.png';
  }
}
