import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('presupuesto', false);
    this.set('experiencia', false);
    this.set('partidos', false);
    this.set('comissioners', false);
    this.set('misionYVision', false);
  },

  lineValue1: 65,
  lineValue2: 59,
  lineLabel: "July",
  lineData: computed('lineValue1', 'lineValue2', 'lineLabel', function(){
    var labels = ["January", "February", "March", "April", "May", "June"];
    labels.push( this.get('lineLabel') );

    return {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "#F7464A",
                strokeColor: "rgba(10,10,10,1)",
                pointColor: "rgba(10,10,10,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(10,10,10,1)",
                data: [parseInt(this.get('lineValue1')), parseInt(this.get('lineValue2')), 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
  })
});
