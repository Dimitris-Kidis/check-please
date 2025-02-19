import { ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../../../shared/shared.module';
import { CONTROL_CONTAINER_PROVIDER } from '../../control-container-provider';
import { ICheckboxEditControlSchema } from './checkbox-edit-control.schema';

@Component({
  selector: 'check-please-checkbox-edit-control',
  templateUrl: './checkbox-edit-control.component.html',
  standalone: true,
  imports: [SharedModule, FormsModule, MatCheckboxModule, MatFormFieldModule],
  viewProviders: [CONTROL_CONTAINER_PROVIDER],
})
export class CheckboxEditControlComponent<T extends boolean | null | undefined> implements OnInit {
  @Input() public schema: ICheckboxEditControlSchema;
  @Input() public config: any;

  @Input() public value: T;
  @Output() public valueChange = new EventEmitter<T>();

  public constructor(
    public readonly errorStateMatcher: ErrorStateMatcher,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    @Optional() public readonly parentForm: NgForm,
  ) {}

  public ngOnInit(): void {
    if (this.parentForm) {
      this.parentForm.ngSubmit.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });
    }
  }
}
