import Candidate from './candidate';

/**
 * Modelo para candidatos a alcalde
 *
 * @class Model.Mayor
 * @extends Model.Candidate
 */
export default Candidate.extend({
  // Atributes

  // Tipo de elección
  type: 'mayor',

  typeCommonName: 'alcaldes',

  electionName: 'Municipal',

  title: '¡Conoce a las candidatos/as que quieren ser tu próximo/a alcalde/sa!'
});
