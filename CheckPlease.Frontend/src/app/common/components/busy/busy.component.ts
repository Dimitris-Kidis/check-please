import { Component, Input } from '@angular/core';
import * as _ from 'lodash-es';

@Component({
  selector: 'check-please-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss'],
  standalone: false,
})
export class BusyComponent {
  @Input() public isBusy: boolean;
  @Input() public extraInfo: string;
  @Input() public label: string;

  public get busyBackground(): boolean {
    return !_.isEmpty(this.label);
  }
}
