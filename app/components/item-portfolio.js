import Component from '@glimmer/component';

const resolver = {
  institution: 'hospitales',
  election: 'elecciones',
  profile: 'perfiles'
};

export default class ItemPortfolioComponent extends Component {
  constructor() {
    super(...arguments);
    this.set('modelName', null);
    this.set('classNames', ['mb-4', 'col-12', 'col-sm-12', 'col-md-4', 'col-xl-3']);
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    this.set('modelName', resolver[this.profile._internalModel.modelName]);
  }
}
