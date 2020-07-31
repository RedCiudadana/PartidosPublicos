import Component from '@glimmer/component';
import { A } from '@ember/array';

export default class ProfileFunctionalities extends Component {
  get links() {
    if (this.args.model.profile) {
      if (this.args.model.profile._internalModel.modelName === 'partido') {
        return A([
          {
            route: 'perfil.index',
            text: 'Partido Político',
          },
          {
            route: 'perfil.presencia',
            text: 'Presencia Nacional',
          },
          {
            route: 'perfil.participar',
            text: '¿Cómo Participar?'
          },
          {
            route: 'perfil.finanzas',
            text: 'Finanzas'
          },
          {
            route: 'perfil.sanciones',
            text: 'Sanciones'
          }
        ]);
      }

      if (this.args.model.profile._internalModel.modelName === 'autoridad') {
        return A([
          {
            route: 'perfil.index',
            text: 'Partido Político',
          }
        ]);
      }
    }
    return A([]);
  }

  get breadcrumbs() {
    if (this.args.model.profile._internalModel.modelName === 'autoridad') {
      return A([
        {
          route: 'perfil',
          model: ['partidos', this.args.model.profile.get('partidoId')],
          text: this.args.model.profile.partido,
        },
      ]);
    }

    return A([]);
  }
}
