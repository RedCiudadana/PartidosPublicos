import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | perfil/autoridades', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:perfil/autoridades');
    expect(route).to.be.ok;
  });
});
