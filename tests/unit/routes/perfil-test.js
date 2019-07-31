import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil');
    expect(route).to.be.ok;
  });
});
