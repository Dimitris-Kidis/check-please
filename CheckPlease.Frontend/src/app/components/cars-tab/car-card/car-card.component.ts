import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environment/environment';
import { CarDto } from '../../../../models/car';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';

@Component({
  selector: 'check-please-car-card',
  imports: [MatIconModule, DefaultValuePipe, CommonModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent {
  @Input({ required: true }) public car: CarDto;
  @Output() public onCarDeleting = new EventEmitter<string>();
  @Output() public onCarEditing = new EventEmitter<string>();

  public datetimeDefaultFormat: string = environment.datetimeDefaultFormat;

  public deleteCar(id: string): void {
    this.onCarDeleting.emit(id);
  }

  public editCar(id: string): void {
    this.onCarEditing.emit(id);
  }
}
