import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  // Servicio para Google Analytics (ember-metrics)
  metrics: service(),

  // Llamar a '_trackPage' en cada transición
  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  // Registra la página visitada con el servicio 'metrics'
  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.url;
      const title = this.getWithDefault('currentRouteName', 'unknown');
      this.metrics.trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('perfil', { path: '/:model/:id' }, function() {
    this.route('partido');
    this.route('elecciones');
    // this.route('frente-a-frente');
  });

  this.route('perfiles', { path: '/:model'});
});

export default Router;
