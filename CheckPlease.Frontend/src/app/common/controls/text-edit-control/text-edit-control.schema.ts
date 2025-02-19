export interface ITextEditControlSchema {
  formName: string;
  fieldName: string;
  controlId?: string;
  translationKey?: string;
  suffix?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  spellCheck?: boolean;
  isLengthCounterEnabled?: boolean;
  className?: string;
  pattern?: string;
  type?: string;
  readonly?: boolean;
  autofocus?: boolean;
  isUppercase?: boolean;
}
