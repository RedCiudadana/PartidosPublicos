import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | test', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:test');
    expect(route).to.be.ok;
  });
});
