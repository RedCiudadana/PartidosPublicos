import Candidate from './candidate';
import attr from 'ember-data/attr';

/**
 * Modelo para candidatos a alcalde
 *
 * @class Model.Mayor
 * @extends Model.Candidate
 */
export default Candidate.extend({
  // Atributes

  departamento: attr('string'),
  municipio: attr('string'),

  // Tipo de elección
  type: 'mayor',

  typeCommonName: 'alcaldes',

  electionName: 'Municipal',

  title: '¡Conoce a las candidatos/as que quieren ser tu próximo/a alcalde/sa!',

  // Filters

  filterDepartament: true,
  filterMunicipal: true
});
