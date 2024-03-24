import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { SearchType } from 'src/app/enums/search-type';
import { SearchResult } from 'src/models/search';
import { SearchService } from 'src/services/search.service';
import { SharedService } from 'src/services/shared-dropdown.service';
import { DestroyBaseComponent } from '../destroy-base/destroy-base.component';

enum NotFound {
  Client = 'Клиент с таким номером не найден',
  Car = 'Машины с таким номером не нет',
}
@Component({
  selector: 'check-please-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
})
export class SearchDropdownComponent extends DestroyBaseComponent implements OnInit, OnDestroy {
  public isWindowOpen: boolean = false;
  public results$: Observable<SearchResult[]>;

  private isDropdownLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public constructor(
    @Inject('SEARCH_TERM') public search: { term: BehaviorSubject<string>; isOpen: boolean; type: string },
    private readonly sharedService: SharedService,
    private readonly searchService: SearchService,
    private readonly toastrService: ToastrService,
  ) {
    super();
  }

  public get isDropdownLoaded$(): Observable<boolean> {
    return this.isDropdownLoadingDone$.asObservable();
  }

  public ngOnInit(): void {
    if (this.isWindowOpen) return;

    this.isWindowOpen = this.search.isOpen;
    this.results$ = this.search.term.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isDropdownLoadingDone$.next(false)),
      takeUntil(this.destroy$),
      switchMap((term: string) =>
        this.search.type === SearchType.Car
          ? this.searchService.searchCar(term)
          : this.searchService.searchClient(term),
      ),
      tap((results: SearchResult[]) => {
        this.isDropdownLoadingDone$.next(true);
        if (results.length === 0)
          this.search.type === SearchType.Car
            ? this.toastrService.info(NotFound.Car)
            : this.toastrService.info(NotFound.Client);
      }),
      shareReplay(1),
    );
  }

  public selectItem(result: SearchResult): void {
    this.sharedService.selectItem(
      (this.search.type === SearchType.Car ? result.carSign : result.phoneNumber).replace(/<[^>]*>/g, ''),
    );
  }
}
