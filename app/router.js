import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('institucion', function() {
    this.route('frente-a-frente');
  });

  // TODO: Rutas pendiente de completar
  this.route('perfil', {path: '/perfil/:id'}, function() {
    this.route('frente-a-frente');
    this.route('propuestas');
    this.route('fact-checking');
  });

  this.route('perfiles');

  this.route('comision', function() {
    this.route('diputado', { path: '/:id' }, function() {});
  });

  this.route('propuestas');

  this.route('metodologia');

  this.route('contacto');

  this.route('resultados');
});

export default Router;
