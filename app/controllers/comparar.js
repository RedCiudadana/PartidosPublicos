import Controller from '@ember/controller';
import { merge } from '@ember/polyfills';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { typeOf } from '@ember/utils';

export default class CompararController extends Controller {

  propertiesToCompare = {
    secretarioGeneral: 'Secretario general',
    secretarioGeneralEnFunciones: 'Secretario general en funciones',
    fundacion: 'Fecha de fundación',
    principios: 'Declaración de principios',
    presencia: (partido) => {
      return {
        value: this.model.presencia.findBy('partidoId', partido.id).TotalAfiliados,
        label: 'Total de afiliados'
      };
    },
    financiamiento: (partido) =>{
      let financiamiento = this.model.financiamiento.findBy('partidoId', partido.id);

      let {
        Ingresos,
        FinanciamientoPublico,
        FinanciamientoPrivado,
        AutoFinanciamiento,
        OtrosIngresos,
        Egresos,
        GastosPermanentes,
        GastosFuncionamiento,
        Asambleas,
        CampanasAfiliacion,
        GastosCampana,
        Total,
      } = financiamiento;

      return {
        label: 'Financiamiento',
        value:
          `
          <div class="w-100 d-flex  mt-2" style="height: 1.5rem;">
              <p>Financiamiento publico</p>
              <p class="ml-auto">${FinanciamientoPublico}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <p>Financiamiento privado</p>
              <p class="ml-auto">${FinanciamientoPrivado}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <p>Autofinanciamiento</p>
              <p class="ml-auto">${AutoFinanciamiento}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <p>Otros ingresos</p>
              <p class="ml-auto">${OtrosIngresos}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <strong class="text-muted">Ingresos</strong>
              <p class="ml-auto">${Ingresos}</p>
          </div>
          <hr>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <p>Gastos permanentes</p>
              <p class="ml-auto">${GastosPermanentes}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <p>Gastos funcionamiento</p>
              <p class="ml-auto">${GastosFuncionamiento}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <p>Asambleas</p>
              <p class="ml-auto">${Asambleas}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <p>Campanas afiliacion</p>
              <p class="ml-auto">${CampanasAfiliacion}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <p>Gastos campana</p>
              <p class="ml-auto">${GastosCampana}</p>
          </div>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <strong class="text-muted">Egresos</strong>
              <p class="ml-auto">${Egresos}</p>
          </div>
          <hr>
          <hr>
          <div class="w-100 d-flex" style="height: 1.5rem;">
              <strong>Total</strong>
              <p class="ml-auto">${Total}</p>
          </div>
          `,
        isSafeString: true
      };
    }
  };

  @tracked
  partido1 = null;

  @tracked
  partido2 = null;

  @action
  selectPartido1(partido) {
    this.partido1 = partido;
  }

  @action
  selectPartido2(partido) {
    this.partido2 = partido;
  }

  @computed('partido1')
  get camposPartido1() {
    if (!this.partido1) {
      return [];
    }

    return this.getCamposByPartido(this.partido1);
  }

  get camposPartido2() {
    if (!this.partido2) {
      return [];
    }

    return this.getCamposByPartido(this.partido2);
  }

  @computed('partido1', 'partido2')
  get campos() {
    let campos = [];

    if (!this.partido1 && !this.partido2) {
      return null;
    }

    // eslint-disable-next-line no-unused-vars
    for (let key in this.propertiesToCompare) {
      let entry = [];

      if (this.partido1) {
        if (typeOf(this.propertiesToCompare[key]) === 'function') {
          entry.push(
            merge(
              this.propertiesToCompare[key](this.partido1),
              { isPartido1: true }
            )
          );
        } else {
          entry.push({
            label: this.propertiesToCompare[key],
            value: this.partido1.get(key),
            isPartido1: true
          });
        }
      } else {
        entry.push(false);
      }

      if (this.partido2) {
        if (typeOf(this.propertiesToCompare[key]) === 'function') {
          entry.push(
            merge(
              this.propertiesToCompare[key](this.partido2),
              { isPartido2: true }
            )
          );
        } else {
          entry.push({
            label: this.propertiesToCompare[key],
            value: this.partido2.get(key),
            isPartido2: true
          });
        }
      } else {
        entry.push(false);
      }

      campos.push(entry);
    }

    return campos;
  }

  getCamposByPartido(partido) {
    let campos = [];

    // eslint-disable-next-line no-unused-vars
    for (let key in this.propertiesToCompare) {
      campos.push({
        label: key,
        value: partido[key],
      });
    }

    return campos;
  }
}
