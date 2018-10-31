import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        const party = this.store.peekRecord('partido', params.id);
        let commissionDeputies = A(this.store.peekAll('commission-deputie')).filter((data) => {
            return data.partidoActual.content === party;
        })
        return {
            party: party,
            members: commissionDeputies
        }
    }
});
