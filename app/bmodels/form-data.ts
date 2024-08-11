export class FormData<K extends string> {
  fields: { [key in K]: FieldData };

  constructor(fields: { [key in K]: FieldData }) {
    this.fields = fields;
  }

  isValid(opts?: { force?: boolean }) {
    for (const n of Object.keys(this.fields) as K[]) {
      const err = this.fields[n]?.validate({ force: opts?.force ?? false });
      if (err !== null) {
        return false;
      }
    }
    return true;
  }
}

export class FieldData {
  value: string;
  validators: ((v: string) => string | null)[];
  private _onValidate?: (errMsg: string | null, force: boolean) => void;

  constructor(data: {
    value?: string;
    validators?: ((v: string) => string | null)[];
    isValid?: boolean;
  }) {
    this.value = data.value ?? '';
    this.validators = data.validators ?? [];
  }

  registerOnValidate(fn: (errMsg: string | null, force: boolean) => void) {
    this._onValidate = fn;
  }

  validate(opts?: { value?: string; force?: boolean }): string | null {
    let errMsg: string | null = null;
    for (const validator of this.validators) {
      const ret = validator(opts?.value ?? this.value);
      if (ret !== null) {
        errMsg = ret;
        break;
      }
    }
    if (!this._onValidate) return errMsg;
    this._onValidate(errMsg, opts?.force ?? false);
    return errMsg;
  }
}
