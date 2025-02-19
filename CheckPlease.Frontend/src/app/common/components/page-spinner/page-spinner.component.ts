import { Component, Inject } from '@angular/core';
import { PAGE_SPINNER_DATA, PageSpinnerData } from './page-spinner-data';

@Component({
  selector: 'check-please-page-spinner',
  templateUrl: './page-spinner.component.html',
  standalone: false,
})
export class PageSpinnerComponent {
  public constructor(@Inject(PAGE_SPINNER_DATA) public readonly busyData?: PageSpinnerData) {}
}
