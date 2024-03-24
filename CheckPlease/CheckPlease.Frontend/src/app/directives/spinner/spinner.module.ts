import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerSizeDirective } from './spinner-size.directive';

@NgModule({
  imports: [SpinnerSizeDirective, MatProgressSpinnerModule],
  exports: [SpinnerSizeDirective, MatProgressSpinnerModule],
})
export class SpinnerModule {}
