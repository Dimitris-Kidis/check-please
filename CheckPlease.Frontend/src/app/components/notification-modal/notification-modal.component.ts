import { A11yModule } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';

export interface DialogData {
  title: string;
  message: string;
  confirm: string;
  cancel: string;
  isCancelSelected: boolean;
  isCancelHidden: boolean;
  iconName?: string | null;
}

@Component({
  selector: 'synchro-notification-modal',
  templateUrl: './notification-modal.component.html',
  standalone: true,
  imports: [SharedModule, A11yModule, MatDialogModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationModalComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public readonly data: DialogData) {}
}
