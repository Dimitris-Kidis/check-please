import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';
import { PopoverModule } from '../../components/popover/popover.module';
import { NumberPrecisionValidatorDirective } from '../../validators/number-precision-validator.directive';
import { CONTROL_CONTAINER_PROVIDER } from '../control-container-provider';
import { INumberEditControlSchema } from './number-edit-control.schema';

@Component({
  selector: 'check-please-number-edit-control',
  templateUrl: './number-edit-control.component.html',
  styleUrls: ['./number-edit-control.component.scss'],
  viewProviders: [CONTROL_CONTAINER_PROVIDER],
  standalone: true,
  imports: [
    SharedModule,
    PopoverModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NumberPrecisionValidatorDirective,
  ],
})
export class NumberEditControlComponent {
  @Input() public config: any;
  @Input() public schema: INumberEditControlSchema;
  @Input() public allowZero?: boolean;
  @Input() public placeholder: string;
  @Input() public isReadOnly: boolean;

  @Input() public value: number | null | undefined;
  @Output() public valueChange = new EventEmitter<number | null>();
}
