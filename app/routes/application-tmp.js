import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

/**
 * @desc data service, JSON or Google's spreadsheets
 */
  spreadsheets: service()

});
