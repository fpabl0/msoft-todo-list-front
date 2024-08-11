import { module, test } from 'qunit';
import { setupRenderingTest } from 'todo-list/tests/helpers';
import { render, waitFor, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { Task } from 'todo-list/bmodels/task';

module('Integration | Component | task/list', function (hooks) {
  setupRenderingTest(hooks);

  test('show message when no tasks', async function (assert) {
    await render(hbs`<Task::List />`);
    assert.dom('p').hasText('No tiene tareas agregadas');
    assert.dom('li').doesNotExist();
  });

  test('show all loaded tasks', async function (assert) {
    this.owner
      .lookup('service:tasks')
      .loadTasks([
        new Task(1, { description: 'Comprar galletas', completed: false }),
        new Task(2, { description: 'Vender radio', completed: true }),
      ]);
    await render(hbs`<Task::List />`);
    assert.dom().doesNotContainText('No tiene tareas agregadas');
    assert.dom().containsText('Comprar galletas');
    assert.dom().containsText('Vender radio');
  });

  test('show new task when created', async function (assert) {
    const s = this.owner.lookup('service:tasks');
    await s.loadTasks([
      new Task(1, { description: 'Comprar galletas', completed: false }),
      new Task(2, { description: 'Vender radio', completed: true }),
    ]);

    await render(hbs`<Task::List />`);
    assert.dom().containsText('Comprar galletas');
    assert.dom().containsText('Vender radio');
    assert.dom().doesNotContainText('Ultima tarea');

    await s.createTask('Ultima tarea');
    await waitFor(`#task-item-${s.tasks[s.tasks.length - 1]!.id}`);
    assert.dom().containsText('Comprar galletas');
    assert.dom().containsText('Vender radio');
    assert.dom().containsText('Ultima tarea');
  });

  test('remove task when deleted', async function (assert) {
    const s = this.owner.lookup('service:tasks');
    await s.loadTasks([
      new Task(1, { description: 'Comprar galletas', completed: false }),
      new Task(2, { description: 'Vender radio', completed: true }),
    ]);

    await render(hbs`<Task::List />`);
    assert.dom().containsText('Comprar galletas');
    assert.dom().containsText('Vender radio');

    await s.deleteTask(1);
    waitUntil(() => {
      assert.dom().doesNotContainText('Comprar galletas');
      assert.dom().containsText('Vender radio');
      return true;
    });
  });
});
