import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mileage',
})
export class MileagePipe implements PipeTransform {
  public transform(mileage: number | string): string {
    if (typeof mileage === 'string') return mileage + ' km';
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' km';
  }
}
