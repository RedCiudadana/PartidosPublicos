import Model, { attr } from '@ember-data/model';

export default class Presupuesto extends Model {
  @attr('string')
  label;

  @attr('number')
  value;
}
