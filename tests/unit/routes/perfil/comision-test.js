import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil/comision', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil/comision');
    expect(route).to.be.ok;
  });
});
