import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CarDto } from '../../../models/car';
import { PaginatorResult, SearchPaginatedRequest } from '../../../models/pagination';
import { CarsService } from '../../../services/cars.service';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerSizeDirective } from '../../directives/spinner/spinner-size.directive';
import { SpinnerModule } from '../../directives/spinner/spinner.module';
import { ISearchInputConfig, getSearchInputConfig } from '../clients-tab/clients-tab.config';
import { ISearchInputSchema, getSearchInputSchema } from '../clients-tab/clients-tab.schema';
import { CarCardComponent } from './car-card/car-card.component';

@Component({
  selector: 'check-please-cars-tab',
  imports: [
    FormsModule,
    TranslateModule,
    TextEditControlComponent,
    CommonModule,
    CarCardComponent,
    SpinnerSizeDirective,
    SpinnerModule,
    MatIconModule,
    InfiniteScrollDirective,
  ],
  templateUrl: './cars-tab.component.html',
  styleUrl: './cars-tab.component.scss',
})
export class CarsTabComponent implements OnInit {
  @Input() public isDialog: boolean = false;

  public isBusy: boolean = false;
  public cars: CarDto[] = [];
  public hasMore: boolean = false;
  public total: number = 0;
  public isLoadMore: boolean = false;

  public config: ISearchInputConfig = getSearchInputConfig();
  public schema: ISearchInputSchema = getSearchInputSchema('CARS.SEARCH.PLACEHOLDER');

  public paginationQuery: SearchPaginatedRequest = { paginatedRequest: { pageIndex: 1, pageSize: 10 } };

  public constructor(
    private readonly carsService: CarsService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    @Optional() public dialogRef: MatDialogRef<CarsTabComponent>,
  ) {}

  public ngOnInit(): void {
    this.search();
  }

  public search(isLoadMore: boolean = false): void {
    this.isLoadMore = isLoadMore;

    if (!isLoadMore) {
      this.paginationQuery.paginatedRequest.pageIndex = 1;
      this.isBusy = true;
    }

    this.carsService
      .getCarsPaginated(this.paginationQuery)
      .subscribe({
        next: (data: PaginatorResult<CarDto>) => {
          if (isLoadMore) {
            this.cars.push(...data.items);
          } else {
            this.cars = data.items;
          }

          this.cdr.detectChanges();

          this.total = data.total;
          this.hasMore = data.hasMore;
        },
        error: (err: HttpErrorResponse) => {
          this.displayErrorHelper.displayErrorFunc(err);
        },
      })
      .add(() => (this.isBusy = false));
  }

  public trackByCarId(index: number, car: CarDto): string {
    return car.id!;
  }

  public selectCar(car: CarDto): void {
    this.dialogRef.close({
      carId: car.id,
      carView: car,
    });
  }

  public deleteCar(carId: string): void {
    this.carsService.deleteCar(carId).subscribe({
      next: () => {
        this.cars = this.cars.filter((car) => car.id !== carId);
        this.total--;
        this.search();
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.displayErrorHelper.displayErrorFunc(err);
      },
    });
  }

  public reset(): void {
    this.paginationQuery.searchInput = '';
    this.search();
  }

  public add(): void {
    this.router.navigate(['cars', 'new']);
  }

  public editCar(id: string): void {
    this.router.navigate(['cars', id]);
  }

  public loadMore(): void {
    if (this.hasMore) {
      this.paginationQuery.paginatedRequest.pageIndex++;
      this.search(true);
    }
  }
}
