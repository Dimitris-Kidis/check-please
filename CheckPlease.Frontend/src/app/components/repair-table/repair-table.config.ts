import { IFieldConfig, buildFieldConfig } from '../../common/controls/field-config';

export interface IRepairTableEditConfig {
  detailName: Record<'detailName', IFieldConfig>;
  pricePerOne: Record<'pricePerOne', IFieldConfig>;
  quantity: Record<'quantity', IFieldConfig>;
  detailsPrice: Record<'detailsPrice', IFieldConfig>;
  repairPrice: Record<'repairPrice', IFieldConfig>;
  totalPrice: Record<'totalPrice', IFieldConfig>;
}

export function getRepairTableEditConfig(): IRepairTableEditConfig {
  return {
    detailName: {
      detailName: buildFieldConfig().isRequired(),
    },
    pricePerOne: {
      pricePerOne: buildFieldConfig().isRequired(),
    },
    quantity: {
      quantity: buildFieldConfig(),
    },
    detailsPrice: {
      detailsPrice: buildFieldConfig(),
    },
    repairPrice: {
      repairPrice: buildFieldConfig(),
    },
    totalPrice: {
      totalPrice: buildFieldConfig(),
    },
  };
}
