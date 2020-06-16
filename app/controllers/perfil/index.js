import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import pagesNumbersByPage from 'partidospublicos/utils/pagination/pagesNumbersByPage';

const array_chunks = (array, chunk_size) =>
  Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map(begin => array.slice(begin, begin + chunk_size));

export default class IndexController extends Controller {
  page = 1;
  size = 10;

  init() {
    super.init(...arguments);
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
        xAxes: [{
          ticks: {
              beginAtZero: true,
              callback: (s) => {
                return `${s} %`;
              },
          }
        }]
      }
    });

    this.set('comprasColumns', [
      {
        name: 'Compras',
        valuePath: 'Compras'
      },
      {
        name: 'ModalidadLCE',
        valuePath: 'ModalidadLCE'
      },
      {
        name: 'Fecha',
        valuePath: 'Fecha'
      },
      {
        name: 'Estatus',
        valuePath: 'Estatus'
      },
      {
        name: 'Monto',
        valuePath: 'Monto',
        money: true
      }
    ]);
  }

  @computed('model')
  get trazadores() {
    return {
      labels: [
        'Medicamentos trazadores',
        'Insumos médico-quirúrgico trazador '
      ],
      datasets: [
        {
          label: 'Disponibilidad de trazadores a un mes de Febrero 2020',
          data: [
            this.model.profile.trazadores1MFebrero,
            this.model.profile.quirurgicoTrazador1MFebrero
          ],
          backgroundColor: "rgba(128, 211, 171, 50)"
        }
      ]
    };
  }

  @computed('model')
  get medicamentos1M() {
    return {
      labels: [
        'Medicamentos',
        'Insumos médico-quirúrgicos',
        'Reactivos para Laboratorio Clínico',
        'Reactivos para Banco de Sangre',
      ],
      datasets: [
        {
          label: 'Disponibilidad de medicamentos a 1 mes de Febrero 2020',
          data: [
            this.model.profile.medicamentos1MFebrero,
            this.model.profile.quirurgico1MFebrero,
            this.model.profile.laboratorio1MFebrero,
            this.model.profile.banco1MFebrero,
          ],
          backgroundColor: "rgba(128, 211, 171, 50)"
        }
      ]
    };
  }

  @computed('model')
  get medicamentos3M() {
    return {
      labels: [
        'Medicamentos',
        'Insumos médico-quirúrgicos',
        'Reactivos para Laboratorio Clínico',
        'Reactivos para Banco de Sangre'
      ],
      datasets: [
        {
          label: 'Disponibilidad medicamentos a 3 meses de Febrero 2020',
          data: [
            this.model.profile.medicamentos3MFebrero,
            this.model.profile.quirurgico3MFebrero,
            this.model.profile.laboratorio3MFebrero,
            this.model.profile.banco3MFebrero
          ],
          backgroundColor: "rgba(128, 211, 171, 50)"
        }
      ]
    };
  }

  @computed('model')
  get footCompras() {
    return [
      {
        Compras: 'Monto total',
        Monto: this.model.compras.filterBy('Estatus', 'Terminado adjudicado').mapBy('Monto').reduce((prev, current) => prev + current).toFixed(2)
      }
    ];
  }

  @computed('model.compras')
  get chunks() {
    return array_chunks(this.model.compras, this.size);
  }

  @computed('chunks', 'page')
  get comprasPaginated() {
    return this.chunks[this.page - 1];
  }

  @computed('chunks', 'page')
  get pages() {
    return pagesNumbersByPage(this.chunks.length, this.page);
  }

  @action
  selectPage(page) {
    this.set('page', page);
  }

  @action
  prevPage() {
    this.set('page', this.page > 1 ? this.page - 1 : 1);
  }

  @action
  nextPage() {
    this.set('page', this.page < this.chunks.length ? this.page + 1 : this.chunks.length)
  }

  // sortingUpdate(sort) {
  //   if(this.currentSort !== null && this.currentSort.firstObject.valuePath === sort.firstObject.valuePath) {
  //     sort.firstObject.isAscending = !this.currentSort.firstObject.isAscending;
  //   }

  //   this.set('currentSort', sort);
  //   this.set('page', 1);
  // }
}
