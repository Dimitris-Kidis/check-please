import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
// import { CurrentUserProvider } from '../../../common/providers/current-user.provider';
import { MainMenuService } from '../../services/main-menu.service';
import { IMainMenuItem } from './main-menu-item';

@Component({
  selector: 'check-please-main-menu-item',
  templateUrl: './main-menu-item.component.html',
  styleUrls: ['./main-menu-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      state(
        '0',
        style({
          height: '0px',
        }),
      ),
      state(
        '1',
        style({
          height: '*',
        }),
      ),
      transition('1 => 0', animate('200ms ease-out')),
      transition('0 => 1', animate('200ms ease-in')),
    ]),
  ],
})
export class MainMenuItemComponent implements OnInit {
  @Input() public menuItem!: IMainMenuItem;

  public collapsed: boolean = true;

  public constructor(private mainMenuService: MainMenuService) {}

  public ngOnInit(): void {
    this.mainMenuService.collapsedItem$.subscribe((selectedItem) => {
      this.collapsed = selectedItem !== this.menuItem || !this.collapsed;
    });
  }

  public toggleCollapse(): void {
    if (this.mainMenuService.isMinimizedMode) {
      this.mainMenuService.toggleMinimizedMode();

      if (this.collapsed) {
        this.mainMenuService.toggleMenuItem(this.menuItem);
      }
    } else {
      this.mainMenuService.toggleMenuItem(this.menuItem);
    }
  }
}
