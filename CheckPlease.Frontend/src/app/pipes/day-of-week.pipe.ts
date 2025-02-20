import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek',
  standalone: true,
})
export class DayOfWeekPipe implements PipeTransform {
  private dayMap: Record<string, string> = {
    sunday: 'воскресенье',
    monday: 'понедельник',
    tuesday: 'вторник',
    wednesday: 'среда',
    thursday: 'четверг',
    friday: 'пятница',
    saturday: 'суббота',
  };

  public transform(value: string | null): string | null {
    if (!value) {
      return value;
    }

    return Object.keys(this.dayMap).reduce((result, engDay) => {
      const regex = new RegExp(engDay, 'gi');
      return result.replace(regex, this.dayMap[engDay]);
    }, value);
  }
}
