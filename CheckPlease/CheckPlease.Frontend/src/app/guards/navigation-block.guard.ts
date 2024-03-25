import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { NotificationModalService } from '../components/notification-modal/notification-modal.service';

@Injectable({
  providedIn: 'root',
  deps: [NotificationModalService],
})
export class NavigationBlockGuard {
  private blockConditionFn?: () => boolean;

  public constructor(private readonly modalService: NotificationModalService) {}

  public get isNavigationBlocked(): boolean {
    return this.blockConditionFn ? this.blockConditionFn() : false;
  }

  public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isNavigationBlocked) {
      return this.openModal().pipe(
        filter(Boolean),
        tap((): void => {
          this.unblock();
        }),
      );
    }

    return true;
  }

  public openModal(): Observable<boolean | undefined> {
    return this.modalService.showConfirmationModal('COMMON.NAVIGATE_AWAY_TITLE', 'COMMON.NAVIGATE_AWAY_MESSAGE');
  }

  public conditionalBlockNavigation(shouldBlockNavigationFn: () => boolean): void {
    this.blockConditionFn = shouldBlockNavigationFn;

    window.onbeforeunload = (e) => {
      if (this.isNavigationBlocked) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
  }

  public unblock(): void {
    this.blockConditionFn = undefined;
    window.onbeforeunload = null;
  }
}
