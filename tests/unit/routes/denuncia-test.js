import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | denuncia', function() {
  setupTest();

  it('exists', function() {
    let route = this.owner.lookup('route:denuncia');
    expect(route).to.be.ok;
  });
});
