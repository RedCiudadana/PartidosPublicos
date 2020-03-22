import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

const formatMoney = function(n) {
  n = n.toString();
  n = n.split('').reverse();


  n = n.reduce((total, currentValue, currentIndex) => {
    if (currentIndex % 3 == 0) {
      total += ',';
    }

    return total += currentValue;
  });

  return 'Q ' + n.split('').reverse().join('');
};

export default Controller.extend({
  init() {
    this._super(...arguments);
    // False is not collapsed
    this.set('presupuesto', false);
    this.set('experiencia', false);
    this.set('partidos', false);
    this.set('isCollapsedComissioners', false);
    this.set('misionYVision', false);

    this.set('options', {
      tooltips: {
        callbacks: {
          label: function(tooltipItem/* , data */) {
            return `${tooltipItem.value} %`;
          }
        }
      },
      scales: {
        yAxes: [{
            ticks: {
                // Include a dollar sign in the ticks
                callback: (s) => {
                  return `${s} %`;
                },
            }
        }]
      }
    });
  },

  lineData: computed('model', function(){
    return {
      labels: [
        'Medicamentos con disponibilidad mayor a 1 mes',
        'Medicamentos con disponibilidad mayor a 3 meses',
        'Medicamentos trazadores con disponibilidad mayor a 1 mes',
        'Medicamentos quirurgico trazador con disponibilidad mayor a 1 mes ',
        'Medicamentos quirurgicos con disponibilidad mayor a 1 mes',
        'Medicamentos quirurgicos con disponibilidad mayor a 3 meses',
        'Disponibilidad de Reactivos para Laboratorio Clínico mayor a 1 mes',
        'Disponibilidad de Reactivos para Laboratorio Clínico mayor a 3 meses',
        'Disponibilidad de Reactivos para Banco de Sangre mayor a 1 mes',
        'Disponibilidad de Reactivos para Banco de Sangre mayor a 3 meses'
      ],
      datasets: [
        {
          label: 'Febrero 2020',
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: [
            this.model.profile.medicamentos1MFebrero,
            this.model.profile.medicamentos3MFebrero,
            this.model.profile.trazadores1MFebrero,
            this.model.profile.quirurgicoTrazador1MFebrero,
            this.model.profile.quirurgico1MFebrero,
            this.model.profile.quirurgico3MFebrero,
            this.model.profile.laboratorio1MFebrero,
            this.model.profile.laboratorio3MFebrero,
            this.model.profile.banco1MFebrero,
            this.model.profile.banco3MFebrero
          ]
        }
      ]
    };
  })
});
