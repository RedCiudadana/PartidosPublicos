import Model, { hasMany, attr } from '@ember-data/model';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

export default Model.extend({
  // Attributes
  nombre: attr('string'),
  sector: attr('string'),
  mision: attr('string'),
  vision: attr('string'),
  enlaceAccesoInformacion: attr('string'),
  enlaceGobiernoDigital: attr('string'),
  enlaceDatosAbiertos: attr('string'),
  enlaceServicios: attr('string'),
  correo: attr('string'),
  descripcion: attr('string'),
  telefono: attr('string'),
  web: attr('string'),
  fb: attr('string'),
  tw: attr('string'),
  fotoURL: attr('string'),
  diasAtencion: attr('string'),
  enlaceServicios2: attr('string'),
  direccion: attr('string'),

  // Relationships
  members: hasMany('profile', {
    inverse: 'institution'
  }),
  comision: hasMany('election'),

  // Computed properties

  /**
   * This computed property return photoURL if is not blank, else return a default image.
   */
  photo: computed('fotoURL', function() {
    if (!isBlank(this.fotoURL)) {
      return this.fotoURL;
    }

    return 'img/img-default.png';
  })
});
