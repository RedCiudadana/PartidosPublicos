import Profile from './profile';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

/**
 * Model para diputados de la comisión.
 *
 * @class Model.Commision-deputie
 * @extends Model.Profile
 */
export default Profile.extend({

  // Attributes

  /**
   * Cargo
   * @property cargo
   * @type String
   */
  cargo: attr('string'),

  /**
   * Institución
   * @property institucion
   * @type String
   */
  institucion: attr('string'),

  /**
   * Profesión
   * @property profesion
   * @type String
   */
  profesion: attr('string'),

  /**
   * Educación
   * @property educacion
   * @type String
   */
  educacion: attr('string'),


  // Associations

  /**
   * Partido postulante, con el que obtuvo el cargo o fue elegido.
   *
   * @property partidoPostulante
   * @type partido
   */
  partidoPostulante: belongsTo('partido'),

  /**
   * Partido actual.
   *
   * @property partidoActual
   * @type partido
   */
  partidoActual: belongsTo('partido'),
});
