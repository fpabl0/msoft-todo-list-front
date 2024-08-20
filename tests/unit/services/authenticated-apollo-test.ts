import { module, test } from 'qunit';
import { setupTest } from 'todo-list/tests/helpers';

module('Unit | Service | authenticated-apollo', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup('service:authenticated-apollo');
    assert.ok(service);
  });
});
