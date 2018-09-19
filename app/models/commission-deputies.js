import perfil from './perfil';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { computed } from '@ember/object';

/**
 * @desc this is a model for a commission-deputies.
 */
export default perfil.extend({
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
