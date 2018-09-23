import Magistrate from './magistrate';
import { belongsTo } from 'ember-data/relationships';

/**
 * Model para diputados de la comisión.
 *
 * @class Model.Commision-deputies
 * @extends Model.Profile
 */
export default Magistrate.extend({
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
