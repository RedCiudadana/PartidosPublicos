import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
// import { typeOf } from '@ember/utils';

const resolver = {
  hospitales: 'institution',
  elecciones: 'election',
  perfiles: 'profile',
  partidos: 'partido',
  autoridades: 'autoridad'
};

/**
 * profile Route
 *
 * @class Route.profile
 */
export default class PerfilRoute extends Route {
  resolver = resolver;

  /**
   * Spreadsheets Service
   *
   * @property spreadsheets
   * @type Service
   */
  @service
  spreadsheets;

  /**
   * Routing Service
   *
   * @property _routing
   * @type Service
   */
  @service('-routing')
  _routing;

  /**
   * Model hook. Obtiene toda la información de un perfil según el id que obtiene de 'params'.
   *
   * @method model
   * @return {Object} Datos del perfil según el id. Algunos campos son: config, perfil, institucion, currentParty, profileGeneralInformationConfiguration, profiles, avaibleDocuments, dataTableGradation, totalGraduationScore, profileFunctions, entre otros.
   */
  model({ model, id}) {
    return this.store.findRecord(resolver[model], id).then((profile) => {
      return hash({
        config: {},
        profile: profile,
        profiles: this.store.query('autoridad', {
          partidoId: profile.id
        })
      });
    });
  }

  @action
  didTransition() {
    window.scrollTo(0, 0);
  }
}
