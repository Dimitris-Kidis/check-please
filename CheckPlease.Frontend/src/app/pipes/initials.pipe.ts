import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  public transform(value: string | null | undefined): string {
    if (!value) {
      return '?';
    }

    const nameParts = value.trim().split(' ');
    const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join('');

    return initials.length > 2 ? initials.slice(0, 2) : initials;
  }
}
