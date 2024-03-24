import { Component, Inject } from '@angular/core';
import { PageSpinnerData, PAGE_SPINNER_DATA } from './page-spinner-data';

@Component({
  selector: 'check-please-page-spinner',
  templateUrl: './page-spinner.component.html',
})
export class PageSpinnerComponent {
  public constructor(@Inject(PAGE_SPINNER_DATA) public readonly busyData?: PageSpinnerData) {}
}
