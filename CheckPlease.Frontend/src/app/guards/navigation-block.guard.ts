import { inject, Injectable } from '@angular/core';
import { CanDeactivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationModalService } from '../components/notification-modal/notification-modal.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationBlockGuard {
  public isNavigationBlocked: boolean = false;

  public blockNavigation(): void {
    this.isNavigationBlocked = true;
    window.onbeforeunload = (e) => {
      e.preventDefault();
    };
  }

  public unblock(): void {
    this.isNavigationBlocked = false;
    window.onbeforeunload = null;
  }
}

export type CanDeactivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export interface NavigationGuard {
  getNavigationBlockStatus: () => CanDeactivateType;
}

export const navigationBlockGuard: CanDeactivateFn<NavigationGuard> = (component: NavigationGuard) => {
  const modalService: NotificationModalService = inject(NotificationModalService);
  const isNavigationBlocked = component.getNavigationBlockStatus();

  if (isNavigationBlocked) {
    return modalService
      .showConfirmationModal('COMMON.NAVIGATE_TITLE', 'COMMON.NAVIGATE_AWAY_MESSAGE')
      .pipe(filter(Boolean));
  }

  return true;
};
