import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | partidos/partido', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:partidos/partido');
    assert.ok(route);
  });
});
