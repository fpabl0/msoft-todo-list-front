import { module, test } from 'qunit';
import { setupRenderingTest } from 'todo-list/tests/helpers';
import { click, render, triggerKeyEvent, typeIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { MockTasksService } from "todo-list/tests/helpers/mock-tasks-service";

module('Integration | Component | task/add', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    MockTasksService.registerFor(this);
  });

  test('it renders', async function (assert) {
    await render(hbs`<Task::Add />`);

    assert.dom('#add-task-btn').hasText('Agregar');
    assert.dom('#add-task-btn').isDisabled();
    assert.dom('#add-task-input').exists();
    assert.dom('#add-task-input').hasProperty('placeholder', 'Nueva tarea');
  });

  test('should disable button if input is empty', async function (assert) {
    await render(hbs`<Task::Add />`);

    assert.dom('#add-task-btn').isDisabled();

    await typeIn('#add-task-input', 'My first task');
    assert.dom('#add-task-btn').isEnabled();

    await click('#add-task-btn');
    assert.dom('#add-task-btn').isDisabled();

    await typeIn('#add-task-input', 'My other task');
    assert.dom('#add-task-btn').isEnabled();
  });

  test('should empty and blur the input when clicking Add or Enter', async function (assert) {
    await render(hbs`<Task::Add />`);

    await typeIn('#add-task-input', 'My first task');
    assert.dom('#add-task-input').hasValue('My first task');
    assert.dom('#add-task-input').isFocused();

    await click('#add-task-btn');
    assert.dom('#add-task-input').hasValue('');
    assert.dom('#add-task-input').isNotFocused();

    await typeIn('#add-task-input', 'My second task');
    assert.dom('#add-task-input').hasValue('My second task');
    assert.dom('#add-task-input').isFocused();

    await triggerKeyEvent('#add-task-input', 'keyup', 'Enter');
    assert.dom('#add-task-input').hasValue('');
    assert.dom('#add-task-input').isNotFocused();
  });

  test('should call the service createTask function when click on button or enter', async function (assert) {
    await render(hbs`<Task::Add />`);

    let called = 0;
    const s = MockTasksService.instanceFor(this);
    s.onCreateTask = async (desc: string) => {
      called++;
      if (called == 1) {
        assert.equal(desc, 'My important task');
      } else if (called == 2) {
        assert.equal(desc, 'My second task');
      }
    };

    await typeIn('#add-task-input', 'My important task');
    await click('#add-task-btn');
    assert.expect(1);

    await typeIn('#add-task-input', 'My second task');
    await triggerKeyEvent('#add-task-input', 'keyup', 'Enter');
    assert.expect(2);
  });
});
