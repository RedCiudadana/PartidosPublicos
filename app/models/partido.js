import { computed } from '@ember/object';
import Model, { attr, hasMany } from '@ember-data/model';

/**
 * Model de partido político.
 *
 * @class Model.Party
 */
export default class Partido extends Model {
 // Attributes

  @attr('string')
  nombreCompleto;

  @attr('string')
  siglas;

  @attr('string')
  logoURL;

  @attr('string')
  lema;

  @attr('string')
  fundacion;

  @attr('string')
  telefono;

  @attr('string')
  direccion;

  @attr('string')
  paginaWeb;

  @attr('string')
  correo;

  @attr('string')
  facebook;

  @attr('string')
  twitter;

  @attr('string')
  historia;

  @attr('string')
  principios;

  @attr('string')
  programaURL;

  @attr('string')
  escrituraURL;

  @attr('string')
  estatutosURL;

  @attr('string')
  procedimientosURL;

  @attr('string')
  eticaURL;

  @attr('string')
  procedimientosTransparenciaURL;

  @attr('string')
  denuncia;

  @attr('string')
  procedimientosAfiliacion;

  @attr('string')
  secretarioGeneral;

  @attr('string')
  secretarioGeneralEnFunciones;


 // Relationships

 /**
  * Miembros del partido
  *
  * @property members
  * @type String
  */
 @hasMany('candidate', { inverse: null })
 miembros;

 // Computed

 @computed('logoURL')
 get photo() {
   if (this.logoURL) {
     return this.logoURL;
   }

   return 'img/partido-default.png';
 }

 get nombre() {
   return this.nombreCompleto;
 }
}
