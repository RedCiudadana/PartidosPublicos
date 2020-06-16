import { computed } from '@ember/object';
import Model, {/*  hasMany,  */attr } from '@ember-data/model';

export default class Institution extends Model {
  // Attributes
  @attr('string')
  banco1MFebrero;

  @attr('string')
  banco3MFebrero;

  @attr('string')
  correo;

  @attr('string')
  departamento;

  @attr('string')
  descripcion;

  @attr('string')
  direccion;

  @attr('string')
  facebook;

  @attr('string')
  horarioVisita;

  @attr('string')
  informacionpublica;

  @attr('string')
  laboratorio1MFebrero;

  @attr('string')
  laboratorio3MFebrero;

  @attr('string')
  medicamentos1MFebrero;

  @attr('string')
  medicamentos3MFebrero;

  @attr('string')
  municipalidad;

  @attr('string')
  nombre;

  @attr('string')
  paginaweb;

  @attr('string')
  quirurgico1MFebrero;

  @attr('string')
  quirurgico3MFebrero;

  @attr('string')
  quirurgicoTrazador1MFebrero;

  @attr('string')
  solicitudAIP;

  @attr('string')
  telefono;

  @attr('string')
  tipo;

  @attr('string')
  trazadores1MFebrero;

  @attr('string')
  twitter;

  @attr('string')
  urlHospital;

  // Relationships
  // members: hasMany('profile', {
  //   inverse: 'institution'
  // }),
  // comision: hasMany('election'),

  // Computed properties

  /**
   * This computed property return photoURL if is not blank, else return a default image.
   */
  @computed('fotoURL')
  get photo() {
    return 'img/hospital-default-img.png';

    // if (!isBlank(this.urlHospital)) {
    //   return this.urlHospital;
    // }

    // return 'img/img-default.png';
  }
}
