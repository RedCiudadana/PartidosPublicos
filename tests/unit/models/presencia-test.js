import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Model | presencia', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('presencia', {});
    expect(model).to.be.ok;
  });
});
