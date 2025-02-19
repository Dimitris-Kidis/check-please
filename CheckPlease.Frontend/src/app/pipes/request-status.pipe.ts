import { Pipe, PipeTransform } from '@angular/core';
import { RequestStatusEnum } from '../enums/request-status.enum';

@Pipe({
  name: 'requestStatus',
  standalone: true,
})
export class RequestStatusPipe implements PipeTransform {
  public transform(value: RequestStatusEnum): string {
    return RequestStatusEnum[value];
  }
}
