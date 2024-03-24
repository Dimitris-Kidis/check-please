import { Component } from '@angular/core';
import { MainMenuService } from '../../services/main-menu.service';
import { IMainMenuItem } from '../main-menu-item/main-menu-item';
import { MainMenuSchema } from './main-menu.schema';

@Component({
  selector: 'check-please-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  public menuItems: IMainMenuItem[];

  public constructor(public mainMenuService: MainMenuService) {
    this.menuItems = Object.values(MainMenuSchema);
  }
}
