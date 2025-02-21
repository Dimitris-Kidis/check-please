import * as _ from 'lodash-es';
import { IDateEditControlSchema } from '../../common/controls/date-edit-control/date-edit-control.schema';
import { INumberEditControlSchema } from '../../common/controls/number-edit-control/number-edit-control.schema';
import { ITextAreaEditControlSchema } from '../../common/controls/text-area-edit-control/text-area-edit-control.schema';
import { ITextEditControlSchema } from '../../common/controls/text-edit-control/text-edit-control.schema';

export interface IRepairCreateSchema {
  formGroupName: string;
  mileage: INumberEditControlSchema;
  repairDate: IDateEditControlSchema;
  additionalNotes: ITextAreaEditControlSchema;
}

export interface IRepairCreateClientSchema {
  formGroupName: string;
  fullName: ITextEditControlSchema;
  phoneNumber: ITextEditControlSchema;
}

export interface IRepairCreateCarSchema {
  formGroupName: string;
  carSign: ITextEditControlSchema;
  oldMileage: INumberEditControlSchema;
  newMileage: INumberEditControlSchema;
}

export function getRepairCreateSchema(): IRepairCreateSchema {
  const id = _.uniqueId('repairCreateGroup');

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

export function getRepairCreateClientSchema(): IRepairCreateClientSchema {
  const id = _.uniqueId('repairCreateClientGroup');

  return {
    formGroupName: id,
    fullName: {
      controlId: 'fullNameId' + id,
      formName: 'fullNameForm',
      fieldName: 'fullName',
      translationKey: 'Имя клиента',
      readonly: true,
    },
    phoneNumber: {
      controlId: 'phoneNumberId' + id,
      formName: 'phoneNumberForm',
      fieldName: 'phoneNumber',
      translationKey: 'Номер телефона',
      readonly: true,
    },
  };
}

export function getRepairCreateCarSchema(): IRepairCreateCarSchema {
  const id = _.uniqueId('repairCreateCarGroup');

  return {
    formGroupName: id,
    carSign: {
      controlId: 'carSignId' + id,
      formName: 'carSignForm',
      fieldName: 'carSign',
      translationKey: 'Номер машины',
      readonly: true,
    },
    oldMileage: {
      controlId: 'oldMileageId' + id,
      formName: 'oldMileageForm',
      fieldName: 'oldMileage',
      translationKey: 'Старый пробег',
      readonly: true,
    },
    newMileage: {
      controlId: 'newMileageId' + id,
      formName: 'newMileageForm',
      fieldName: 'newMileage',
      translationKey: 'Новый пробег',
      placeholder: 'Пробег в день ремонта',
    },
  };
}
