import Model, { hasMany, attr } from '@ember-data/model';

export default Model.extend({
  // Attributes
  name: attr('string'),
  description: attr('string'),
  electionDay: attr('date'),

  // Relationships
  candidates: hasMany('profile'),
  committee: hasMany('profile'),
});
