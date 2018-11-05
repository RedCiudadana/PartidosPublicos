import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';

export default Controller.extend({
  /**
   * Hash
   */
  frenteAFrenteSectionGroupedFields: computed('frenteAFrenteFields', function() {
    let groupedFields = {};

    this.get('frenteAFrenteFields').forEach((item) => {
      if (isNone(groupedFields[item.section])) {
        groupedFields[item.section] = {};
      }

      groupedFields[item.section][item.field] = {
        field: item.field,
        label: item.label
      };
    });

    return groupedFields;
  }),

  perfilUno: computed('perfilUnoId', function() {
    return this.get('model.profiles').findBy('id', this.get('perfilUnoId'));
  }),

  perfilDos: computed('perfilDosId', function() {
    return this.get('model.profiles').findBy('id', this.get('perfilDosId'));
  })
});
