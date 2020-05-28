import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagesNumbersByPage from 'misalud/utils/pagination/pagesNumbersByPage';

const array_chunks = (array, chunk_size) =>
  Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map(begin => array.slice(begin, begin + chunk_size));

export default Controller.extend({
  page: 1,
  size: 10,

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
  },

  trazadores: computed('model', function(){
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
  }),

  medicamentos1M: computed('model', function(){
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
  }),

  medicamentos3M: computed('model', function(){
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
  }),

  footCompras: computed('model', function(){
    return [
      {
        Compras: 'Monto total',
        Monto: this.model.compras.filterBy('Estatus', 'Terminado adjudicado').mapBy('Monto').reduce((prev, current) => prev + current).toFixed(2)
      }
    ];
  }),

  chunks: computed('model.compras', function() {
    return array_chunks(this.model.compras, this.size);
  }),

  comprasPaginated: computed('chunks', 'page', function() {
    return this.chunks[this.page - 1];
  }),

  pages: computed('chunks', 'page', function() {
    return pagesNumbersByPage(this.chunks.length, this.page);
  }),

  actions: {
    selectPage(page) {
      this.set('page', page);
    },

    prevPage() {
      this.set('page', this.page > 1 ? this.page - 1 : 1);
    },

    nextPage() {
      this.set('page', this.page < this.chunks.length ? this.page + 1 : this.chunks.length)
    },

    // sortingUpdate(sort) {
    //   if(this.currentSort !== null && this.currentSort.firstObject.valuePath === sort.firstObject.valuePath) {
    //     sort.firstObject.isAscending = !this.currentSort.firstObject.isAscending;
    //   }

    //   this.set('currentSort', sort);
    //   this.set('page', 1);
    // }
  }
});
