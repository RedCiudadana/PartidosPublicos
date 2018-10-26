import { registerDeprecationHandler } from '@ember/debug';
import debug from 'debug';

/**
 * Main Initialzer
 * Unicamente controla las depreciaciones.
 *
 * @class Initializer.Main
 */
export function initialize(/* application */) {

  let log = debug('initializer:main');

  // Muestra un aviso.
  log('The deprecations are hidden but are showing in Ember\'s Inspector deprecations tab. See main initializer for more information.');

  /**
   * Deprecation Handler. Oculta las depreciaciones. See this: https://guides.emberjs.com/v3.4.0/configuring-ember/handling-deprecations/.
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
