import Candidate from './candidate';

/**
 * Modelo para candidatos a la presidencia
 *
 * @class Model.President
 * @extends Model.Candidate
 */
export default Candidate.extend({
  // Atributes

  // Tipo de elección
  type: 'president'
});
