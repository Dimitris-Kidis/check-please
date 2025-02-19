import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[checkPleaseUppercase]',
  standalone: true,
})
export class UppercaseDirective {
  @Input() public isEnabled: boolean;

  @HostListener('input', ['$event']) public onInput(event: KeyboardEvent): void {
    if (!this.isEnabled) {
      return;
    }

    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }
}
