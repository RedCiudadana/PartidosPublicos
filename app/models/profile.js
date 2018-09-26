import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

/**
 * Modelo para personas, usalmente se extiende esta clase a otras según el proyecto.
 *
 * @class Model.Profile
 */
export default Model.extend({
  // Attributes

  /**
   * Nombre de la persona.
   *
   * @property nombre
   * @type String
   */
  nombre: attr('string'),

  /**
   * URL de la foto de la persona.
   *
   * @property fotoURL
   * @type String
   */
  fotoUrl: attr('string'),

  /**
   * Fecha de nacimento.
   *
   * @property fechaNacimiento
   * @type Date
   */
  fechaNacimiento: attr('date'),

  /**
   * Lugar de nacimiento.
   *
   * @property lugarNacimiento
   * @type String
   */
  lugarNacimiento: attr('string'),

  /**
   * Correo electrónico - Email.
   *
   * @property email
   * @type String
   */
  email: attr('string'),

  /**
   * Perfil de Facebook, la URL.
   *
   * @property fb
   * @type String
   */
  fb: attr('string'),

  /**
   * Perfil de Twitter, la URL.
   *
   * @property tw
   * @type String
   */
  tw: attr('string'),

  /**
   * Dirrección.
   *
   * @property dirreccion
   * @type String
   */
  direccion: attr('string'),

  /**
   * Número de telefono.
   *
   * @property telefono
   * @type String
   */
  telefono: attr('string'),

  /**
   * Sexo.
   *
   * @property sexo
   * @type String
   */
  sexo: attr('string'),

  /**
   * Estado de la persona según el proceso que se lleva acabo del proyecto. Ejemplo una elección sería "En proceso" o "Descalificado".
   *
   * @property estado
   * @type String
   */
  estado: attr('string'),

   // Computed Properties

  /**
  * Foto del perfil.
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
  * Selector para Isotope. Genera un 'String' con etiquetas para poder filtrar elementos desde el HTML con Isotope.
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
  * Identificador de Disqus
  *
  * @property disqusIdentifier
  * @type String
  * @default "perfil-0"
  */
  disqusIdentifier: computed('id', function() {
    return `perfil-${this.get('id')}`;
  })
});
