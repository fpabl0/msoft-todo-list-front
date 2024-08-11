import { action } from "@ember/object";
import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import type { FieldData } from "todo-list/bmodels/form-data";

export interface TextFormFieldSignature {
  // The arguments accepted by the component
  Args: {
    id: string;
    type?: string;
    label: string;
    data: FieldData;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: HTMLInputElement;
}

export default class TextFormFieldComponent extends Component<TextFormFieldSignature> {
  @tracked showErrorIfAny = false;
  @tracked errorMessage: string | null = null;

  constructor(owner: any, args: TextFormFieldSignature["Args"]) {
    super(owner, args);
    this.args.data.registerOnValidate(this.onValidate.bind(this));
  }

  get hasError() {
    return this.errorMessage !== null;
  }

  get inputType() {
    if (this.args.type === undefined) {
      return "text";
    }
    return this.args.type;
  }

  @action
  onFocusOut() {
    this.args.data.validate({ force: true });
  }

  @action
  onInput(ev: Event) {
    const input = (ev.target as HTMLInputElement);
    this.args.data.validate({ value: input.value });
  }

  onValidate(errMsg: string | null, force: boolean) {
    if (force) {
      this.showErrorIfAny = true;
    }
    this.errorMessage = errMsg;
  }
}
