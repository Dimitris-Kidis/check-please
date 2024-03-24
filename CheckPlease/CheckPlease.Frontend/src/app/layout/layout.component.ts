import { Component, ViewEncapsulation } from '@angular/core';
import { NgOnDestroy } from '../common/services/ng-on-destroy.service';
import { PageTitleService } from '../common/services/page-title.service';

@Component({
  selector: 'check-please-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgOnDestroy],
})
export class LayoutComponent {
  public constructor(public readonly pageTitleService: PageTitleService) {}
}
