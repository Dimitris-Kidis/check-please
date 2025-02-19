import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UppercaseDirective } from '../../../directives/uppercase/uppercase.directive';
import { SharedModule } from '../../../shared/shared.module';
import { CONTROL_CONTAINER_PROVIDER } from '../control-container-provider';
import { ITextEditControlSchema } from './text-edit-control.schema';

@Component({
  selector: 'check-please-text-edit-control',
  standalone: true,
  imports: [SharedModule, FormsModule, MatFormFieldModule, MatInputModule, UppercaseDirective],
  templateUrl: './text-edit-control.component.html',
  viewProviders: [CONTROL_CONTAINER_PROVIDER],
})
export class TextEditControlComponent<T extends string | null | undefined> implements AfterViewInit {
  @Input() public schema: ITextEditControlSchema;
  @Input() public config: any;

  @Input() public value: T;
  @Output() public valueChange = new EventEmitter<T>();

  public constructor(private readonly cdr: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    if (this.schema.autofocus) {
      const inputElement: HTMLElement | null = document.getElementById(this.schema.controlId!);
      if (inputElement) inputElement.focus();
    }

    this.cdr.detectChanges();
  }
}
