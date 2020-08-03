import Model, { attr } from '@ember-data/model';

/**
 * Base model for people
 */
export default class Profile extends Model {
  @attr('string')
  partidoId;

  @attr('string')
  partido;

  @attr('string')
  nombre;

  @attr('string')
  sexo;

  @attr('string')
  puesto;

  @attr('string')
  organo;

  @attr('string')
  experienciaProfesional;

  @attr('string')
  experienciaAcademica;

  @attr('string')
  historialPolitico;

  @attr('string')
  enlaceCandidatos;

  @attr('string')
  institution;

  get photo() {
    if (this.sexo === 'Masculino') {
      return 'mi-guatemala/img/candidato.png';
    }

    if (this.sexo === 'Femenino') {
      return 'mi-guatemala/img/candidata.png';
    }

    return 'mi-guatemala/img/candidata.png';
  }
}

