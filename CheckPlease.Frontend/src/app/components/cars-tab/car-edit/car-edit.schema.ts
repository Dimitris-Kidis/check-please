import * as _ from 'lodash-es';
import { INumberEditControlSchema } from '../../../common/controls/number-edit-control/number-edit-control.schema';
import { ITextAreaEditControlSchema } from '../../../common/controls/text-area-edit-control/text-area-edit-control.schema';
import { ITextEditControlSchema } from '../../../common/controls/text-edit-control/text-edit-control.schema';

export interface ICarEditSchema {
  formGroupName: string;
  carSign: ITextEditControlSchema;
  mileage: INumberEditControlSchema;
  vinCode: ITextEditControlSchema;
  brand: ITextEditControlSchema;
  model: ITextEditControlSchema;
  year: INumberEditControlSchema;
  volume: ITextEditControlSchema;
  additionalNotes: ITextAreaEditControlSchema;
}

export function getCarEditSchema(): ICarEditSchema {
  const id = _.uniqueId('carEditGroup');

  return {
    formGroupName: id,
    carSign: {
      controlId: 'carSignId' + id,
      formName: 'carSignForm',
      fieldName: 'carSign',
      placeholder: 'Номер машины',
      autofocus: true,
      translationKey: 'Номер',
      isUppercase: true,
    },
    mileage: {
      controlId: 'mileageId' + id,
      formName: 'mileageForm',
      fieldName: 'mileage',
      placeholder: 'Пробег',
      translationKey: 'Пробег',
      suffix: 'км',
    },
    vinCode: {
      controlId: 'vinCodeId' + id,
      formName: 'vinCodeForm',
      fieldName: 'vinCode',
      placeholder: 'Vin-код',
      translationKey: 'Vin-код',
      minLength: 17,
      maxLength: 17,
    },
    brand: {
      controlId: 'brandId' + id,
      formName: 'brandForm',
      fieldName: 'brand',
      placeholder: 'Марка',
      translationKey: 'Марка',
    },
    model: {
      controlId: 'modelId' + id,
      formName: 'modelForm',
      fieldName: 'model',
      placeholder: 'Модель',
      translationKey: 'Модель',
    },
    year: {
      controlId: 'yearId' + id,
      formName: 'yearForm',
      fieldName: 'year',
      placeholder: 'Год',
      translationKey: 'Год',
    },
    volume: {
      controlId: 'volumeId' + id,
      formName: 'volumeForm',
      fieldName: 'volume',
      placeholder: 'Объем двигателя',
      translationKey: 'Объем двигателя',
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
