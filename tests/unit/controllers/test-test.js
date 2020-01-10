import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Controller | test', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let controller = this.owner.lookup('controller:test');
    expect(controller).to.be.ok;
  });
});
