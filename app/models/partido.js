import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';

/**
 * Model de partido político.
 *
 * @class Model.Party
 */
export default Model.extend({
  // Attributes

  /**
   * Código - Abreviación
   *
   * @property codigo
   */
  codigo: attr(),

  /**
   * Nombre completo
   *
   * @property nombreCompleto
   * @type String
   */
  nombreCompleto: attr('string'),

  /**
   * Nombre corto
   *
   * @property nombre
   * @type String
   */
  nombreCorto: attr('string'),

  /**
   * Fecha Inscripción
   *
   * @property fechaInscripcion
   * @type String
   */
  fechaInscripcion: attr('string'),

  /**
   * Secretario General
   *
   * @property secretarioGeneral
   * @type String
   */
  secretarioGeneral: attr('string'),

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
   * Logo
   *
   * @property logo
   * @type String
   */
  logoURL: attr('string'),

  numeroAfiliados: attr('string'),

  // Relationships

  /**
   * Miembros del partido
   *
   * @property members
   * @type String
   */
  miembros: hasMany('candidate', { inverse: null }),

  // Computed

  logo: computed('logoURL', function () {
    if (this.get('logoURL')) {
      return this.get('logoURL');
    }

    return 'img/partido-default.png';
  })

});
