import Component from '@glimmer/component';

const resolver = {
  institution: 'hospitales',
  election: 'elecciones',
  profile: 'perfiles',
  partido: 'partidos'
};

export default class ItemPortfolioComponent extends Component {
  constructor() {
    super(...arguments);
    // this.classNames = ['mb-4', 'col-12', 'col-sm-12', 'col-md-4', 'col-xl-3'];
  }

  get modelName() {
    return this.modelName = resolver[this.profile._internalModel.modelName];
  }
}
