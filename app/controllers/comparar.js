import Controller from '@ember/controller';
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
        value: this.model.presencia.findBy('partido', partido.id).TotalAfiliados,
        label: 'Total de afiliados'
      };
    },
    financiamiento: (partido) =>{
      let financiamiento = this.model.financiamiento.findBy('partido', partido.id);

      let {
        Ingresos,
        FinanciamientoPublico,
        FinanciamientoPrivado,
        AutoFinanciamiento,
        OtrosIngresos,
        Egresos,
      } = financiamiento;

      return {
        label: 'Financiamiento',
        value:
          `
          <strong>Ingresos</strong>: ${Ingresos} <br>
          <strong>Financiamiento publico</strong> ${FinanciamientoPublico} <br>
          <strong>Financiamiento privado</strong> ${FinanciamientoPrivado} <br>
          <strong>Autofinanciamiento</strong> ${AutoFinanciamiento} <br>
          <strong>Otros ingresos</strong> ${OtrosIngresos} <br>
          <strong>Egresos</strong> ${Egresos} <br>
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
    console.log('computed partidos');
    let campos = [];

    if (!this.partido1 && !this.partido2) {
      console.log('null');
      return null;
    }

    // eslint-disable-next-line no-unused-vars
    for (let key in this.propertiesToCompare) {
      let entry = [];

      if (this.partido1) {
        if (typeOf(this.propertiesToCompare[key]) === 'function') {
          entry.push(this.propertiesToCompare[key](this.partido1));
        } else {
          entry.push({
            label: this.propertiesToCompare[key],
            value: this.partido1.get(key),
          });
        }
      } else {
        entry.push(false);
      }

      if (this.partido2) {
        if (typeOf(this.propertiesToCompare[key]) === 'function') {
          entry.push(this.propertiesToCompare[key](this.partido2));
        } else {
          entry.push({
            label: this.propertiesToCompare[key],
            value: this.partido2.get(key),
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
