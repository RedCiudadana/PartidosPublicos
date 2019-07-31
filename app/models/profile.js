import Model, { belongsTo, attr } from '@ember-data/model';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

/**
 * Base model for people
 */
export default Model.extend({
  // Attributes
  nombre: attr('string'),
  sexo: attr('string'),
  puesto: attr('string'),
  dependencia: attr('string'),
  departamento: attr('string'),
  institucion: attr('string'),
  fechalaboral: attr('string'),
  nocolegiado: attr('string'),
  estadocivil: attr('string'),
  profesion: attr('string'),
  anosexperiencia: attr('string'),
  experienciaProfesional: attr('string'),
  experienciaAcademica: attr('string'),
  publicaciones: attr('string'),
  fotoUrl: attr('string'),
  fotoURL: attr('string'),

  // Relationships
  institution: belongsTo('institution'),
  election: belongsTo('election'),

  // Computed properties

  /**
   * This computed property set a default image if fotoURL is blank.
   */
  photo: computed('fotoURL', 'sex', function() {
      if (!isBlank(this.fotoURL)) {
          return this.fotoURL;
      }

      if (this.sex === 'Masculino') {
          return 'image-M.png';
      }

      if (this.sex === 'Femenino') {
          return 'image-F.png';
      }

      // If this.sex is null, what I should do? gray photo?
  })
});
