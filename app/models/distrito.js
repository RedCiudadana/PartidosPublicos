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
  distrito: attr('string'),

  // Tipo de elección
  type: 'distrito',

  typeCommonName: 'diputadosDistrito',

  electionName: 'Diputados por distrito',

  title: '¡Conoce a las candidatas/os para representar a tu distrito en el Congreso!',

  // Filters

  filterDistrito: true
});
