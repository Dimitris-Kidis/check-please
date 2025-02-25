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
      placeholder: 'REPAIRS.REPAIR.TABLE.DETAIL_NAME',
    },
    pricePerOne: {
      controlId: 'pricePerOneId' + id,
      formName: 'pricePerOneForm',
      fieldName: 'pricePerOne',
      placeholder: 'REPAIRS.REPAIR.TABLE.PRICE_PER_ONE',
    },
    quantity: {
      controlId: 'quantityId' + id,
      formName: 'quantityForm',
      fieldName: 'quantity',
      placeholder: 'REPAIRS.REPAIR.TABLE.QUANTITY',
    },
    detailsPrice: {
      controlId: 'detailsPriceId' + id,
      formName: 'detailsPriceForm',
      fieldName: 'detailsPrice',
      placeholder: 'REPAIRS.REPAIR.TABLE.DETAIL_NAME',
    },
    repairPrice: {
      controlId: 'repairPriceId' + id,
      formName: 'repairPriceForm',
      fieldName: 'repairPrice',
      placeholder: 'REPAIRS.REPAIR.TABLE.REPAIR_PRICE',
    },
    totalPrice: {
      controlId: 'totalPriceId' + id,
      formName: 'totalPriceForm',
      fieldName: 'totalPrice',
      placeholder: 'REPAIRS.REPAIR.TABLE.TOTAL_PRICE',
    },
  };
}
