import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../../shared/shared.module';
import { CONTROL_CONTAINER_PROVIDER } from '../control-container-provider';
import { IFieldConfig } from '../field-config';
import { IEmailEditControlSchema } from './email-edit-control.schema';
import { EmailValidatorDirective } from './email-validator.directive';

@Component({
  selector: 'check-please-email-edit-control',
  templateUrl: './email-edit-control.component.html',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    EmailValidatorDirective,
  ],
  viewProviders: [CONTROL_CONTAINER_PROVIDER],
})
export class EmailEditControlComponent<T extends string | null | undefined> {
  @Input() public emailAddress: T;
  @Output() public emailAddressChange = new EventEmitter<T>();
  @Output() public emailAddressBlur = new EventEmitter<T>();
  @Output() public validEmailAddressChange = new EventEmitter<T>();

  @Input() public config?: Record<string, IFieldConfig>;
  @Input() public schema: IEmailEditControlSchema;
  @Input() public isPrimary: boolean;
  @Input() public isBusy: boolean;
  @Input() public updateModelOn: 'change' | 'blur' | 'submit';

  public onChange(isValid: boolean | null): void {
    this.emailAddressChange.emit(this.emailAddress);

    if (isValid) {
      this.validEmailAddressChange.emit(this.emailAddress);
    }
  }

  public onBlur(): void {
    this.emailAddressBlur.emit(this.emailAddress);
  }
}
