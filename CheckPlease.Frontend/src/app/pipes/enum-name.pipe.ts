import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumName',
  standalone: true,
})
export class EnumNamePipe implements PipeTransform {
  public transform<T extends Record<string, string | number>>(value: T[keyof T], enumType: T): string {
    if (!enumType || value === null || value === undefined) {
      return 'Unknown';
    }

    const key = Object.keys(enumType).find((k) => enumType[k as keyof T] === value);
    return key ? key : 'Unknown';
  }
}
