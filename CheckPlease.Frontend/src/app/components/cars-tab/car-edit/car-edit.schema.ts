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
      placeholder: 'CARS.CAR.FIELD.CAR_SIGN',
      autofocus: true,
      translationKey: 'CARS.CAR.FIELD.CAR_SIGN',
      isUppercase: true,
    },
    mileage: {
      controlId: 'mileageId' + id,
      formName: 'mileageForm',
      fieldName: 'mileage',
      placeholder: 'CARS.CAR.FIELD.MILEAGE',
      translationKey: 'CARS.CAR.FIELD.MILEAGE',
      suffix: 'км',
    },
    vinCode: {
      controlId: 'vinCodeId' + id,
      formName: 'vinCodeForm',
      fieldName: 'vinCode',
      placeholder: 'CARS.CAR.FIELD.VIN_CODE',
      translationKey: 'CARS.CAR.FIELD.VIN_CODE',
      minLength: 17,
      maxLength: 17,
      isUppercase: true,
    },
    brand: {
      controlId: 'brandId' + id,
      formName: 'brandForm',
      fieldName: 'brand',
      placeholder: 'CARS.CAR.FIELD.BRAND',
      translationKey: 'CARS.CAR.FIELD.BRAND',
    },
    model: {
      controlId: 'modelId' + id,
      formName: 'modelForm',
      fieldName: 'model',
      placeholder: 'CARS.CAR.FIELD.MODEL',
      translationKey: 'CARS.CAR.FIELD.MODEL',
    },
    year: {
      controlId: 'yearId' + id,
      formName: 'yearForm',
      fieldName: 'year',
      placeholder: 'CARS.CAR.FIELD.YEAR',
      translationKey: 'CARS.CAR.FIELD.YEAR',
    },
    volume: {
      controlId: 'volumeId' + id,
      formName: 'volumeForm',
      fieldName: 'volume',
      placeholder: 'CARS.CAR.FIELD.VOLUME',
      translationKey: 'CARS.CAR.FIELD.VOLUME',
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
