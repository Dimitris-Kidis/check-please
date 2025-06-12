import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from '../../../services/message.service';
import { RepairsService } from '../../../services/repairs.service';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerSizeDirective } from '../../directives/spinner/spinner-size.directive';
import { SpinnerModule } from '../../directives/spinner/spinner.module';

@Component({
  selector: 'check-please-bot-sender',
  standalone: true,
  templateUrl: './bot-sender.component.html',
  styleUrl: './bot-sender.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SpinnerModule,
    SpinnerSizeDirective,
  ],
})
export class BotSenderComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger) public autocompleteTrigger!: MatAutocompleteTrigger;
  @ViewChild('commandInput') public commandInput!: ElementRef<HTMLInputElement>;

  public form: FormGroup;
  public isBusy = false;
  public commandOptions: string[] = [
    'репорт',
    'бекап',
    'репорт:неотправленные',
    'репорт:сегодня',
    'репорт:неделя',
    'репорт:месяц',
    'репорт:машина[]',
    'репорт:клиент[]',
    'отправить:',
  ];
  public filteredCommands: string[] = [];

  private fb = inject(FormBuilder);
  private repairsService = inject(RepairsService);
  private messageService = inject(MessageService);
  private displayErrorHelper = inject(DisplayErrorHelper);

  public ngOnInit(): void {
    this.form = this.fb.group({
      command: [''],
    });

    this.form.get('command')?.valueChanges.subscribe((value: string) => {
      const input = value?.toLowerCase() ?? '';
      this.filteredCommands =
        input.length === 0
          ? [...this.commandOptions]
          : this.commandOptions.filter((option) => option.toLowerCase().includes(input));
    });
  }

  public sendToBot(): void {
    console.log(this.autocompleteTrigger);

    if (this.autocompleteTrigger?.panelOpen) {
      return;
    }

    const botCommand = this.form.get('command')?.value?.trim();
    if (!botCommand) return;

    this.isBusy = true;
    this.repairsService
      .sendCommand(botCommand)
      .subscribe({
        next: () => {
          this.messageService.showSuccess('BOT.COMMAND.SENT.SUCCESS');
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => (this.isBusy = false));
  }

  public onOptionSelected(option: string): void {
    this.form.get('command')?.setValue(option);

    if (option.includes('[]')) {
      setTimeout(() => {
        const inputEl = this.commandInput.nativeElement;
        const index = option.indexOf('[]');
        const position = index + 1;
        inputEl.setSelectionRange(position, position);
        inputEl.focus();
      });
    }
  }
}
