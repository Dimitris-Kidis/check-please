import { Component, Input } from '@angular/core';
import { SizeOptions } from 'src/app/enums/size-options';
import { DestroyBaseComponent } from '../destroy-base/destroy-base.component';

export type LoadingSize = 'tiny' | 'small' | 'medium' | 'large';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent extends DestroyBaseComponent {
  public size: string = SizeOptions.medium;

  public constructor() {
    super();
  }

  @Input() public set loaderSize(value: LoadingSize) {
    this.size = SizeOptions[value];
  }
}
