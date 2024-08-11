import { module, test } from 'qunit';
import { setupTest } from 'todo-list/tests/helpers';

module('Unit | Service | tasks', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:tasks');
    assert.ok(service);
  });

  test('load tasks', function (assert) {
    // TODO
  });

  test('create task', function (assert) {
    // TODO
  });

  test('update task description', function (assert) {
    // TODO
  });

  test('update task completion', function (assert) {
    // TODO
  });

  test('delete task', function (assert) {
    // TODO
  });
});
