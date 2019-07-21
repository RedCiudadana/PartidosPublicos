import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  informacionGeneralFields: null,
  frenteAFrenteFields: null,
  recuadrosFields: null,

  normalize(modelClass, resourceHash) {
  // Los datos de los serializadores se establecen en la ruta 'application' en beforeModel()

    // Verifica que el serializador tenga datos antes de serializar
    if (this.informacionGeneralFields !== null) {
      resourceHash.informacionGeneral = {};

      this.informacionGeneralFields.forEach((item) => {
        resourceHash.informacionGeneral[item.field] = {
          label: item.label,
          value: resourceHash[item.field]
        };
      });
    }

    // Verifica que el serializador tenga datos antes de serializar
    if (this.recuadrosFields !== null) {
      resourceHash.recuadros = {};

      this.recuadrosFields.forEach((item) => {
        resourceHash.recuadros[item.field] = {
          label: item.label,
          value: resourceHash[item.field]
        };
      });
    }

    // Verifica que el serializador tenga datos antes de serializar
    if (this.frenteAFrenteFields !== null) {
      resourceHash.frenteAFrente = {};

      this.frenteAFrenteFields.forEach((item) => {
        resourceHash.frenteAFrente[item.field] = resourceHash[item.field];
      });
    }

    return this._super(modelClass, resourceHash);
  }
});
