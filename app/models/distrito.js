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
  type: 'distrito',

  typeCommonName: 'diputadosDistrito',

  electionName: 'Diputados por distrito',

  title: '¡Conoce a las candidatas/os para representar a tu distrito en el Congreso!'
});
