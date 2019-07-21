import { alias, oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({

  // Pagination

  // setup our query params
  queryParams: ["page", "perPage"],

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 10,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedContent: pagedArray('model.miembros', {
    page: alias("parent.page"),
    perPage: alias("parent.perPage")
  }),

  // binding the property on the paged array
  // to a property on the controller
  totalPages: oneWay("pagedContent.totalPages"),

  actions: {
    applyFilter() {
      return this._applyFilter();
    }
  }
});
