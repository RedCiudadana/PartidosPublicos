import Model, { hasMany, attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Model.extend({
  // Attributes
  name: attr('string'),
  description: attr('string'),
  electionDay: attr('date'),

  // Relationships
  candidates: hasMany('profile', {
    inverse: 'election'
  }),
  committee: hasMany('profile'),

  photoURL: attr('string'),
  photo: computed('photoURL', function() {
    if (!isBlank(this.photoURL)) {
      return this.photoURL;
    }

    return 'http://centrumnaukiwesola.pl/wp-content/themes/bulhak-edu/img/default-avatar.png';
  })
});
