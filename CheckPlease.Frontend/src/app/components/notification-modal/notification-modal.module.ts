import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NavigationBlockGuard } from '../../guards/navigation-block.guard';
import { NotificationModalComponent } from './notification-modal.component';
import { NotificationModalService } from './notification-modal.service';

@NgModule({
  imports: [NotificationModalComponent, MatDialogModule],
  providers: [NotificationModalService, NavigationBlockGuard],
  exports: [NotificationModalComponent, MatDialogModule],
})
export class NotificationModalModule {}
