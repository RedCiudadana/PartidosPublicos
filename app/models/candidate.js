import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

/**
 * Modelo base para candidatos.
 *
 * @class Model.Candidate
 */
export default Model.extend({
  // Attributes

  /**
   * Nombre del candidato
   *
   * @property nombre
   * @type String
   */
  nombre: attr('string'),

  // FBM
  
  web: attr('string'),

  correo: attr('string'),

  /**
   * Id del partido
   *
   * @property partido
   * @type Number
   */
  partido: belongsTo('partido'),

  /**
   * edad
   *
   * @property edad
   * @type Number
   */
  edad: attr('number'),

  /**
   * estadoCivil
   *
   * @property estadoCivil
   * @type String
   */
  estadoCivil: attr('string'),

  /**
   * fechaDeNacimiento
   *
   * @property fechaDeNacimiento
   * @type String
   */
  fechaDeNacimiento: attr('string'),

  /**
   * lugarDeNacimiento
   *
   * @property lugarDeNacimiento
   * @type String
   */
  lugarDeNacimiento: attr('string'),

  /**
   * anosProfesional
   *
   * @property anosProfesional
   * @type Number
   */
  anosProfesional: attr('number'),

  /**
   * numeroColegiado
   *
   * @property numeroColegiado
   * @type Number
   */
  numeroColegiado: attr('number'),

  /**
   * sexo
   *
   * @property sexo
   * @type String
   */
  sexo: attr('string'),

  /**
   * fb
   *
   * @property fb
   * @type String
   */
  fb: attr('string'),

  /**
   * tw
   *
   * @property tw
   * @type String
   */
  tw: attr('string'),

  /**
   * fotoURL
   *
   * @property fotoURL
   * @type String
   */
  fotoURL: attr('string'),

  // Computed properties

  /**
  * Selector para Isotope. Genera un 'String' con etiquetas para poder filtrar elementos desde el HTML con Isotope.
  *
  * @property selector
  * @type String
  * @default ""
  */
  selector: computed('sexo', 'estado', 'partido', function() {
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
  }),

  /**
   * Foto del perfil, en el caso que fotoURL este vacío se verifica el sexo y se establece una imagen por defecto respectivamente.
   *
   * @param fotoURL String enlace de la foto
   * @param sexo Sexo del candidato.
   * @return String enlace de la foto del candidato
   */
  fotoPerfil: computed('fotoURL', 'sexo', function() {
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
  })

});
