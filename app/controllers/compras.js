import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  compras: computed('model', 'filterUnidad', 'filterModalidadLCE', 'filterEstatus', function() {
    if (
      this.filterUnidad === undefined
      && this.filterModalidadLCE === undefined
      && this.filterEstatus === undefined
    ) {
      return this.model.compras;
    }

    return this.model.compras.filter((compra) => {
      if (this.filterUnidad && compra.Unidad !== this.filterUnidad.Unidad) {
        return false;
      }

      if (this.filterModalidadLCE && compra.ModalidadLCE !== this.filterModalidadLCE.ModalidadLCE) {
        return false;
      }

      if (this.filterEstatus && compra.Estatus !== this.filterEstatus.Estatus) {
        return false;
      }

      return true;
    })
  }),

  FuenteCompras: computed('model', function() {
    return this.model.consultas.findBy('variable', 'FuenteCompras');
  }),

  FechaCompras: computed('model', function() {
    return this.model.consultas.findBy('variable', 'FechaCompras');
  }),

  DescargarExcel: computed('model', function() {
    return this.model.consultas.findBy('variable', 'DescargarExcel');
  }),

  DescargarPDF: computed('model', function() {
    return this.model.consultas.findBy('variable', 'DescargarPDF');
  }),


  montoTotal: computed('model', function() {
    return this.model.comprasresumen.findBy('variable', 'montoTotal');
  }),

  concursos: computed('model', function() {
    return this.model.comprasresumen.findBy('variable', 'concursos');
  }),

  concursosTerminados: computed('model', function() {
    return this.model.comprasresumen.findBy('variable', 'concursosTerminados');
  }),

  concursosVigente: computed('model', function() {
    return this.model.comprasresumen.findBy('variable', 'concursosVigente');
  }),


  UnidadOptions: computed('model', function() {
    return this.model.compras.uniqBy('Unidad');
  }),
    ModalidadLCEOptions: computed('model', function() {
    return this.model.compras.uniqBy('ModalidadLCE');
  }),
    EstatusOptions: computed('model', function() {
    return this.model.compras.uniqBy('Estatus');
  }),

  footCompras: computed('compras', function() {
    return [
      {
        Compras: 'Monto total',
        Monto: this.compras.filterBy('Estatus', 'Terminado adjudicado').mapBy('Monto').reduce((prev, current) => prev + current).toFixed(2)
      }
    ];
  })
});
