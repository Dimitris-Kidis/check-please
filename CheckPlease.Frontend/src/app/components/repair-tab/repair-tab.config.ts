import { IFieldConfig, buildFieldConfig } from '../../common/controls/field-config';

export interface IRepairCreateConfig {
  mileage: Record<'mileage', IFieldConfig>;
  repairDate: Record<'repairDate', IFieldConfig>;
  additionalNotes: Record<'additionalNotes', IFieldConfig>;
}

export interface IRepairCreateClientConfig {
  fullName: Record<'fullName', IFieldConfig>;
  phoneNumber: Record<'phoneNumber', IFieldConfig>;
}

export interface IRepairCreateCarConfig {
  carSign: Record<'carSign', IFieldConfig>;
  oldMileage: Record<'oldMileage', IFieldConfig>;
  newMileage: Record<'newMileage', IFieldConfig>;
}

export function getRepairCreateConfig(): IRepairCreateConfig {
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
  };
}

export function getRepairCreateClientConfig(): IRepairCreateClientConfig {
  return {
    fullName: {
      fullName: buildFieldConfig().isRequired(),
    },
    phoneNumber: {
      phoneNumber: buildFieldConfig().isRequired(),
    },
  };
}

export function getRepairCreateCarConfig(): IRepairCreateCarConfig {
  return {
    carSign: {
      carSign: buildFieldConfig().isRequired(),
    },
    oldMileage: {
      oldMileage: buildFieldConfig().isRequired(),
    },
    newMileage: {
      newMileage: buildFieldConfig().isRequired(),
    },
  };
}
