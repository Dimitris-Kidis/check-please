import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CheckPleaseEvent } from './check-please-event';

@Injectable({
  providedIn: 'root',
})
export class EventAggregator {
  private events: Subject<any> = new Subject();

  public with<TConstructor extends new (...args: any[]) => any>(
    ctor: TConstructor,
    ...args: EventParameters<TConstructor>
  ): Observable<InstanceType<TConstructor>> {
    // eslint-disable-next-line new-cap
    const obj = new ctor(...args);

    return this.events.pipe(
      filter((t) => t.getKey() === obj.getKey()),
      map((t): InstanceType<TConstructor> => <InstanceType<TConstructor>>t),
    );
  }

  public publish<T extends CheckPleaseEvent>(event: T): void {
    this.events.next(event);
  }
}

type EventParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any
  ? Partial<P>
  : never;
