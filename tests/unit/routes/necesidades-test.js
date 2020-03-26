import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | necesidades', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:necesidades');
    expect(route).to.be.ok;
  });
});
