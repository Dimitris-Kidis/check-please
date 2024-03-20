import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleTruncate',
})
export class SimpleTruncatePipe implements PipeTransform {
  public transform(value: string, limit: number): string {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = value;
    return div.innerText.length > limit ? div.innerHTML.substring(0, limit) + '...' : value;
  }
}
