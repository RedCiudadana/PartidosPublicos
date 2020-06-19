import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil/sanciones', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil/sanciones');
    expect(route).to.be.ok;
  });
});
