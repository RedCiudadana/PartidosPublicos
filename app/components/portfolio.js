import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  colSize: '10',
  offset: '1',
  fit: true,

  classNames: ['container-fluid'],
  classNameBindings: ['background'],

  background: computed('bg', function() {
    return `bg-${this.bg}`;
  })
});
