import * as _ from 'lodash-es';
export interface IFieldConfig {
  required: boolean;
  active: boolean;
  hidden: boolean;
  defaultValue?: any;
}

export class FieldConfig implements IFieldConfig {
  public active: boolean = true;
  public hidden: boolean = false;
  public required: boolean = false;
  public defaultValue?: any;

  public isActive(state: boolean = true): this {
    this.active = state;

    return this;
  }

  public isRequired(state: boolean = true): this {
    this.required = state;

    return this;
  }

  public isHidden(state: boolean = true): this {
    this.hidden = state;

    return this;
  }

  public extendWith<T>(extension?: Partial<T>): this {
    return _.extend(this, extension);
  }
}

export function buildFieldConfig(): FieldConfig {
  return new FieldConfig();
}

export function buildEmptyFieldConfig(): FieldConfig {
  const config = new FieldConfig();

  _.forOwn(config, (value, key) => {
    if (_.isFunction(value) == false) {
      delete (<any>config)[key];
    }
  });

  return config;
}

export function mergeFieldConfigCustomiser(a: any, b: any): any {
  if (a instanceof FieldConfig || b instanceof FieldConfig) {
    return _.merge(a, b);
  }
}
