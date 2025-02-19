export interface IEmailEditControlSchema {
  formName: string;
  fieldName: string;
  controlId: string;
  translationKey?: string;
  placeholder?: string;
  spellCheck?: boolean;
  className?: string;
  maxLength?: number;
}
