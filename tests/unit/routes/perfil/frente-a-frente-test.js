import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil/frente-a-frente', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil/frente-a-frente');
    expect(route).to.be.ok;
  });
});
