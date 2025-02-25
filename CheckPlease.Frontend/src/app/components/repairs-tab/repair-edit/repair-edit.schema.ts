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
      translationKey: 'REPAIRS.REPAIR.REPAIR_MILEAGE',
      placeholder: 'REPAIRS.REPAIR.REPAIR_MILEAGE',
    },
    repairDate: {
      controlId: 'repairDateId' + id,
      formName: 'repairDateForm',
      fieldName: 'repairDate',
      placeholder: 'REPAIRS.REPAIR.REPAIR_DATE',
      translationKey: 'REPAIRS.REPAIR.REPAIR_DATE',
    },
    isSentToBot: {
      controlId: 'isSentToBotId' + id,
      formName: 'isSentToBotForm',
      fieldName: 'isSentToBot',
      translationKey: 'BOT.SEND',
      checkboxType: CheckboxType.ViewBoolean,
    },
    additionalNotes: {
      controlId: 'additionalNotesId' + id,
      formName: 'additionalNotesForm',
      fieldName: 'additionalNotes',
      placeholder: 'COMMON.FIELD.ADDITIONAL_NOTES.PLACEHOLDER',
      translationKey: 'COMMON.FIELD.ADDITIONAL_NOTES',
      autosize: null,
      rows: 10,
      maxLength: 4000,
    },
  };
}
