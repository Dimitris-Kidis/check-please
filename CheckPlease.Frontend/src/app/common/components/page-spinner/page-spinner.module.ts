import { NgModule } from '@angular/core';

import { SpinnerModule } from '../../../directives/spinner/spinner.module';
import { SharedModule } from '../../../shared/shared.module';
import { BusyModule } from '../busy/busy.module';
import { PageSpinnerComponent } from './page-spinner.component';

@NgModule({
  declarations: [PageSpinnerComponent],
  imports: [SharedModule, BusyModule, SpinnerModule],
})
export class PageSpinnerModule {}
