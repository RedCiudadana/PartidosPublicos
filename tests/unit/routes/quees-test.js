import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | quees', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:quees');
    expect(route).to.be.ok;
  });
});
