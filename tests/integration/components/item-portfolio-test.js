import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | item-portfolio', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{item-portfolio}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#item-portfolio}}
        template block text
      {{/item-portfolio}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
