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
      placeholder: 'Имя клиента',
      autofocus: true,
      translationKey: 'Имя',
    },
    phoneNumber: {
      controlId: 'phoneNumberId' + id,
      formName: 'phoneNumberForm',
      fieldName: 'phoneNumber',
      placeholder: 'Номер телефона',
      translationKey: 'Телефон',
    },
    additionalNotes: {
      controlId: 'additionalNotesId' + id,
      formName: 'additionalNotesForm',
      fieldName: 'additionalNotes',
      placeholder: 'Важная информация, скидки, напоминания и прочее...',
      translationKey: 'Дополнительные заметки',
      autosize: null,
      rows: 20,
      maxLength: 4000,
    },
  };
}
