import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil/participar', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil/participar');
    expect(route).to.be.ok;
  });
});
