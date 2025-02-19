import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue',
  standalone: true,
})
export class DefaultValuePipe implements PipeTransform {
  public transform(value: any, showZero?: boolean): string {
    if (showZero && value === 0) {
      return value;
    }

    return value || '—';
  }
}
