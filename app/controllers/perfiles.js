import Controller from '@ember/controller';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

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
    'allProfiles',
    function() {
      if(!this.isMujer
        && !this.isVaron
        && !this.inInstitution) {
        return this.allProfiles;
      }

      return this.allProfiles.filter((candidate) => {
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
