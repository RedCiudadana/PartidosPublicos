import $ from 'jquery';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({

  currentSelector: computed(
    'esMujer',
    'esHombre',
    'president',
    'mayor',
    'deputie',
    'parlacen',
    function() {
      if(!this.get('esMujer') 
        && !this.get('esHombre')
        && !this.get('president')
        && !this.get('mayor')
        && !this.get('deputie')
        && !this.get('parlacen')
      ) {
        return '*';
      }

      let selectors = [];

      if (this.get('esMujer')) {
        selectors.push('.mujer');
      }

      if (this.get('esHombre')) {
        selectors.push('.hombre');
      }

      if (this.get('president')) {
        selectors.push('.president');
      }

      if (this.get('mayor')) {
        selectors.push('.mayor');
      }

      if (this.get('deputie')) {
        selectors.push('.deputie');
      }

      if (this.get('parlacen')) {
        selectors.push('.parlacen');
      }

      return selectors.join(', ');

    }
  ),

  _applyFilter() {

    var $container = $('#portfolio');

    $container.isotope({transitionDuration: '0.65s'});

    $container.isotope({filter: this.get('currentSelector')});

    return false;
  },

  // Pagination

  // setup our query params
  queryParams: ["page", "perPage"],

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 100,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedContent: pagedArray('model', {
    page: computed.alias("parent.page"),
    perPage: computed.alias("parent.perPage")
  }),

  // binding the property on the paged array
  // to a property on the controller
  totalPages: computed.oneWay("pagedContent.totalPages"),

  actions: {
    applyFilter() {
      return this._applyFilter();
    }
  }
});
