import perfil from './perfil';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

/**
 * @desc this is a model for a magistrates.
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
  experienciaProfesional: attr(),
  experienciaEnDH: attr(),
  informacionGeneral: attr('informacion-general'),
  recuadros: attr('frente-a-frente'),
  frenteAFrente: attr('frente-a-frente'),

  // Computed Properties

  fotoPartido: computed('fotoUrlPartido', function() {
    return this.get('fotoUrlPartido');
  })
});
