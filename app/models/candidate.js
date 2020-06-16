import { computed } from '@ember/object';
import Model, { attr, belongsTo } from '@ember-data/model';
import { isBlank } from '@ember/utils';

/**
 * Modelo base para candidatos.
 *
 * @class Model.Candidate
 */
export default class Candidate extends Model {
 // Attributes

 /**
  * Nombre del candidato
  *
  * @property nombre
  * @type String
  */
 @attr('string')
 nombre;

 // FBM

 @attr('string')
 web;

 @attr('string')
 correo;

 /**
  * Id del partido
  *
  * @property partido
  * @type Number
  */
 @belongsTo('partido')
 partido;

 /**
  * edad
  *
  * @property edad
  * @type Number
  */
 @attr('number')
 edad;

 /**
  * estadoCivil
  *
  * @property estadoCivil
  * @type String
  */
 @attr('string')
 estadoCivil;

 /**
  * fechaDeNacimiento
  *
  * @property fechaDeNacimiento
  * @type String
  */
 @attr('string')
 fechaDeNacimiento;

 /**
  * lugarDeNacimiento
  *
  * @property lugarDeNacimiento
  * @type String
  */
 @attr('string')
 lugarDeNacimiento;

 /**
  * anosProfesional
  *
  * @property anosProfesional
  * @type Number
  */
 @attr('number')
 anosProfesional;

 /**
  * numeroColegiado
  *
  * @property numeroColegiado
  * @type Number
  */
 @attr('number')
 numeroColegiado;

 /**
  * sexo
  *
  * @property sexo
  * @type String
  */
 @attr('string')
 sexo;

 /**
  * fb
  *
  * @property fb
  * @type String
  */
 @attr('string')
 fb;

 /**
  * tw
  *
  * @property tw
  * @type String
  */
 @attr('string')
 tw;

 /**
  * fotoURL
  *
  * @property fotoURL
  * @type String
  */
 @attr('string')
 fotoURL;

 // Computed properties

 /**
 * Selector para Isotope. Genera un 'String' con etiquetas para poder filtrar elementos desde el HTML con Isotope.
 *
 * @property selector
 * @type String
 * @default ""
 */
 @computed('sexo', 'estado', 'partido')
 get selector() {
   let returnValue = '';

   if (this.sexo === 'Masculino') {
     returnValue += ' hombre';
   }

   if (this.sexo === 'Femenino') {
     returnValue += ' mujer';
   }

   if (this.estado === 'Descalificado') {
     returnValue += ' descalificado';
   }

   if (this.estado === 'En proceso') {
     returnValue += ' enProceso';
   }

   if (this.type) {
     returnValue += ' ' + this.type;
   }

   if (this.partido) {
     returnValue += ' ' + this.partido.get('nombreCorto').dasherize();
   }

   return returnValue;
 }

 /**
  * Foto del perfil, en el caso que fotoURL este vacío se verifica el sexo y se establece una imagen por defecto respectivamente.
  *
  * @param fotoURL String enlace de la foto
  * @param sexo Sexo del candidato.
  * @return String enlace de la foto del candidato
  */
 @computed('fotoURL', 'sexo')
 get fotoPerfil() {
   if (!isBlank(this.fotoURL)) {
     return this.fotoURL;
   }

   if (this.sexo === 'Masculino') {
     return 'mi-guatemala/img/candidato.png';
   }

   if (this.sexo === 'Femenino') {
     return 'mi-guatemala/img/candidata.png';
   }

   if(parseInt(this.id.slice(this.id.indexOf('-') + 1)) % 2 === 0) {
     return 'mi-guatemala/img/candidata.png';
   }

   return 'mi-guatemala/img/candidato.png';
 }
}
