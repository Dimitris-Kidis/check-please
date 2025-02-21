import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from '../../../services/message.service';
import { RepairsService } from '../../../services/repairs.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerSizeDirective } from '../../directives/spinner/spinner-size.directive';
import { SpinnerModule } from '../../directives/spinner/spinner.module';

@Component({
  selector: 'check-please-bot-sender',
  imports: [
    FormsModule,
    TranslateModule,
    FormsModule,
    CommonModule,
    SpinnerModule,
    MatIconModule,
    SpinnerSizeDirective,
    SpinnerModule,
  ],
  templateUrl: './bot-sender.component.html',
  styleUrl: './bot-sender.component.scss',
})
export class BotSenderComponent {
  public isBusy: boolean = false;
  public botCommand: string;

  public constructor(
    private readonly repairsService: RepairsService,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly messageService: MessageService,
  ) {}
  public sendToBot(): void {
    this.isBusy = true;

    this.repairsService
      .sendCommand(this.botCommand)
      .subscribe({
        next: () => {
          this.messageService.showSuccess('Комманда отправлена боту..');
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => (this.isBusy = false));
  }
}
