import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | resumen', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:resumen');
    expect(route).to.be.ok;
  });
});
