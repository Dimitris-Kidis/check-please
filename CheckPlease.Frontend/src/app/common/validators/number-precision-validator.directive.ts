import { Directive, Input, OnChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[checkPleaseNumberPrecision]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumberPrecisionValidatorDirective,
      multi: true,
    },
  ],
})
export class NumberPrecisionValidatorDirective implements Validator, OnChanges {
  @Input('checkPleaseNumberPrecision') public numberPrecision: number;
  @Input() public overridePrecision: boolean;
  // @Input() public numberPrecisionUnitTypes: MeasurementUnit[] | null = [];

  private onChange: () => void;

  public ngOnChanges(): void {
    if (this.onChange) {
      this.onChange();
    }
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const viewValue = control.value;

    if (!viewValue) {
      return null;
    }

    const precision = this.numberPrecision;

    const floatRegEx: RegExp = precision > 0 ? new RegExp('^\\-?\\d+([\\.\\,]\\d{1,' + precision + '})?$') : /^\-?\d+$/;
    const result = floatRegEx.test(viewValue);

    if (result) {
      return null;
    } else {
      return {
        numberPrecision: true,
      };
    }
  }

  public registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
