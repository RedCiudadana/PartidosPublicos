import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | presupuesto', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:presupuesto');
    expect(route).to.be.ok;
  });
});
