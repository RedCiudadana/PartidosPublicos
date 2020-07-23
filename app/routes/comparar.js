import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default class CompararRoute extends Route {
  @service
  spreadsheets;

  model() {
    return hash({
      partidos: this.store.findAll('partido'),
      presencia: this.spreadsheets.fetch('presencia'),
      financiamiento: this.spreadsheets.fetch('financiamiento')
    });
  }
}
