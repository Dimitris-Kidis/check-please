import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConvert',
  standalone: true,
})
export class DateConvertPipe implements PipeTransform {
  public transform(value: string): string {
    const date: Date = new Date(value);
    const day: string = ('0' + date.getDate()).slice(-2);
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    const year: number = date.getFullYear();
    const hours: string = ('0' + date.getHours()).slice(-2);
    const minutes: string = ('0' + date.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
