import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

/**
 * Model for persons, usually extends.
 *
 * @class Profile
 * @namespace Model
 */
export default Model.extend({
  // Attributes

  /**
   * Name
   *
   * @property nombre
   * @type String
   */
  nombre: attr('string'),

  /**
   * URL of the person's photo
   *
   * @property fotoURL
   * @type String
   */
  fotoUrl: attr('string'),

  /**
   * Birthdate
   *
   * @property fechaNacimiento
   * @type Date
   */
  fechaNacimiento: attr('date'),

  /**
   * Place of birth
   *
   * @property lugarNacimiento
   * @type String
   */
  lugarNacimiento: attr('string'),

  /**
   * Email
   *
   * @property email
   * @type String
   */
  email: attr('string'),

  /**
   * Facebook profile
   *
   * @property fb
   * @type String
   */
  fb: attr('string'),

  /**
   * Twitter profile
   *
   * @property tw
   * @type String
   */
  tw: attr('string'),

  /**
   * Address
   *
   * @property dirreccion
   * @type String
   */
  direccion: attr('string'),

  /**
   * Phone number
   *
   * @property telefono
   * @type String
   */
  telefono: attr('string'),

  /**
   * Sex
   *
   * @property sexo
   * @type String
   */
  sexo: attr('string'),

  /**
   * Status
   *
   * @property estado
   * @type String
   */
  estado: attr('string'),

   // Computed Properties

  /**
  * Perfil photo
  *
  * @property fotoPerfil
  * @type String
  * @default "images/Magistrado.jpg"
  */
  fotoPerfil: computed('fotoUrl', function() {
    if (this.get('fotoUrl') !== '') {
      return this.get('fotoUrl');
    }

    return 'images/Magistrado.jpg';
  }),

  /**
  * Selector for Isotope, used to tag element example: 'hombre enProceso partidoA distritoB'
  *
  * @property selector
  * @type String
  * @default ""
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
  * Disqus Identifier
  *
  * @property disqusIdentifier
  * @type String
  * @default "perfil-0"
  */
  disqusIdentifier: computed('id', function() {
    return `perfil-${this.get('id')}`;
  })
});
