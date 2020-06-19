import Component from '@glimmer/component';

const resolver = {
  institution: 'hospitales',
  election: 'elecciones',
  profile: 'perfiles',
  partido: 'partidos'
};

export default class ItemPortfolioComponent extends Component {
  get modelName() {
    console.log(this);
    console.log(resolver[this.args.profile._internalModel.modelName]);
    // _internalModel.modelName
    if (this.args.profile) {
      return resolver[this.args.profile._internalModel.modelName];
    }

    return null;
  }
}
