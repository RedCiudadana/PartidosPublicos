import { registerDeprecationHandler } from '@ember/debug';

/**
 * Main Initialzer
 * Unicamente controla las depreciaciones.
 *
 * @class Initializer.Main
 */
export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');

  // Muestra un aviso.
  console.warn('The deprecations are hidden but are showing in Ember\'s Inspector deprecations tab. See main initializer for more information.');

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
