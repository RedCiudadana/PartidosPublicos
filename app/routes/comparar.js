import Route from '@ember/routing/route';

export default class CompararRoute extends Route {
  model() {
    return this.store.findAll('partido');
  }
}
