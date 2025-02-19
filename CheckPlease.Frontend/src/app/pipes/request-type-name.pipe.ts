import { Pipe, PipeTransform } from '@angular/core';
import { RequestTypeEnum } from '../enums/requests.enum';

@Pipe({
  name: 'requestTypeName',
  standalone: true,
})
export class RequestTypeNamePipe implements PipeTransform {
  public transform(value: RequestTypeEnum): string {
    return RequestTypeEnum[value];
  }
}
