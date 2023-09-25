import { Component, Input } from '@angular/core';
import { DestroyBaseComponent } from '../destroy-base/destroy-base.component';
import { SizeOptions } from 'src/app/enums/size-options';

export type LoadingSize = 'tiny' | 'small' | 'medium' | 'large';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent extends DestroyBaseComponent {
  @Input() set loaderSize(value: LoadingSize) {
    this.size = SizeOptions[value];
  }

  size: string = SizeOptions.medium;

  constructor() {
    super();
  }
}
