import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
    model(params) {
        const party = this.store.peekRecord('partido', params.id);
        let modelData = A();
        let app = this.modelFor('application');
        modelData.pushObjects(app.presidents.toArray());
        modelData.pushObjects(app.listado.toArray());
        modelData.pushObjects(app.distrito.toArray());
        modelData.pushObjects(app.parlacens.toArray());
        modelData.pushObjects(app.mayors.toArray());
        console.log(modelData);

        let commissionDeputies = modelData.filter((data) => {
            return data.partidoActual.content === party;
        })
        return {
            party: party,
            members: commissionDeputies
        }
    }
});
