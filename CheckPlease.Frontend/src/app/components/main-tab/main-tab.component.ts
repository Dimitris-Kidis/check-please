import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MainPageDto } from '../../../models/main-page';
import { CommonService } from '../../../services/common.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { BotSenderComponent } from '../bot-sender/bot-sender.component';

@Component({
  selector: 'check-please-main-tab',
  imports: [CommonModule, BotSenderComponent, TranslateModule],
  templateUrl: './main-tab.component.html',
  styleUrl: './main-tab.component.scss',
})
export class MainTabComponent {
  public isBusy: boolean = false;
  public mainPageInfo: MainPageDto;

  public stats = [
    { icon: '🛠️', count: 2, label: 'MAIN.LABEL.REPAIRS', name: 'repairsNumber' },
    { icon: '🚘', count: 1, label: 'MAIN.LABEL.CARS', name: 'carsNumber' },
    { icon: '👥', count: 1, label: 'MAIN.LABEL.CLIENTS', name: 'clientsNumber' },
    { icon: '📅', count: 0, label: 'MAIN.LABEL.THIS_YEAR_REPAIRS', name: 'thisYearRepairsNumber' },
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

          this.setStats(data);
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

  private setStats(data: MainPageDto): void {
    this.stats = this.stats.map((stat) => ({
      ...stat,
      count: data[stat.name as keyof MainPageDto] ?? 0,
    }));
  }
}
