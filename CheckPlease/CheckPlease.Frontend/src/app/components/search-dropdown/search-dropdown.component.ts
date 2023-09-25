import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, shareReplay, switchMap, takeUntil, tap } from 'rxjs';
import { CarSearchResult, ClientSearchResult, SearchResult } from 'src/models/search';
import { SearchService } from 'src/services/search.service';
import { SharedService } from 'src/services/shared-dropdown.service';
import { DestroyBaseComponent } from '../destroy-base/destroy-base.component';
import { SearchType } from 'src/app/enums/search-type';

@Component({
  selector: 'app-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss']
})
export class SearchDropdownComponent extends DestroyBaseComponent implements OnInit, OnDestroy {
  private isDropdownLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isWindowOpen: boolean = false;
  public results$: Observable<SearchResult[]>;

  constructor (
    @Inject('SEARCH_TERM') public search: { term: BehaviorSubject<string>; isOpen: boolean, type: string },
    private sharedService: SharedService,
    private searchService: SearchService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.isWindowOpen) return;

    this.isWindowOpen = this.search.isOpen;
    this.results$ = this.search.term.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isDropdownLoadingDone$.next(false)),
      takeUntil(this.destroy$),
      switchMap(
        (term: string) => 
          this.search.type === SearchType.Car ?
            this.searchService.searchCar(term) :
            this.searchService.searchClient(term)
            ),
      tap(() => this.isDropdownLoadingDone$.next(true)),
      shareReplay(1)
    );
  }

  public selectItem(result: SearchResult) {
    this.sharedService.selectItem(
      (this.search.type === SearchType.Car ? result.carSign : result.phoneNumber).replace(/<[^>]*>/g, '')
    );
  }

  public get isDropdownLoaded$(): Observable<boolean> {
    return this.isDropdownLoadingDone$.asObservable();
  }
}
