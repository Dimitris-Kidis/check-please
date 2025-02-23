import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PaginatorResult, SearchPaginatedRequest } from '../../../models/pagination';
import { RepairDto } from '../../../models/repair';
import { RepairsService } from '../../../services/repairs.service';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerSizeDirective } from '../../directives/spinner/spinner-size.directive';
import { SpinnerModule } from '../../directives/spinner/spinner.module';
import { ISearchInputConfig, getSearchInputConfig } from '../clients-tab/clients-tab.config';
import { ISearchInputSchema, getSearchInputSchema } from '../clients-tab/clients-tab.schema';
import { RepairCardComponent } from './repair-card/repair-card.component';

@Component({
  imports: [
    FormsModule,
    TranslateModule,
    TextEditControlComponent,
    CommonModule,
    RepairCardComponent,
    SpinnerSizeDirective,
    SpinnerModule,
    MatIconModule,
    InfiniteScrollDirective,
  ],
  templateUrl: './repairs-tab.component.html',
  styleUrl: './repairs-tab.component.scss',
})
export class RepairsTabComponent implements OnInit {
  public isBusy: boolean = false;
  public repairs: RepairDto[] = [];
  public hasMore: boolean = false;
  public total: number = 0;
  public isLoadMore: boolean = false;

  public config: ISearchInputConfig = getSearchInputConfig();
  public schema: ISearchInputSchema = getSearchInputSchema('Введите данные о клиенте или машины для поиска...');

  public paginationQuery: SearchPaginatedRequest = { paginatedRequest: { pageIndex: 1, pageSize: 10 } };

  public constructor(
    private readonly repairsService: RepairsService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
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

    this.repairsService
      .getRepairsPaginated(this.paginationQuery)
      .subscribe({
        next: (data: PaginatorResult<RepairDto>) => {
          if (isLoadMore) {
            this.repairs.push(...data.items);
          } else {
            this.repairs = data.items;
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

  public trackByRepairId(index: number, repair: RepairDto): string {
    return repair.id!;
  }

  public deleteRepair(repairId: string): void {
    this.repairsService.deleteRepair(repairId).subscribe({
      next: () => {
        this.repairs = this.repairs.filter((repair) => repair.id !== repairId);
        this.total--;
        this.search();
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.displayErrorHelper.displayErrorFunc(err);
      },
    });
  }

  public add(): void {
    this.router.navigate(['new']);
  }

  public reset(): void {
    this.paginationQuery.searchInput = '';
    this.search();
  }

  public editRepair(id: string): void {
    this.router.navigate(['repairs', id]);
  }

  public loadMore(): void {
    if (this.hasMore) {
      this.paginationQuery.paginatedRequest.pageIndex++;
      this.search(true);
    }
  }
}
