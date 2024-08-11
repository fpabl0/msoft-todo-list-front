import { module, test } from 'qunit';
import { setupRenderingTest } from 'todo-list/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | auth/base-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Auth::BaseForm />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Auth::BaseForm>
        template block text
      </Auth::BaseForm>
    `);

    assert.dom().hasText('template block text');
  });
});
