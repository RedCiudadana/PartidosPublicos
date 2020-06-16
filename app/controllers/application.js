import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service
  router;

  @action
  updateApp() {
    window.location.reload();
  }
}
