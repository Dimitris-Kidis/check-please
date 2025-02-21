import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface IRepairEditConfig {
  mileage: Record<'mileage', IFieldConfig>;
  repairDate: Record<'repairDate', IFieldConfig>;
  additionalNotes: Record<'additionalNotes', IFieldConfig>;
  isSentToBot: Record<'isSentToBot', IFieldConfig>;
}

export function getRepairEditConfig(): IRepairEditConfig {
  return {
    mileage: {
      mileage: buildFieldConfig().isRequired(),
    },
    repairDate: {
      repairDate: buildFieldConfig().isRequired(),
    },
    additionalNotes: {
      additionalNotes: buildFieldConfig(),
    },
    isSentToBot: {
      isSentToBot: buildFieldConfig(),
    },
  };
}
