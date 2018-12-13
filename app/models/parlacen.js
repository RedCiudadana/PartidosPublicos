import Candidate from './candidate';

/**
 * Modelo para candidatos a diputos de parlacen
 *
 * @class Model.Parlacen
 * @extends Model.Candidate
 */
export default Candidate.extend({
  // Atributes

  // Tipo de elección
  type: 'parlacen',

  electionName: 'Diputados Parlacen'
});
