import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { CheckPleaseDateProvider } from '../../adapters/custom.date.adapter';
import { CONTROL_CONTAINER_PROVIDER } from '../control-container-provider';
import { Translation } from '../translation';
import { IDateEditControlSchema } from './date-edit-control.schema';

const DATE_ADAPTER_PROVIDER = {
  provide: DateAdapter,
  useClass: CheckPleaseDateProvider,
  deps: [MAT_DATE_LOCALE],
};

const MAT_DATE_FORMATS_PROVIDER = {
  provide: MAT_DATE_FORMATS,
  useValue: {
    parse: {
      dateInput: 'DD/MM/YYYY',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  },
};

@Component({
  selector: 'check-please-date-edit-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './date-edit-control.component.html',
  viewProviders: [CONTROL_CONTAINER_PROVIDER],
  providers: [DATE_ADAPTER_PROVIDER, MAT_DATE_FORMATS_PROVIDER],
})
export class DateEditControlComponent<T extends Date | undefined | null> implements OnChanges {
  @Input({ required: true }) public schema: IDateEditControlSchema;
  @Input({ required: true }) public config?: any;
  @Input() public placeholder: string;

  @Input({ required: true }) public value: T;
  @Output() public valueChange = new EventEmitter<T>();

  @Input() public greaterThan?: Date | null;
  @Input() public lowerThan?: Date | null;

  @Input() public overrideErrors?: Partial<DateEditControlErrors>;

  public errorMessages: DateEditControlErrors = {
    required: { key: 'FORM.FIELD_IS_REQUIRED' },
    matDatepickerMin: { key: 'FORM.DATE_CANNOT_BE_IN_PAST' },
    matDatepickerMax: { key: 'FORM.DATE_CANNOT_BE_IN_FUTURE' },
  };

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['overrideErrors']) {
      this.errorMessages = { ...this.errorMessages, ...this.overrideErrors };
    }
  }
}

export type DateEditControlErrors = {
  required: Translation;
  matDatepickerMin: Translation;
  matDatepickerMax: Translation;
};
