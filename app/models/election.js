import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

export default Model.extend({
  // Attributes
  nombre: attr('string'),
  fecha: attr('date'),

  // Relationships
  institution: belongsTo('institution'),
  candidates: hasMany('profile', {
    inverse: 'election'
  }),
  committee: hasMany('profile'),
});
