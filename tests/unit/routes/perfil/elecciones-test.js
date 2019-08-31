import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil/elecciones', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil/elecciones');
    expect(route).to.be.ok;
  });
});
