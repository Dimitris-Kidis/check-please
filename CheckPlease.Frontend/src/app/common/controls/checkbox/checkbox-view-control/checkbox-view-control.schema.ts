import { CheckboxType } from './checkbox-type';

export interface ICheckboxViewControlSchema {
  controlId: string;
  fieldName: string;
  translationKey: string;
  checkboxType: CheckboxType;
  tooltipTrueTranslationKey?: string;
  tooltipFalseTranslationKey?: string;
}
