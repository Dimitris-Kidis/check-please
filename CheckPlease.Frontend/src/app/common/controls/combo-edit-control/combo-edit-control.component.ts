import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';
import { CONTROL_CONTAINER_PROVIDER } from '../control-container-provider';
import { IComboEditControlSchema } from './combo-edit-control.schema';

@Component({
  selector: 'check-please-combo-edit-control',
  templateUrl: './combo-edit-control.component.html',
  styleUrls: ['./combo-edit-control.component.scss'],
  standalone: true,
  imports: [SharedModule, FormsModule, MatFormFieldModule, MatSelectModule],
  viewProviders: [CONTROL_CONTAINER_PROVIDER],
})
export class ComboEditControlComponent {
  @Input({ required: true }) public schema: IComboEditControlSchema;
  @Input({ required: true }) public config: any;
  @Input({ required: true }) public value: any;

  @Output() public valueChange = new EventEmitter<any>();

  public readonly EMPTY_VALUE: string = '';

  public onModelChanged(value: any): void {
    this.value = value === this.EMPTY_VALUE ? null : value;
    this.valueChange.emit(this.value);
  }
}
