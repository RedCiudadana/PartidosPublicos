import Candidate from './candidate';

/**
 * Modelo para candidatos a diputados del listado nacional
 *
 * @class Model.Deputie
 * @extends Model.Candidate
 */
export default Candidate.extend({
  // Atributes

  // Tipo de elección
  type: 'listado',

  typeCommonName: 'diputadosListado',

  electionName: 'Diputados por listado nacional'
});
