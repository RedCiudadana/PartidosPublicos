import Model, { attr, belongsTo } from '@ember-data/model';

export default class PresenciaModel extends Model {
  @attr('string')
  partido;

  @attr('string')
  nombreCompleto;

  @attr('string')
  siglas;

  @attr('string')
  TotalAfiliados;

  @attr('string')
  AfiliadosHombre;
  s
  @attr('string')
  AfiliadosMujere;
  s
  @attr('string')
  Guatemala;

  @attr('string')
  ElProgreso;

  @attr('string')
  Sacatepequez;

  @attr('string')
  Chimaltenango;

  @attr('string')
  Escuintla;

  @attr('string')
  SantaRosa;

  @attr('string')
  Solola;

  @attr('string')
  Totonicapan;

  @attr('string')
  Quetzaltenango;

  @attr('string')
  Suchitepequez;

  @attr('string')
  Retalhuleu;

  @attr('string')
  SanMarcos;

  @attr('string')
  Huehuetenango;

  @attr('string')
  Quiche;

  @attr('string')
  BajaVerapaz;

  @attr('string')
  AltaVerapaz;

  @attr('string')
  Peten;

  @attr('string')
  Izabal;

  @attr('string')
  Zacapa;

  @attr('string')
  Chiquimula;

  @attr('string')
  Jalapa;

  @attr('string')
  Jutiapa;

  // Relationships
  @belongsTo('partido')
  partido;
}
