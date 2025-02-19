import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DefaultValuePipe } from '../../../../pipes/default-value.pipe';
import { SharedModule } from '../../../../shared/shared.module';
import { CheckboxType } from './checkbox-type';
import { ICheckboxViewControlSchema } from './checkbox-view-control.schema';

@Component({
  selector: 'check-please-checkbox-view-control',
  standalone: true,
  imports: [SharedModule, DefaultValuePipe, MatFormFieldModule],
  templateUrl: './checkbox-view-control.component.html',
  styleUrls: ['./checkbox-view-control.component.scss'],
})
export class CheckboxViewControlComponent {
  @Input() public value: boolean;
  @Input() public text?: string;
  @Input() public url?: string;

  @Input() public schema: ICheckboxViewControlSchema;
  @Input() public config: any;

  public readonly checkboxTypes = CheckboxType;

  public get titleValue(): string | null {
    if (this.schema.tooltipTrueTranslationKey != null && this.schema.tooltipFalseTranslationKey != null) {
      return this.value ? this.schema.tooltipTrueTranslationKey : this.schema.tooltipFalseTranslationKey;
    }

    return null;
  }
}
