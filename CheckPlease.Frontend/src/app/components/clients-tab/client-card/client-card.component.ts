import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environment/environment';
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
  @Output() public onClientEditing = new EventEmitter<string>();

  public datetimeDefaultFormat: string = environment.datetimeDefaultFormat;

  public deleteClient(id: string): void {
    this.onClientDeleting.emit(id);
  }

  public editClient(id: string): void {
    this.onClientEditing.emit(id);
  }
}
