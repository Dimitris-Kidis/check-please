import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';
import { ITextAreaEditControlSchema } from './text-area-edit-control.schema';

@Component({
  selector: 'check-please-text-area-edit-control',
  standalone: true,
  imports: [FormsModule, SharedModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './text-area-edit-control.component.html',
})
export class TextAreaEditControlComponent<T extends string | null | undefined> implements AfterViewInit {
  @Input() public schema: ITextAreaEditControlSchema;
  @Input() public config: any;

  @Input() public value: T;
  @Output() public valueChange = new EventEmitter<T>();

  public maxWarningLength: number = 400;

  public constructor(private readonly cdr: ChangeDetectorRef) {}

  public get hasWarning(): boolean {
    return !!(
      this.schema.isWarningCounterEnabled &&
      this.value &&
      this.value.length > (this.schema.maxLength ?? this.maxWarningLength) &&
      (!this.schema.maxLength || this.value.length <= this.schema.maxLength)
    );
  }

  public get textAreaRows(): number | undefined {
    return (this.schema.maxLength || (this.schema.maxLength ?? this.maxWarningLength)) >=
      (this.schema.maxLength ?? this.maxWarningLength) && !this.schema.rows
      ? 6
      : this.schema.rows;
  }

  public ngAfterViewInit(): void {
    if (this.schema.autofocus) {
      const inputElement: HTMLElement | null = document.getElementById(this.schema.controlId!);
      if (inputElement) inputElement.focus();
    }

    this.cdr.detectChanges();
  }
}
