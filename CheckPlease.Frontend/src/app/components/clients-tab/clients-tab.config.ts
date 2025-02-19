import { buildFieldConfig, IFieldConfig } from '../../common/controls/field-config';

export interface ISearchInputConfig {
  searchInput: Record<'searchInput', IFieldConfig>;
}

export function getSearchInputConfig(): ISearchInputConfig {
  return {
    searchInput: {
      searchInput: buildFieldConfig(),
    },
  };
}
