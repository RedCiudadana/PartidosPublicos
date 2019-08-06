import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil/candidatos', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil/candidatos');
    expect(route).to.be.ok;
  });
});
