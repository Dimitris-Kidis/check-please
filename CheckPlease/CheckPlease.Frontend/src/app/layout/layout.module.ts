import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PageSpinnerModule } from '../common/components/page-spinner/page-spinner.module';
import { SharedModule } from '../shared/shared.module';
import { MainMenuItemComponent } from './components/main-menu-item/main-menu-item.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent, MainMenuComponent, MainMenuItemComponent],
  imports: [
    SharedModule,
    RouterModule,

    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    OverlayModule,

    PageSpinnerModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
