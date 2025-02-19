import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { PopoverContentDirective } from './directives/popover-content.directive';
import { PopoverElementDirective } from './directives/popover-element.directive';
import { PopoverHeaderDirective } from './directives/popover-header.directive';
import { PopoverComponent } from './popover.component';

@NgModule({
  declarations: [PopoverComponent, PopoverHeaderDirective, PopoverContentDirective, PopoverElementDirective],
  imports: [SharedModule, OverlayModule, MatIconModule, MatButtonModule],
  exports: [PopoverComponent, PopoverHeaderDirective, PopoverContentDirective, PopoverElementDirective],
})
export class PopoverModule {}
