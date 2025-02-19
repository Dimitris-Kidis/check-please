import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { CONTROL_CONTAINER_PROVIDER } from '../control-container-provider';
import { Translation } from '../translation';
import { ITimeEditControlSchema } from './time-edit-control.schema';

@Component({
  selector: 'check-please-time-edit-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
  ],
  templateUrl: './time-edit-control.component.html',
  viewProviders: [CONTROL_CONTAINER_PROVIDER],
})
export class TimeEditControlComponent<T extends string | undefined | null> implements OnChanges {
  @Input({ required: true }) public schema: ITimeEditControlSchema;
  @Input({ required: true }) public config?: any;
  @Input() public placeholder: string;

  @Input({ required: true }) public value: T;
  @Output() public valueChange = new EventEmitter<T>();

  @Input() public overrideErrors?: Partial<TimeEditControlErrors>;

  public errorMessages: TimeEditControlErrors = {
    required: { key: 'FORM.FIELD_IS_REQUIRED' },
  };

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['overrideErrors']) {
      this.errorMessages = { ...this.errorMessages, ...this.overrideErrors };
    }
  }
}

export type TimeEditControlErrors = {
  required: Translation;
};
