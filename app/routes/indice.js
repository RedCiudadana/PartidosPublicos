import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndiceRoute extends Route {
  @service
  spreadsheets;

  model() {
    return this.spreadsheets.fetch('indice').then((response) => {
      return response.map((indice) => {
        indice.IndiceNormativo = indice.IndiceNormativo.replace(',', '.');
        indice.IndiceEstructura = indice.IndiceEstructura.replace(',', '.');
        indice.IndiceAutoridades = indice.IndiceAutoridades.replace(',', '.');
        indice.IndicePrincipios = indice.IndicePrincipios.replace(',', '.');
        indice.IndiceFinanciamiento = indice.IndiceFinanciamiento.replace(',', '.');
        return indice;
      })
    });
  }
}
