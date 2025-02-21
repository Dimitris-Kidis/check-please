import { Component } from '@angular/core';
import { ClientsTabComponent } from '../clients-tab/clients-tab.component';

@Component({
  selector: 'check-please-client-search-dialog',
  imports: [ClientsTabComponent],
  templateUrl: './client-search-dialog.component.html',
  styleUrl: './client-search-dialog.component.scss',
})
export class ClientSearchDialogComponent {}
