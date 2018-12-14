import $ from 'jquery';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({

  currentSelector: computed(
    'esMujer',
    'esHombre',
    'partido-1',
    'partido-2',
    'partido-3',
    'partido-4',
    'partido-5',
    'partido-6',
    'partido-7',
    'partido-8',
    'partido-9',
    'partido-10',
    'partido-11',
    'partido-12',
    'partido-13',
    'partido-14',
    'partido-15',
    function() {
      if(!this.get('esMujer') 
        && !this.get('esHombre')
        && !this.get('partido-1')
        && !this.get('partido-2')
        && !this.get('partido-3')
        && !this.get('partido-4')
        && !this.get('partido-5')
        && !this.get('partido-6')
        && !this.get('partido-7')
        && !this.get('partido-8')
        && !this.get('partido-9')
        && !this.get('partido-10')
        && !this.get('partido-11')
        && !this.get('partido-12')
        && !this.get('partido-13')
        && !this.get('partido-14')
        && !this.get('partido-15')
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

      if (this.get('partido-1')) {
        selectors.push('.partido-1');
      }

      if (this.get('partido-2')) {
        selectors.push('.partido-2');
      }

      if (this.get('partido-3')) {
        selectors.push('.partido-3');
      }

      if (this.get('partido-4')) {
        selectors.push('.partido-4');
      }

      if (this.get('partido-5')) {
        selectors.push('.partido-5');
      }

      if (this.get('partido-6')) {
        selectors.push('.partido-6');
      }

      if (this.get('partido-7')) {
        selectors.push('.partido-7');
      }

      if (this.get('partido-8')) {
        selectors.push('.partido-8');
      }

      if (this.get('partido-9')) {
        selectors.push('.partido-9');
      }

      if (this.get('partido-10')) {
        selectors.push('.partido-10');
      }

      if (this.get('partido-11')) {
        selectors.push('.partido-11');
      }

      if (this.get('partido-12')) {
        selectors.push('.partido-12');
      }

      if (this.get('partido-13')) {
        selectors.push('.partido-13');
      }

      if (this.get('partido-14')) {
        selectors.push('.partido-14');
      }

      if (this.get('partido-15')) {
        selectors.push('.partido-15');
      }

      return selectors.join(', ');

    }
  ),

  _applyFilter() {

    console.log('Aplicando filtros!');

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
  perPage: 50,

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
