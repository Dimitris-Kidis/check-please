import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface ICarEditConfig {
  carSign: Record<'carSign', IFieldConfig>;
  mileage: Record<'mileage', IFieldConfig>;
  vinCode: Record<'vinCode', IFieldConfig>;
  brand: Record<'brand', IFieldConfig>;
  model: Record<'model', IFieldConfig>;
  year: Record<'year', IFieldConfig>;
  volume: Record<'volume', IFieldConfig>;
  additionalNotes: Record<'additionalNotes', IFieldConfig>;
}

export function getCarEditConfig(): ICarEditConfig {
  return {
    carSign: {
      carSign: buildFieldConfig().isRequired(),
    },
    mileage: {
      mileage: buildFieldConfig().isRequired(),
    },
    vinCode: {
      vinCode: buildFieldConfig(),
    },
    brand: {
      brand: buildFieldConfig(),
    },
    model: {
      model: buildFieldConfig(),
    },
    year: {
      year: buildFieldConfig(),
    },
    volume: {
      volume: buildFieldConfig(),
    },
    additionalNotes: {
      additionalNotes: buildFieldConfig(),
    },
  };
}
