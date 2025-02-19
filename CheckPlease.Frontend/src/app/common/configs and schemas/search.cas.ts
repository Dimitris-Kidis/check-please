import * as _ from 'lodash-es';
import { IFieldConfig, buildFieldConfig } from '../../common/controls/field-config';
import { ITextEditControlSchema } from '../../common/controls/text-edit-control/text-edit-control.schema';

export interface ISearchConfig {
  searchInput: Record<'searchInput', IFieldConfig>;
}

export function getSearchConfig(): ISearchConfig {
  return {
    searchInput: {
      searchInput: buildFieldConfig(),
    },
  };
}

export interface ISearchSchema {
  formGroupName: string;
  searchInput: ITextEditControlSchema;
}

export function getSearchSchema(placeholderTranslationKey: string | undefined = undefined): ISearchSchema {
  const id = _.uniqueId('searchInputGroup');

  return {
    formGroupName: id,
    searchInput: {
      controlId: 'searchInputId' + id,
      formName: 'searchInputForm',
      fieldName: 'searchInput',
      autofocus: true,
      placeholder: placeholderTranslationKey,
    },
  };
}
