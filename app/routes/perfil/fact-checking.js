import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { hash } from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
  // TODO: Ver cómo hacer funcionar esta onda otra vez
  breadCrumb: null,

  spreadsheets: service(),

  model() {
    const spreadsheet = this.get('spreadsheets');

    let perfilConfigObject = this.modelFor('perfil');

    return hash({
      perfilConfigObject: perfilConfigObject,
      factCheckingGroupedItemsList: spreadsheet.fetch('fact-checking-data')
        // Filtrar por perfil
        .then((factCheckingData) => {
          return A(factCheckingData).filter((data) => {
            return data.perfil === perfilConfigObject.perfil.get('id');
          });
        })
        // Agrupar por sección
        .then((factCheckingData) => {
          let groupedData = {};

          A(factCheckingData).forEach((item, index) => {
            if (isNone(groupedData[item.section])) {
              groupedData[item.section] = {};
            }

            groupedData[item.section][index] = {
              title: item.title,
              quote: item.quote,
              fact: item.fact,
              source: item.source
            };
          });

          return groupedData;
        }),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set(
      'factCheckingFuncionalidad',
      model
        .perfilConfigObject
        .config
        .perfilFuncionalidades
        .findBy('route', 'perfil.fact-checking')
    );

    controller.set(
      'factCheckingGroupedItemsList',
      model.factCheckingGroupedItemsList
    );

    controller.set('perfil', model.perfilConfigObject.perfil);
  },

  actions: {
  }
});
