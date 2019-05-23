import Candidate from './candidate';
import attr from 'ember-data/attr';

/**
 * Modelo para candidatos a diputados del listado nacional
 *
 * @class Model.Deputie
 * @extends Model.Candidate
 */
export default Candidate.extend({
  // Atributes
  casilla: attr('string'),

  // Tipo de elección
  type: 'listado',

  typeCommonName: 'diputadosListado',

  electionName: 'Diputados por listado nacional',

  title: '¡Conoce a los candidatos/as del listado nacional que quieren ser tus representantes en el Congreso!'
});
