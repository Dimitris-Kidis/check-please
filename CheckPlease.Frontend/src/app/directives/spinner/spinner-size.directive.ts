import { Directive, Input, OnChanges } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: 'mat-spinner[checkPleaseSpinnerSize]',
  standalone: true,
})
export class SpinnerSizeDirective implements OnChanges {
  private static sizes: Record<SpinnerSize, { diameter: number; strokeWidth: number }> = {
    extrasmall: { diameter: 12, strokeWidth: 1 },
    small: { diameter: 22, strokeWidth: 2 },
    medium: { diameter: 48, strokeWidth: 3 },
    large: { diameter: 72, strokeWidth: 5 },
  };

  @Input() public checkPleaseSpinnerSize: SpinnerSize;

  public constructor(private readonly spinner: MatProgressSpinner) {}

  public ngOnChanges(): void {
    const { diameter, strokeWidth } = SpinnerSizeDirective.sizes[this.checkPleaseSpinnerSize];

    this.spinner.diameter = diameter;
    this.spinner.strokeWidth = strokeWidth;
  }
}

type SpinnerSize = 'extrasmall' | 'small' | 'medium' | 'large';
