import Model, { hasMany, attr } from '@ember-data/model';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

export default Model.extend({
  // Attributes
  name: attr('string'),
  sector: attr('string'),
  mision: attr('string'),
  vision: attr('string'),
  contact: attr('string'),
  photoURL: attr('string'),

  // Relationships
  members: hasMany('profile'),
  elections: hasMany('election'),

  // Computed properties

  /**
   * This computed property return photoURL if is not blank, else return a default image.
   */
  photo: computed('photoURL', function() {
    if (!isBlank(this.photoURL)) {
      return this.photoURL;
    }

    return 'http://centrumnaukiwesola.pl/wp-content/themes/bulhak-edu/img/default-avatar.png';
  })
});
