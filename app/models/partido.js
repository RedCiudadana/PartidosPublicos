import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

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
  logo: attr('string'),

  // Relationships

  /**
   * Miembros del partido
   *
   * @property members
   * @type String
   */
  miembros: hasMany('candidate', { inverse: null })

});
