import { registerDeprecationHandler } from '@ember/debug';
import debug from 'debug';

/**
 * Oculta las depreciaciones.
 *
 * @class Initializer.Main
 */
export function initialize(/* application */) {

  /**
   * Herramienta para generar logs.
   * @type debug
   */
  let log = debug('initializer:main');
  log('The deprecations are hidden but are showing in Ember\'s Inspector deprecations tab. See main initializer for more information.');

  /**
   * Oculta las depreciaciones.Referencia: https://guides.emberjs.com/v3.4.0/configuring-ember/handling-deprecations/.
   *
   * @method registerDeprecationHandler
   */
  registerDeprecationHandler((message, options, next) => {
    if (options && options.until && options.until !== '3.0.0') {
      return;
    } else {
      next(message, options);
    }
  });
}

export default {
  initialize
};
