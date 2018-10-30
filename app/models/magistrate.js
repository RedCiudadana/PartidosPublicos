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
   * Experiencia profesional.
   *
   * @property experienciaProfesional
   * @type String
   */
  experienciaProfesional: attr('string'),

  /**
   * Información general. Campos para mostrar en información general. Son serializados después.
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
   * Campos a evaluar en la modularidad frente a frente. Son serializados después.
   *
   * @property frenteAFrente
   * @type frente-a-frente
   */
  frenteAFrente: attr('frente-a-frente'),

  /**
   * Institución
   *
   * @property institucion
   * @type String
   */
  institucion: attr('string'),

  /**
   * Plan de trabajo
   *
   * @property planTrabajo
   * @type String
   */
  planTrabajo: attr('string'),

  /**
   * Proyección
   *
   * @property proyeccion
   * @type String
   */
  proyeccion: attr('string'),

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
