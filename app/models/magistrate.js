import Profile from './profile';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

/**
 * Model for magistrate.
 *
 * @class Magistrate
 * @extends Model.Profile
 * @namespace Model
 */
export default Profile.extend({
  // Attributes

  /**
   * Full name of charge
   *
   * @property cargoNombreCompleto
   * @type String
   */
  cargoNombreCompleto: attr('string'),

  /**
   * Short name of charge
   *
   * @property cargoNombreCorto
   * @type String
   */
  cargoNombreCorto: attr('string'),

  /**
   * Profession
   *
   * @property profesion
   * @type String
   */
  profesion: attr('string'),

  /**
   * Education degree
   *
   * @property educacion
   * @type String
   */
  educacion: attr('string'),

  /**
   * Biography
   *
   * @property biografia
   * @type String
   */
  biografia: attr('string'),

  /**
   * Performance
   *
   * @property desempenio
   * @type String
   */
  desempenio: attr('string'),

  /**
   * Political history
   *
   * @property historialPolitico
   * @type String
   */
  historialPolitico: attr('string'),

  /**
   * Professional experience 
   *
   * @property experienciaProfesional
   * @type String
   */
  experienciaProfesional: attr('string'),

  /**
   * Experience in human rights
   *
   * @property experienciaEnDH
   * @type String
   */
  experienciaEnDH: attr('string'),

  /**
   * General information
   *
   * @property informacionGeneral
   * @type informacion-general
   */
  informacionGeneral: attr('informacion-general'),

  /**
   * Boxes
   *
   * @property recuadros
   * @type frente-a-frente
   */
  recuadros: attr('frente-a-frente'),

  /**
   * Facing
   *
   * @property frenteAFrente
   * @type frente-a-frente
   */
  frenteAFrente: attr('frente-a-frente'),

  // Computed Properties

  /**
    * Party photo
    *
    * @property fotoPartido
    * @type String
    */
  fotoPartido: computed('fotoUrlPartido', function() {
    return this.get('fotoUrlPartido');
  })
});
