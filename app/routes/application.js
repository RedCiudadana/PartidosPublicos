import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service metrics
  @service router

  constructor() {
    super(...arguments);

    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister.then((successfull) => {
          console.log(`Unregister is succesfull: ${successfull}`);
        });
     }
    });

    let router = this.router;
    router.on('routeDidChange', () => {
      const page = router.currentURL;
      const title = router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });
    });
  }
}
