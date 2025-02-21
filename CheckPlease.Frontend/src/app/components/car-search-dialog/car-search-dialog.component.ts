import { Component } from '@angular/core';
import { CarsTabComponent } from '../cars-tab/cars-tab.component';

@Component({
  selector: 'check-please-car-search-dialog',
  imports: [CarsTabComponent],
  templateUrl: './car-search-dialog.component.html',
  styleUrl: './car-search-dialog.component.scss',
})
export class CarSearchDialogComponent {}
