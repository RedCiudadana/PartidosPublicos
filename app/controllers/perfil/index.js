import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  presupuesto: false,
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
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
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
