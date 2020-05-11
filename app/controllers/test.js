import Controller from '@ember/controller';

export default class TestController extends Controller {
  init() {
    super.init(...arguments);
    this.data = {
      labels: [
        'Compra Directa con Oferta Electrónica (Art. 43 LCE Inciso b)',
        'Arrendamiento o Adquisición de Bienes Inmuebles (Art.43 inciso e)',
        'Cotización (Art. 38 LCE)',
        'Procedimientos Regulados por el artículo 44 LCE (Casos de Excepción)',
        'Adquisición Directa por Ausencia de Oferta (Art. 32 LCE)',
        'Convenios y Tratados Internacionales (Art. 1 LCE)',
        'Arrendamientos por Cotización(Art.43 inciso d )',
        'Negociaciones entre Entidades Públicas (Art. 2 LCE)',
        'Licitación Pública (Art. 17 LCE)'
      ],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3, 4, 10, 12],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
    };

    this.dataBar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Vigentes',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          data: [
            10,
            5,
            4,
            8,
            12
          ]
        },
        {
          label: 'En Evaluación',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          data: [
            14,
            10,
            2,
            6,
            7
          ]
        },
        {
          label: 'Terminados Adjudicados',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          data: [
            12,
            8,
            9,
            11,
            7
          ]
        },
        {
          label: 'Finalizados Anulados',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          data: [
            11,
            8,
            6,
            10,
            12
          ]
        },
        {
          label: 'Finalizados Desiertos',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          data: [
            12,
            5,
            8,
            4,
            0
          ]
        }
      ]
    };

    this.optionsBar = {
			title: {
				display: true,
				text: 'Chart.js Bar Chart - Stacked'
			},
			tooltips: {
				mode: 'index',
				intersect: false
			},
			responsive: true,
			scales: {
				xAxes: [{
					stacked: true,
				}],
				yAxes: [{
					stacked: true
				}]
			}
		};
  }
}
