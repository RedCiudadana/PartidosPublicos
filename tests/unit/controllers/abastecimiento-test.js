import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | abastecimiento', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let controller = this.owner.lookup('controller:abastecimiento');
    expect(controller).to.be.ok;
  });
});
