import { alias, oneWay } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

const resolver = {
  institution: 'instituciones',
  election: 'elecciones',
  profile: 'perfiles'
};

export default Controller.extend({
  isMujer: false,
  isVaron: false,
  inInstitution: null,

  init() {
    this._super(...arguments);
    this.set('institutions', this.store.findAll('institution'));
  },


  municipios: computed('departamento', function() {
    return this.datosMunicipios[this.departamento];
  }),

  profiles: computed(
    'isMujer',
    'isVaron',
    'inInstitution',
    'model',
    function() {
      if(!this.isMujer
        && !this.isVaron
        && !this.inInstitution) {
        return this.model;
      }

      return this.model.filter((candidate) => {
        if (!isBlank(candidate.get('sexo'))) {
          if (this.isMujer
            && candidate.get('sexo') !== 'Femenino') {
            return false;
          }

          if (this.isVaron
            && candidate.get('sexo') !== 'Masculino') {
            return false;
          }
        }

        if (this.inInstitution
          && candidate.get('institution.id') !== 0
          && candidate.get('institution.id') !== this.inInstitution.get('id')) {
          return false;
        }

        return true;
      });
  }),

  currentSelector: computed(
    'a',
    function() {
      if(!this.a) {
        return '*';
      }

      let selectors = [];

      if (this.a) {
        selectors.push('.a');
      }

      return selectors.join(', ');
    }
  ),

  // Pagination

  // setup our query params
  queryParams: ["page", "perPage"],

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 50,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedContent: pagedArray('profiles', {
    page: alias("parent.page"),
    perPage: alias("parent.perPage")
  }),

  // binding the property on the paged array
  // to a property on the controller
  totalPages: oneWay("pagedContent.totalPages"),

  actions: {
    applyFilter() {
      return this._applyFilter();
    },

    toProfile(profile) {
      this.transitionToRoute('perfil', resolver[profile._internalModel.modelName], profile.id);
      return false;
    }
  }
});
