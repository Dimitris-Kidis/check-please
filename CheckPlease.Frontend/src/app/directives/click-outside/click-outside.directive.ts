import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter<void>();

  public constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document: click', ['$event.target'])
  public onClick(targetElement: EventTarget): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
