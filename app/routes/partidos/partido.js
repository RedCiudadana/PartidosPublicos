import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        const partido = this.store.peekRecord('partido', params.id);
        let diputados = A(this.store.peekAll('commission-deputie')).filter((data) => {
            return data.partidoActual.content === partido;
        })
        return {
            partido: partido,
            miembros: diputados
        }
    }
});
