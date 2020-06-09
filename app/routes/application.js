import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import {getCLS, getFID, getLCP} from 'web-vitals';

export default class ApplicationRoute extends Route {
  @service metrics
  @service router

  constructor() {
    super(...arguments);

    let router = this.router;
    router.on('routeDidChange', () => {
      const page = router.currentURL;
      const title = router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });

      /* eslint-disable no-console */

      getCLS(console.log);
      getFID(console.log);
      getLCP(console.log);

      /* eslint-enable no-console */
    });
  }
}
