import Profile from './profile';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';

/**
 * Model for commission deputies
 *
 * @class Commision-deputies
 * @extends Model.Profile
 * @namespace Model
 */
export default Profile.extend({
  // Attributes
  cargoNombreCompleto: attr(),
  cargoNombreCorto: attr(),
  profesion: attr(),
  educacion: attr(),
  biografia: attr(),
  desempenio: attr(),
  historialPolitico: attr(),
  informacionGeneral: attr('informacion-general'),
  frenteAFrente: attr('frente-a-frente'),

  // Associations
  partidoPostulante: belongsTo('partido'),
  partidoActual: belongsTo('partido'),

  // Computed Properties
  fotoPartido: computed('fotoUrlPartido', function() {
    return this.get('fotoUrlPartido');
  })
});
