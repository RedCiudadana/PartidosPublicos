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
  fotoURL: attr('string'),

  correo: attr('string', { defaultValue: 'name@example.com'}),
  tw: attr('string', { defaultValue: 'https://twitter.com/name'}),
  fb: attr('string', { defaultValue: 'https://facebook.com/name'}),

  // Relationships
  institution: belongsTo('institution', { async: false }),
  comission: belongsTo('institution', { async: false }),
  election: belongsTo('election', { async: false }),

  // Computed properties

  /**
   * This computed property set a default image if fotoURL is blank.
   */
  photo: computed('fotoURL', 'sexo', function() {
      if (!isBlank(this.fotoURL)) {
          return this.fotoURL;
      }

      if (this.sexo === 'Masculino') {
        return 'mi-guatemala/img/candidato.png';
      }

      if (this.sexo === 'Femenino') {
        return 'mi-guatemala/img/candidata.png';
      }

      return 'mi-guatemala/img/candidata.png';
  })
});
