import * as _ from 'lodash-es';
import { ITextEditControlSchema } from '../../common/controls/text-edit-control/text-edit-control.schema';

export interface ISearchInputSchema {
  formGroupName: string;
  searchInput: ITextEditControlSchema;
}

export function getSearchInputSchema(placeholder: string = 'COMMON.SEARCH.PLACEHOLDER'): ISearchInputSchema {
  const id = _.uniqueId('searchInputGroup');

  return {
    formGroupName: id,
    searchInput: {
      controlId: 'searchInputId' + id,
      formName: 'searchInputForm',
      fieldName: 'searchInput',
      placeholder: placeholder,
      autofocus: true,
    },
  };
}
