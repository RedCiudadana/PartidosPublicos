import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CompararController extends Controller {
  propertiesToCompare = {
    secretarioGeneral: 'Secretario general',
    secretarioGeneralEnFunciones: 'Secretario general en funciones',
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
    console.log('computed campos partido1');
    if (!this.partido1) {
      return [];
    }

    console.log(this.getCamposByPartido(this.partido1));
    return this.getCamposByPartido(this.partido1);
  }

  get camposPartido2() {
    if (!this.partido2) {
      return [];
    }

    return this.getCamposByPartido(this.partido2);
  }

  get campos() {
    let campos = [];

    if (!this.partido1 && !this.partido2) {
      return null;
    }

    // eslint-disable-next-line no-unused-vars
    for (let key in this.propertiesToCompare) {
      campos.push([
        this.partido1
          ? {
              label: this.propertiesToCompare[key],
              value: this.partido1[key],
            }
          : false,
        this.partido2
          ? {
              label: this.propertiesToCompare[key],
              value: this.partido2[key]
            }
          : false,
      ]);
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
