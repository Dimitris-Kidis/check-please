import { buildFieldConfig, IFieldConfig } from 'src/app/common/controls/field-config';

export interface IClientOptionConfig {
  clientName: Record<'clientName', IFieldConfig>;
}

export function getClientOptionConfig(): IClientOptionConfig {
  return {
    clientName: {
      clientName: buildFieldConfig().isRequired().isActive(),
    },
  };
}
