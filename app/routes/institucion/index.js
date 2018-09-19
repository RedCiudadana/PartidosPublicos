import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: null,

  model() {
    return this.modelFor('institucion');
  }
});
