import Component from '@ember/component';
import OrgChart from 'orgchart.js';

export default Component.extend({
  classNames: ['d-flex'],

  didRender() {
    this._super(...arguments);

    let datascource = {
      'name': 'Entidad',
      'title': 'Puesto',
      'children': [
        { 'name': 'Entidad', 'title': 'Puesto' },
        { 'name': 'Entidad', 'title': 'Puesto',
          'children': [
            { 'name': 'Entidad', 'title': 'Puesto' },
            { 'name': 'Entidad', 'title': 'Puesto',
              'children': [
                { 'name': 'Entidad', 'title': 'Puesto' },
                { 'name': 'Entidad', 'title': 'Puesto',
                  'children': [
                    { 'name': 'Entidad', 'title': 'Puesto' },
                    { 'name': 'Entidad', 'title': 'Puesto' }
                  ]
                }
              ]
            }
          ]
        },
        { 'name': 'Entidad', 'title': 'Puesto' },
        { 'name': 'Entidad', 'title': 'Puesto' }
      ]
    };

    let orgchart = new OrgChart({
      'chartContainer': `#${this.elementId}`,
      'data' : datascource,
      'depth': 3,
      'toggleSiblingsResp': false,
      'nodeContent': 'title'
    });


    this.set('chart', orgchart);
  }
});
