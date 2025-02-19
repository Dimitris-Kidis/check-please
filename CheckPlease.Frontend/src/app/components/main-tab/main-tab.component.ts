import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MainPageDto } from '../../../models/main-page';
import { CommonService } from '../../../services/common.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';

@Component({
  selector: 'check-please-main-tab',
  imports: [CommonModule],
  templateUrl: './main-tab.component.html',
  styleUrl: './main-tab.component.scss',
})
export class MainTabComponent {
  public isBusy: boolean = false;
  public mainPageInfo: MainPageDto;

  public stats = [
    { icon: '🛠️', count: 2, label: 'Ремонты' },
    { icon: '🚘', count: 1, label: 'Машины' },
    { icon: '👥', count: 1, label: 'Клиенты' },
    { icon: '📅', count: 0, label: 'Ремонты в этом году' },
  ];

  public constructor(
    private readonly commonService: CommonService,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly displayErrorHelper: DisplayErrorHelper,
  ) {}

  public ngOnInit(): void {
    this.getMainPageInfo();
  }

  public getMainPageInfo(): void {
    this.setIsBusy(true);

    this.commonService
      .getMainPageInfo()
      .subscribe({
        next: (data: MainPageDto) => {
          this.mainPageInfo = data;
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => this.setIsBusy(false));
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
