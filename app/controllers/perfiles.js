import $ from 'jquery';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({

  profiles: computed(
    'departamento',
    'municipio',
    function() {
      if(!this.get('departamento')
        && !this.get('municipio')) {
        return this.get('model')
      }

      return this.get('model').filter((candidate) => {
        if (this.get('departamento') && candidate.departamento === this.get('departamento')) {
          if (this.get('municipio')) {
            if (candidate.municipio === this.get('municipio')) {
              // Coincide departamento y municipio
              return true
            } else {
              // No coincide municipio
              return false
            }
          }
          // Coincide departamento
          return true
        }
        // No coincide departamento
        return false;
      })
  }),

  currentSelector: computed(
    'a',
    function() {
      if(!this.get('a')) {
        return '*';
      }

      let selectors = [];

      if (this.get('a')) {
        selectors.push('.a');
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
    },

    toProfile(profile) {
      this.transitionToRoute('perfil', profile.typeCommonName, profile.id);
      return false;
    }
  }
});
