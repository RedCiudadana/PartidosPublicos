import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  informacionGeneralFields: null,
  frenteAFrenteFields: null,
  recuadrosFields: null,

  normalize(modelClass, resourceHash) {
  // Los datos de los serializadores se establecen en la ruta 'application' en beforeModel()

    // Verifica que el serializador tenga datos antes de serializar
    if (this.get('informacionGeneralFields') !== null) {
      resourceHash.informacionGeneral = {};

      this.get('informacionGeneralFields').forEach((item) => {
        resourceHash.informacionGeneral[item.field] = {
          label: item.label,
          value: resourceHash[item.field]
        };
      });
    }

    // Verifica que el serializador tenga datos antes de serializar
    if (this.get('recuadrosFields') !== null) {
      resourceHash.recuadros = {};

      this.get('recuadrosFields').forEach((item) => {
        resourceHash.recuadros[item.field] = {
          label: item.label,
          value: resourceHash[item.field]
        };
      });
    }

    // Verifica que el serializador tenga datos antes de serializar
    if (this.get('frenteAFrenteFields') !== null) {
      resourceHash.frenteAFrente = {};

      this.get('frenteAFrenteFields').forEach((item) => {
        resourceHash.frenteAFrente[item.field] = resourceHash[item.field];
      });
    }

    return this._super(modelClass, resourceHash);
  }
});
