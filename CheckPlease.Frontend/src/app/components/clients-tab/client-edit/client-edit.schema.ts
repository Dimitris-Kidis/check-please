import * as _ from 'lodash-es';
import { ITextAreaEditControlSchema } from '../../../common/controls/text-area-edit-control/text-area-edit-control.schema';
import { ITextEditControlSchema } from '../../../common/controls/text-edit-control/text-edit-control.schema';

export interface IClientEditSchema {
  formGroupName: string;
  fullName: ITextEditControlSchema;
  phoneNumber: ITextEditControlSchema;
  additionalNotes: ITextAreaEditControlSchema;
}

export function getClientEditSchema(): IClientEditSchema {
  const id = _.uniqueId('clientEditGroup');

  return {
    formGroupName: id,
    fullName: {
      controlId: 'fullNameId' + id,
      formName: 'fullNameForm',
      fieldName: 'fullName',
      placeholder: 'CLIENTS.CLIENT.FIELD.NAME',
      autofocus: true,
      translationKey: 'CLIENTS.CLIENT.FIELD.NAME',
    },
    phoneNumber: {
      controlId: 'phoneNumberId' + id,
      formName: 'phoneNumberForm',
      fieldName: 'phoneNumber',
      placeholder: 'CLIENTS.CLIENT.FIELD.PHONE_NUMBER',
      translationKey: 'CLIENTS.CLIENT.FIELD.PHONE_NUMBER',
    },
    additionalNotes: {
      controlId: 'additionalNotesId' + id,
      formName: 'additionalNotesForm',
      fieldName: 'additionalNotes',
      placeholder: 'COMMON.FIELD.ADDITIONAL_NOTES.PLACEHOLDER',
      translationKey: 'COMMON.FIELD.ADDITIONAL_NOTES',
      autosize: null,
      rows: 20,
      maxLength: 4000,
    },
  };
}
