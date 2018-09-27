import Route from '@ember/routing/route';
import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';

/**
 * Index Route
 *
 * @class Route.Index
 */
export default Route.extend({

  /**
   * Model hook
   *
   * @method model
   * @return {Object} Objeto con los datos de Route.Application.model().
   */
  model() {
    return this.modelFor('application');
  },

  /**
   * Levanta nuestro controlador, manejamos el hook 'afterRender' para mostar un Slider o/y activar la animación de Isotope.
   *
   * @method setupController
   * @param  {Controller} controller clase controlador.
   * @param  {Object} model      modelo de la ruta.
   */
  setupController(controller, model) {
    this._super(controller, model);

    scheduleOnce('afterRender', this, function() {
      // TODO: Pendiente de re-habilitar: esta sección habilita por primera vez la animación
      // de Isotope para organizar y filtrar funcionarios
      var $container = $('#portfolio');

      $(window).resize(function() {
        $container.isotope('layout');
      });

      if (model.config.banner1Accordion) {
        $('#slider').gridAccordion({
          width: $('#slider').width(),
          height: 250,
          captionHeight: 40,
          captionTop: 200,
          captionLeft: 100,
          columns: model.config.mainPageSliderData.length,
          distance: 2,
          openedPanelWidth: 500,
          alignType: 'centerCenter',
          linkTarget: '_self',
          slideshow: true
        });
      }
    });
  }
});
