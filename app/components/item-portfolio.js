import Component from '@ember/component';

const resolver = {
  institution: 'instituciones',
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
    this._super(...arguments);
    this.set('modelName', resolver[this.profile._internalModel.modelName]);
  }
}
