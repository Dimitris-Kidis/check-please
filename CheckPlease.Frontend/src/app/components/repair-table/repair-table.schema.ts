import * as _ from 'lodash-es';
import { INumberEditControlSchema } from '../../common/controls/number-edit-control/number-edit-control.schema';
import { ITextEditControlSchema } from '../../common/controls/text-edit-control/text-edit-control.schema';

export interface IRepairTableEditSchema {
  formGroupName: string;
  detailName: ITextEditControlSchema;
  pricePerOne: INumberEditControlSchema;
  quantity: INumberEditControlSchema;
  detailsPrice: INumberEditControlSchema;
  repairPrice: INumberEditControlSchema;
  totalPrice: INumberEditControlSchema;
}

export function getRepairTableEditSchema(): IRepairTableEditSchema {
  const id = _.uniqueId('repairEditGroup');

  return {
    formGroupName: id,
    detailName: {
      controlId: 'detailNameId' + id,
      formName: 'detailNameForm',
      fieldName: 'detailName',
      placeholder: 'Название',
    },
    pricePerOne: {
      controlId: 'pricePerOneId' + id,
      formName: 'pricePerOneForm',
      fieldName: 'pricePerOne',
      placeholder: 'Цена за шт.',
    },
    quantity: {
      controlId: 'quantityId' + id,
      formName: 'quantityForm',
      fieldName: 'quantity',
      placeholder: 'Кол-во',
    },
    detailsPrice: {
      controlId: 'detailsPriceId' + id,
      formName: 'detailsPriceForm',
      fieldName: 'detailsPrice',
      placeholder: 'Цена за запчасть/услугу',
    },
    repairPrice: {
      controlId: 'repairPriceId' + id,
      formName: 'repairPriceForm',
      fieldName: 'repairPrice',
      placeholder: 'Цена за работу',
    },
    totalPrice: {
      controlId: 'totalPriceId' + id,
      formName: 'totalPriceForm',
      fieldName: 'totalPrice',
      placeholder: 'Общая цена',
    },
  };
}
