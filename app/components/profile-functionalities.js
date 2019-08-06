import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
   init({ model: { profile } }) {
     this._super(...arguments);
     this.set('links', A([
      { route: 'perfil.index', img: 'img/icono-perfil.png', text: 'Información general' }
     ]));

     if(profile._internalModel.modelName === "institution") {
      this.links.pushObjects([
        { route: 'perfil.autoridades', img: '', text: 'Autoridades'},
        { route: 'perfil.comision', img: '', text: 'Comisión de postulación' },
      ]);
     }

     if(profile._internalModel.modelName === "profile") {
      this.links.pushObjects([
        { route: 'perfil.frente-a-frente', img: '', text: 'Compara'},
      ]);
     }
   }
});
