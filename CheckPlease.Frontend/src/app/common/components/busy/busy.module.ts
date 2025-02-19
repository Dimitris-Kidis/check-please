import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BusyComponent } from './busy.component';

@NgModule({
  declarations: [BusyComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [BusyComponent],
})
export class BusyModule {}
