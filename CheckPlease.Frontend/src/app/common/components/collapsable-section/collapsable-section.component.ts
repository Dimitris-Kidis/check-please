import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'check-please-collapsable-section',
  templateUrl: './collapsable-section.component.html',
  styleUrls: ['./collapsable-section.component.scss'],
  standalone: true,
  imports: [SharedModule, MatExpansionModule, MatIconModule],
})
export class CollapsableSectionComponent {
  @Input() public expanded: boolean;
  @Input() public title: string = '';
}
