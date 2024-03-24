import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomDateAdapter } from 'src/app/common/adapters/custom.date.adapter';
import { PageSpinnerService } from 'src/app/common/components/page-spinner/page-spinner.service';
import { DisplayErrorHelper } from 'src/app/common/helpers/display-error.helper';
import { SpinnerModule } from 'src/app/directives/spinner/spinner.module';
import { CarListItem, MainPageData } from 'src/models/main-page';
import { MainPageService } from 'src/services/main-page.service';

@Component({
  selector: 'check-please-main-page',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, SpinnerModule],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
    },
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public mainPageData: MainPageData;
  public cars: CarListItem[];
  public isBusy: boolean;
  public defaultDate = new Date();

  public constructor(
    private readonly mainPageService: MainPageService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly spinner: PageSpinnerService,
  ) {}

  public ngOnInit(): void {
    this.spinner.open();
    this.getDataByDate(this.defaultDate);
  }

  public filterDates(date: Date | null): boolean {
    if (!date) {
      return false;
    }

    const today = new Date();
    return date <= today;
  }

  public onDataChange(date: Date | null): void {
    if (!date) {
      return;
    }

    this.getDataByDate(date);
  }

  public getDataByDate(date: Date): void {
    const offset: number = date.getTimezoneOffset();
    const dateWithOffset: string = new Date(date.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);

    this.isBusy = true;
    this.mainPageService
      .getMainPageData(dateWithOffset)
      .subscribe({
        next: (data: MainPageData) => {
          this.mainPageData = data;
          this.cars = data.carList;
        },
        error: (e) => this.displayErrorHelper.displayErrorFunc(e),
      })
      .add(() => {
        this.isBusy = false;
        this.spinner.close();
      });
  }
}
