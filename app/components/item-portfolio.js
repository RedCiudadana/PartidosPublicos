import Component from '@ember/component';

const resolver = {
  institution: 'instituciones',
  election: 'elecciones',
  profile: 'perfiles'
};

export default class ItemPortfolioComponent extends Component {
  constructor(...args) {
    super(...arguments);
    this.set('modelName', null);
  }

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('modelName', resolver[this.profile._internalModel.modelName]);
  }
}
