import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environment/environment';
import { RepairDto } from '../../../../models/repair';
import { CollapsableSectionComponent } from '../../../common/components/collapsable-section/collapsable-section.component';
import { DayOfWeekPipe } from '../../../pipes/day-of-week.pipe';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';

@Component({
  selector: 'check-please-repair-card',
  imports: [MatIconModule, DefaultValuePipe, CommonModule, CollapsableSectionComponent, DayOfWeekPipe],
  templateUrl: './repair-card.component.html',
  styleUrl: './repair-card.component.scss',
})
export class RepairCardComponent {
  @Input({ required: true }) public repair: RepairDto;
  @Output() public onRepairDeleting = new EventEmitter<string>();
  @Output() public onRepairEditing = new EventEmitter<string>();

  public dateDefaultFormat: string = environment.dateDefaultFormat;
  public datetimeDefaultFormat: string = environment.datetimeDefaultFormat;

  public deleteRepair(id: string): void {
    this.onRepairDeleting.emit(id);
  }

  public editRepair(id: string): void {
    this.onRepairEditing.emit(id);
  }
}
