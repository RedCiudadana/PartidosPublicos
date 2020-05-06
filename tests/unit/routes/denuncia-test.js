import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | denuncias', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:denuncias');
    expect(route).to.be.ok;
  });
});
