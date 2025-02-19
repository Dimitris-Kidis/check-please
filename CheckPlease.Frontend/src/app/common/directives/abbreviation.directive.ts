import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbbreviationHelper } from '../helpers/abbreviation.helper';

@Directive({
  selector: 'input[checkPleaseAbbreviation]',
  standalone: true,
})
export class AbbreviationDirective {
  public constructor(private readonly element: ElementRef) {}

  @HostListener('keypress', ['$event'])
  public keypress(eventObject: any): void {
    const el = this.element.nativeElement;
    const value = el.value;

    const charCode = eventObject.charCode || eventObject.keyCode;
    if (charCode && !isNaN(value)) {
      const lowerCaseChar = String.fromCharCode(charCode).toLowerCase();

      if (AbbreviationHelper.abbreviations[lowerCaseChar]) {
        const newValue = AbbreviationHelper.convertValue(lowerCaseChar, value);
        el.value = newValue;

        eventObject.preventDefault();
        eventObject.target.dispatchEvent(new KeyboardEvent('input'));
      }
    }
  }
}
