import * as _ from 'lodash-es';
import { ITextEditControlSchema } from 'src/app/common/controls/text-edit-control/text-edit-control.schema';

export interface IClientOptionSchema {
  formGroupName: string;
  clientName: ITextEditControlSchema;
}

export function getClientOptionSchema(): IClientOptionSchema {
  const id = _.uniqueId('clientName');

  return {
    formGroupName: id,
    clientName: {
      controlId: 'clientName' + id,
      formName: 'clientNameForm',
      fieldName: 'clientName',
    },
  };
}
