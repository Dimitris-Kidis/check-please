import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClientDto } from '../../../../models/client';
import { DefaultValuePipe } from '../../../pipes/default-value.pipe';

@Component({
  selector: 'check-please-client-card',
  imports: [MatIconModule, DefaultValuePipe, CommonModule],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input({ required: true }) public client: ClientDto;
  @Output() public onClientDeleting = new EventEmitter<string>();

  public deleteClient(id: string): void {
    this.onClientDeleting.emit(id);
  }
}
