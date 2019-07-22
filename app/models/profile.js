import Model, { belongsTo, attr } from '@ember-data/model';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

/**
 * Base model for people
 */
export default Model.extend({
  // Attributes
  name: attr('string'),
  email: attr('string'),
  sex: attr('string'),
  birthDate: attr('string'),
  twitter: attr('string'),
  facebook: attr('string'),
  photoURL: attr('string'),

  // Relationships
  institution: belongsTo('institution'),
  election: belongsTo('election'),

  // Computed properties

  /**
   * This computed property set a default image if photoURL is blank.
   */
  photo: computed('photoURL', 'sex', function() {
      if (!isBlank(this.photoURL)) {
          return this.photoURL;
      }

      if (this.sex === 'Masculino') {
          return 'image-M.png';
      }

      if (this.sex === 'Femenino') {
          return 'image-F.png';
      }

      // If this.sex is null, what I should do? gray photo?
  })
});
