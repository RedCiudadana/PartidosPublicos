import Model from 'ember-data/model';
import attr from 'ember-data/attr';

/**
 * @desc this is a model for a  party entity.
 */
export default Model.extend({
  // Attributes
  codigo: attr(),
  nombreCompleto: attr(),
  nombreCorto: attr(),
  fb: attr(),
  tw: attr(),
  logo: attr()
});
