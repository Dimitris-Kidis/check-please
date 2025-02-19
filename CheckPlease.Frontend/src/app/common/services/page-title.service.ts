import { Injectable } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';

import * as _ from 'lodash-es';
import { BehaviorSubject } from 'rxjs';
import { bufferWhen, filter, map, takeUntil, tap } from 'rxjs/operators';
import { EventAggregator } from './event-aggregator';
import { NgOnDestroy } from './ng-on-destroy.service';
import { OverridePageTitleEvent } from './override-page-title.event';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  public pageTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public constructor(
    private readonly router: Router,
    private readonly eventAggregator: EventAggregator,
    private readonly destroyed$: NgOnDestroy, // private readonly store: Store,
  ) {
    this.eventAggregator
      .with(OverridePageTitleEvent)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: OverridePageTitleEvent) => {
        setTimeout(() => {
          console.log(event.pageTitle);
          this.pageTitle$.next(event.pageTitle);
        });
      });
  }

  public init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationStart),
        bufferWhen(() => this.router.events.pipe(filter((event) => event instanceof NavigationEnd))),
        filter((events) => !!events.length),
        map((events) => <ActivationStart>_.findLast(events, (e: any) => e.snapshot.data.pageTitle)),
        map((event: any) => event?.snapshot.data.pageTitle ?? ''),
        tap((pageTitle) => this.pageTitle$.next(pageTitle)),
      )
      .subscribe();
  }
}
