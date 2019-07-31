import Component from '@ember/component';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import { alias, oneWay } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    if(!this.pagination) {
      this.perPage = this.profiles.length;
    }
  },

  classNames: ['container-fluid'],
  classNameBindings: ['background'],

  background: computed('bg', function() {
    return `bg-${this.bg}`;
  }),

  // Pagination
  queryParams: ["page", "perPage"],

  page: 1,
  perPage: 50,

  content: pagedArray('profiles', {
    page: alias("parent.page"),
    perPage: alias("parent.perPage")
  }),

  totalPages: oneWay("pagedContent.totalPages"),
});
