import { module, test } from 'qunit';
import { setupRenderingTest } from 'todo-list/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nav-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<NavBar />`);

    assert.dom('.navbar-brand').containsText('Tareas de');
    assert.dom('button').hasText('Cerrar sesión');
  });

  test('should show the current user name', function (hooks) {
    // TODO
  });

  test('should call the service logout function', function (hooks) {
    // TODO
  });
});
