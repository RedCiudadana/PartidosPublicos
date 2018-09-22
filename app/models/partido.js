import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * Model for party.
 *
 * @class Party
 * @namespace Model
 */
export default Model.extend({
  // Attributes

  /**
   * Code
   *
   * @property codigo
   */
  codigo: attr(),

  /**
   * Full-name
   *
   * @property nombreCompleto
   * @type String
   */
  nombreCompleto: attr('string'),

  /**
   * Short-name
   *
   * @property nombre
   * @type String
   */
  nombreCorto: attr('string'),

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
   * Logo
   *
   * @property logo
   * @type String
   */
  logo: attr('logo')
});
