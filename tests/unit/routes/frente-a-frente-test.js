import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | frente-a-frente', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:frente-a-frente');
    assert.ok(route);
  });
});
