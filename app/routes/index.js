import Route from '@ember/routing/route';
import $ from 'jquery';
import { scheduleOnce } from '@ember/runloop';

export default Route.extend({

  model() {
    return this.modelFor('application');
  },

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
  },

  actions: {

    // TODO: Pendiente de re-habilitar: esta función aplica un selector para el
    // filtro de funcionarios
    applyFilter(selector) {

      var $container = $('#portfolio');

      $('#portfolio-filter li').removeClass('activeFilter');

      $('#' + selector).addClass('activeFilter');

      var isotopeSelector = 'pf-todos' === selector ? '*' : '.' + selector;

      $container.isotope({transitionDuration: '0.65s'});

      $container.isotope({filter: isotopeSelector});

      return false;
    },

    // TODO: Pendiente de re-habilitar: esta función aplica un shuffle a los items
    // manejados por Isotope
    applyShuffle() {
      var $container = $('#portfolio');

      $container.isotope({transitionDuration: '0.65s'});

      $container.isotope('updateSortData').isotope({
        sortBy: 'random'
      });
    }
  }
});
