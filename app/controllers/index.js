import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Controller.extend({

  // profiles: computed(
  //   'distrito',
  //   'listado',
  //   'president',
  //   'mayor',
  //   'deputie',
  //   'parlacen',
  //   function() {

  //     if(!this.get('distrito') 
  //       && !this.get('listado')
  //       && !this.get('president')
  //       && !this.get('mayor')
  //       && !this.get('deputie')
  //       && !this.get('parlacen')
  //     ) {
  //       return this.get('model');
  //     }

  //     return this.get('model').filter((candidate) => {
  //       if (this.get('distrito') && candidate.type === 'distrito') {
  //         return true;
  //       }

  //       if (this.get('listado') && candidate.type === 'listado') {
  //         return true;
  //       }

  //       if (this.get('president') && candidate.type === 'president') {
  //         return true;
  //       }

  //       if (this.get('mayor') && candidate.type === 'mayor') {
  //         return true;
  //       }

  //       if (this.get('deputie') && candidate.type === 'deputie') {
  //         return true;
  //       }

  //       if (this.get('parlacen') && candidate.type === 'parlacen') {
  //         return true;
  //       }

  //       return false;
  //     });

  //   }
  // ),

  // Pagination

  // setup our query params
  queryParams: ["page", "perPage"],

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 25,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedContent: pagedArray('profiles', {
    page: computed.alias("parent.page"),
    perPage: computed.alias("parent.perPage")
  }),

  // binding the property on the paged array
  // to a property on the controller
  totalPages: computed.oneWay("pagedContent.totalPages"),

  actions: {
    backToPageOne() {
      // Regresa a la pagina 1
      this.set('pagedContent.page', 1);
      return false;
    },

    toProfile(profile) {
      this.transitionToRoute('perfil', profile.typeCommonName, profile.id);
      return false;
    },

    transitionTo(type) {
      this.transitionToRoute('perfiles', type);
      return false;
    }
  }
});
