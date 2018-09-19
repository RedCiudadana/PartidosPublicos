import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

/**
 * @desc this is a model for a person's entity, anyone.
 */
export default Model.extend({
  // Attributes
  nombre: attr(),
  fotoUrl: attr(),
  cargoNombreCompleto: attr(),
  cargoNombreCorto: attr(),
  profesion: attr(),
  educacion: attr(),
  fechaNacimiento: attr(),
  lugarNacimiento: attr(),
  email: attr(),
  fb: attr(),
  tw: attr(),
  direccion: attr(),
  telefono: attr(),
  biografia: attr(),
  desempenio: attr(),
  historialPolitico: attr(),
  experienciaProfesional: attr(),
  experienciaEnDH: attr(),
  sexo: attr(),
  estado: attr(),
  informacionGeneral: attr('informacion-general'),
  recuadros: attr('frente-a-frente'),
  frenteAFrente: attr('frente-a-frente'),

  // Computed Properties
  fotoPerfil: computed('fotoUrl', function() {
    if (this.get('fotoUrl') !== '') {
      return this.get('fotoUrl');
    }

    return 'images/Magistrado.jpg';
  }),

  /**
   * @type { string }
   * @desc used by Isolate to filter data. Computing something like this: 'hombre descalificado'.
   */
  selector: computed('sexo', 'estado', function() {
    let returnValue = '';

    if (this.get('sexo') === 'Masculino') {
      returnValue += ' hombre';
    }

    if (this.get('sexo') === 'Femenino') {
      returnValue += ' mujer';
    }

    if (this.get('estado') === 'Descalificado') {
      returnValue += ' descalificado';
    }

    if (this.get('estado') === 'En proceso') {
      returnValue += ' enProceso';
    }

    return returnValue;
  }),

  /**
   * @todo checks what this does.
   */
  disqusIdentifier: computed('id', function() {
    return `perfil-${this.get('id')}`;
  })
});
