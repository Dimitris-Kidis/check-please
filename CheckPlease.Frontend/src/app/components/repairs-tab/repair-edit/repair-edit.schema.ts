import * as _ from 'lodash-es';
import { ICheckboxEditControlSchema } from '../../../common/controls/checkbox/checkbox-edit-control/checkbox-edit-control.schema';
import { CheckboxType } from '../../../common/controls/checkbox/checkbox-view-control/checkbox-type';
import { ICheckboxViewControlSchema } from '../../../common/controls/checkbox/checkbox-view-control/checkbox-view-control.schema';
import { IDateEditControlSchema } from '../../../common/controls/date-edit-control/date-edit-control.schema';
import { INumberEditControlSchema } from '../../../common/controls/number-edit-control/number-edit-control.schema';
import { ITextAreaEditControlSchema } from '../../../common/controls/text-area-edit-control/text-area-edit-control.schema';

export interface IRepairEditSchema {
  formGroupName: string;
  mileage: INumberEditControlSchema;
  repairDate: IDateEditControlSchema;
  isSentToBot: ICheckboxEditControlSchema & ICheckboxViewControlSchema;
  additionalNotes: ITextAreaEditControlSchema;
}

export function getRepairEditSchema(): IRepairEditSchema {
  const id = _.uniqueId('repairEditGroup');

  return {
    formGroupName: id,
    mileage: {
      controlId: 'mileageId' + id,
      formName: 'mileageForm',
      fieldName: 'mileage',
      translationKey: 'Пробег на время ремонта',
      placeholder: 'Пробег',
    },
    repairDate: {
      controlId: 'repairDateId' + id,
      formName: 'repairDateForm',
      fieldName: 'repairDate',
      placeholder: 'Дата',
      translationKey: 'Дата ремонта',
    },
    isSentToBot: {
      controlId: 'isSentToBotId' + id,
      formName: 'isSentToBotForm',
      fieldName: 'isSentToBot',
      translationKey: 'Отправлен ботом',
      checkboxType: CheckboxType.ViewBoolean,
    },
    additionalNotes: {
      controlId: 'additionalNotesId' + id,
      formName: 'additionalNotesForm',
      fieldName: 'additionalNotes',
      placeholder: 'Важная информация, скидки, напоминания и прочее...',
      translationKey: 'Дополнительные заметки',
      autosize: null,
      rows: 10,
      maxLength: 4000,
    },
  };
}
