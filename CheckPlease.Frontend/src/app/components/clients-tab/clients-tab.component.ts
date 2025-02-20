import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ClientDto } from '../../../models/client';
import { PaginatorResult, SearchPaginatedRequest } from '../../../models/pagination';
import { ClientsService } from '../../../services/clients.service';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerSizeDirective } from '../../directives/spinner/spinner-size.directive';
import { SpinnerModule } from '../../directives/spinner/spinner.module';
import { ClientCardComponent } from './client-card/client-card.component';
import { getSearchInputConfig, ISearchInputConfig } from './clients-tab.config';
import { getSearchInputSchema, ISearchInputSchema } from './clients-tab.schema';

@Component({
  imports: [
    FormsModule,
    TranslateModule,
    TextEditControlComponent,
    CommonModule,
    ClientCardComponent,
    SpinnerSizeDirective,
    SpinnerModule,
    MatIconModule,
    InfiniteScrollDirective,
  ],
  templateUrl: './clients-tab.component.html',
  styleUrl: './clients-tab.component.scss',
})
export class ClientsTabComponent implements OnInit {
  public isBusy: boolean = false;
  public clients: ClientDto[] = [];
  public hasMore: boolean = false;
  public total: number = 0;
  public isLoadMore: boolean = false;

  public config: ISearchInputConfig = getSearchInputConfig();
  public schema: ISearchInputSchema = getSearchInputSchema(
    'Введите номер телефона, имя или текст из заметок для поиска...',
  );

  public paginationQuery: SearchPaginatedRequest = { paginatedRequest: { pageIndex: 1, pageSize: 10 } };

  public constructor(
    private readonly clientsService: ClientsService,
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

    this.clientsService
      .getClientsPaginated(this.paginationQuery)
      .subscribe({
        next: (data: PaginatorResult<ClientDto>) => {
          if (isLoadMore) {
            this.clients.push(...data.items);
          } else {
            this.clients = data.items;
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

  public trackByClientId(index: number, client: ClientDto): string {
    return client.id!;
  }

  public deleteClient(clientId: string): void {
    this.clientsService.deleteClient(clientId).subscribe({
      next: () => {
        this.clients = this.clients.filter((client) => client.id !== clientId);
        this.total--;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        this.displayErrorHelper.displayErrorFunc(err);
      },
    });
  }

  public add(): void {
    this.router.navigate(['clients', 'new']);
  }

  public reset(): void {
    this.paginationQuery.searchInput = '';
    this.search();
  }

  public editClient(id: string): void {
    this.router.navigate(['clients', id]);
  }

  public loadMore(): void {
    if (this.hasMore) {
      this.paginationQuery.paginatedRequest.pageIndex++;
      this.search(true);
    }
  }
}
