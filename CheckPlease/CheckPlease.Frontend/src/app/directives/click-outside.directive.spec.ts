import { ElementRef } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const elementRef: ElementRef = new ElementRef<string>('test');

    const directive = new ClickOutsideDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
