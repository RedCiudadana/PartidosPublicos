/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const nodeSass = require('node-sass');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    SRI: {
      enabled: false
    },

    'ember-bootstrap': {
      'bootstrapVersion': 4,
      'importBootstrapFont': false,
      // No incluir el archivo de boostrap.css porque se incluyen el archivo app.scss.
      'importBootstrapCSS': false
    },

    sassOptions: {
      // Utilizar nodeSass, es drasticamente más rapido.
      implementation: nodeSass
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('node_modules/flexslider/jquery.flexslider-min.js');
  app.import('node_modules/isotope-layout/dist/isotope.pkgd.min.js');
  app.import('node_modules/tabletop/src/tabletop.min.js');
  app.import('vendor/jquery.gridAccordion.js');
  app.import('vendor/shims.js');

  return app.toTree();
};
