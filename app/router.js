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
    scheduleOnce('afterRender', this, this.routerScroll);
  },

  routerScroll() {
    const page = this.url;
    const title = this.getWithDefault('currentRouteName', 'unknown');
    this.metrics.trackPage({ page, title });
  }
});

Router.map(function() {
  /**
   * Perfil ya sea de una institución o persona carga información dependiendo de eso. Es decir la ruta 'perfil' es el mismo para los dos.
   * Las subrutas en cambia varian según el modelo (institución o persona) y deberian detener la transición si se trata de ingresar a una ruta con un modelo inválido.
   */
  this.route('perfil', { path: '/:model/:id' }, function() {
    this.route('autoridades');
    this.route('frente-a-frente');
    this.route('candidatos');
    this.route('elecciones');
    this.route('comisionados');
  });

  this.route('perfiles', { path: '/:model'});
});

export default Router;
