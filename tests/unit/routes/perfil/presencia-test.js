import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil/presencia', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil/presencia');
    expect(route).to.be.ok;
  });
});
