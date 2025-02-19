import { IFieldConfig, buildFieldConfig } from '../../../common/controls/field-config';

export interface IClientEditConfig {
  fullName: Record<'fullName', IFieldConfig>;
  phoneNumber: Record<'phoneNumber', IFieldConfig>;
  additionalNotes: Record<'additionalNotes', IFieldConfig>;
}

export function getClientEditConfig(): IClientEditConfig {
  return {
    fullName: {
      fullName: buildFieldConfig().isRequired(),
    },
    phoneNumber: {
      phoneNumber: buildFieldConfig().isRequired(),
    },
    additionalNotes: {
      additionalNotes: buildFieldConfig(),
    },
  };
}
