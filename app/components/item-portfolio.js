import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const resolver = {
  institution: 'hospitales',
  election: 'elecciones',
  profile: 'perfiles',
  partido: 'partidos',
  autoridad: 'autoridades'
};

export default class ItemPortfolioComponent extends Component {
  @tracked profile = 1;

  resolver = resolver;

  get modelName() {
    console.log(this);
    if (this.args.profile) {
      return resolver[this.args.profile._internalModel.modelName];
    }

    return null;
  }
}
