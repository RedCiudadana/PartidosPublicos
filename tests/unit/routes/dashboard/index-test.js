import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | dashboard/index', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:dashboard/index');
    expect(route).to.be.ok;
  });
});
