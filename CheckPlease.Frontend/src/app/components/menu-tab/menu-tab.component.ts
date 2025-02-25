import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IMenuTab, MenuSchema } from './menu-tabs';

@Component({
  selector: 'check-please-menu-tab',
  imports: [RouterModule, MatIconModule, CommonModule, TranslateModule],
  templateUrl: './menu-tab.component.html',
  styleUrl: './menu-tab.component.scss',
})
export class MenuTabComponent {
  public tabs: IMenuTab[] = MenuSchema.menuTabs;
}
