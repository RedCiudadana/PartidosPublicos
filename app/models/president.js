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
  type: 'president',

  typeCommonName: 'presidentes',

  electionName: 'Presidencial',

  title: '¡Conoce a los candidatos/as que quieren ser tu próximo/a Presidente y Vicepresidente!'
});
