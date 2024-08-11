import { module, test } from 'qunit';
import { setupRenderingTest } from 'todo-list/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | auth/login-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Auth::LoginForm />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Auth::LoginForm>
        template block text
      </Auth::LoginForm>
    `);

    assert.dom().hasText('template block text');
  });
});
