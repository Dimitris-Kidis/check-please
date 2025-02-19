export interface IComboEditControlSchema<T = any> {
  formName: string;
  fieldName: string;
  controlId?: string;
  translationKey?: string;
  emptyValueTranslationKey?: string;
  options: IComboEditControlOption<T>[];
  suffix?: string;
}

export interface IComboEditControlOption<T = any> {
  translationKey: string | null;
  value: T;
}
