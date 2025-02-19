import { ITextAreaAutosizeSchema } from './text-area-autosize.schema';

export interface ITextAreaEditControlSchema {
  formName: string;
  fieldName: string;
  controlId: string;
  translationKey?: string;
  suffix?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  spellCheck?: boolean;
  isLengthCounterEnabled?: boolean;
  rows?: number;
  isWarningCounterEnabled?: boolean;
  warningMessage?: string;
  autosize?: ITextAreaAutosizeSchema | null;
  autofocus?: boolean;
}
