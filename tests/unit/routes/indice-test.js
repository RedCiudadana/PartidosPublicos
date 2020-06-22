import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | indice', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:indice');
    expect(route).to.be.ok;
  });
});
