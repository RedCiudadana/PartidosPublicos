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
            return formatMoney(tooltipItem.value);
          }
        }
      },
      scales: {
        yAxes: [{
            ticks: {
                // Include a dollar sign in the ticks
                callback: formatMoney
            }
        }]
      }
    });
  },

  lineData: computed('model', function(){
    if (isEmpty(this.model.presupuesto)) {
      return false;
    }

    return {
        labels: this.model.presupuesto.mapBy('label'),
        datasets: [
            {
                label: "Presupuesto",
                data: this.model.presupuesto.mapBy('value')
            }
        ]
    };
  })
});
