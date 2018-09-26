import Profile from './profile';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

/**
 * Modelo para magistrados
 *
 * @class Model.Magistrate
 * @extends Model.Profile
 */
export default Profile.extend({
  // Attributes

  /**
   * Nombre completo del cargo.
   *
   * @property cargoNombreCompleto
   * @type String
   */
  cargoNombreCompleto: attr('string'),

  /**
   * Nombre corto del cargo.
   *
   * @property cargoNombreCorto
   * @type String
   */
  cargoNombreCorto: attr('string'),

  /**
   * Profesión.
   *
   * @property profesion
   * @type String
   */
  profesion: attr('string'),

  /**
   * Grado de educación.
   *
   * @property educacion
   * @type String
   */
  educacion: attr('string'),

  /**
   * Biografía.
   *
   * @property biografia
   * @type String
   */
  biografia: attr('string'),

  /**
   * Desempeño.
   *
   * @property desempenio
   * @type String
   */
  desempenio: attr('string'),

  /**
   * Historial politico.
   *
   * @property historialPolitico
   * @type String
   */
  historialPolitico: attr('string'),

  /**
   * Experiencia profesional.
   *
   * @property experienciaProfesional
   * @type String
   */
  experienciaProfesional: attr('string'),

  /**
   * Experiencia en derechos humanos.
   *
   * @property experienciaEnDH
   * @type String
   */
  experienciaEnDH: attr('string'),

  /**
   * Información general. Campos para mostrar en información general. 
   *
   * @property informacionGeneral
   * @type informacion-general
   */
  informacionGeneral: attr('informacion-general'),

  /**
   * Recuadros. Otra modularidad de frente a frente.
   *
   * @property recuadros
   * @type frente-a-frente
   */
  recuadros: attr('frente-a-frente'),

  /**
   * Campos a evaluar en la modularidad frente a frente.
   *
   * @property frenteAFrente
   * @type frente-a-frente
   */
  frenteAFrente: attr('frente-a-frente'),

  // Computed Properties

  /**
    * Foto del partido.
    *
    * @property fotoPartido
    * @type String
    */
  fotoPartido: computed('fotoUrlPartido', function() {
    return this.get('fotoUrlPartido');
  })
});
