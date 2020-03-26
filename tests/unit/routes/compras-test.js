import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | compras', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:compras');
    expect(route).to.be.ok;
  });
});
