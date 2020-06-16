import { computed } from '@ember/object';
import Model, { attr, hasMany } from '@ember-data/model';

/**
 * Model de partido político.
 *
 * @class Model.Party
 */
export default class Partido extends Model {
 // Attributes

 /**
  * Código - Abreviación
  *
  * @property codigo
  */
 @attr()
 codigo;

 /**
  * Nombre completo
  *
  * @property nombreCompleto
  * @type String
  */
 @attr('string')
 nombreCompleto;

 /**
  * Nombre corto
  *
  * @property nombre
  * @type String
  */
 @attr('string')
 nombreCorto;

 /**
  * Fecha Inscripción
  *
  * @property fechaInscripcion
  * @type String
  */
 @attr('string')
 fechaInscripcion;

 /**
  * Secretario General
  *
  * @property secretarioGeneral
  * @type String
  */
 @attr('string')
 secretarioGeneral;

 /**
  * Perfil de Facebook, la URL.
  *
  * @property fb
  * @type String
  */
 @attr('string')
 fb;

 /**
  * Perfil de Twitter, la URL.
  *
  * @property tw
  * @type String
  */
 @attr('string')
 tw;

 /**
  * Logo
  *
  * @property logo
  * @type String
  */
 @attr('string')
 logoURL;

 @attr('string')
 numeroAfiliados;

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
 get logo() {
   if (this.logoURL) {
     return this.logoURL;
   }

   return 'img/partido-default.png';
 }
}
