import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMainMenuItem } from '../components/main-menu-item/main-menu-item';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  public collapsedItem$: Observable<IMainMenuItem | null>;
  public minimizedMode$: Observable<boolean>;

  private collapsedItem = new BehaviorSubject<IMainMenuItem | null>(null);
  private minimizedMode = new BehaviorSubject<boolean>(true);

  public constructor() {
    this.collapsedItem$ = this.collapsedItem;
    this.minimizedMode$ = this.minimizedMode;
  }

  public get isMinimizedMode(): boolean {
    return this.minimizedMode.value;
  }

  public toggleMenuItem(mainMenu: IMainMenuItem): void {
    if (mainMenu === this.collapsedItem.value) {
      this.collapsedItem.next(null);
    } else {
      this.collapsedItem.next(mainMenu);
    }
  }

  public toggleMinimizedMode(): void {
    this.minimizedMode.next(!this.minimizedMode.value);
  }
}
