import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClientDto } from '../../../models/client';
import { ClientsService } from '../../../services/clients.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { TextAreaEditControlComponent } from '../../common/controls/text-area-edit-control/text-area-edit-control.component';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerModule } from '../../directives/spinner/spinner.module';
import { IClientEditConfig, getClientEditConfig } from '../clients-tab/client-edit/client-edit.config';
import { IClientEditSchema, getClientEditSchema } from '../clients-tab/client-edit/client-edit.schema';

@Component({
  selector: 'check-please-client-create-dialog',
  imports: [
    FormsModule,
    TranslateModule,
    TextEditControlComponent,
    TextAreaEditControlComponent,
    CommonModule,
    SpinnerModule,
    MatIconModule,
  ],
  templateUrl: './client-create-dialog.component.html',
  styleUrl: './client-create-dialog.component.scss',
})
export class ClientCreateDialogComponent {
  public isBusy: boolean = false;

  public client: ClientDto = { fullName: '', phoneNumber: '' };

  public schema: IClientEditSchema = getClientEditSchema();
  public config: IClientEditConfig = getClientEditConfig();

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly clientsService: ClientsService,
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    public dialogRef: MatDialogRef<ClientCreateDialogComponent>,
  ) {}

  public save(): void {
    this.setIsBusy(true);

    this.clientsService
      .createClient(this.client)
      .subscribe({
        next: (clientId: string) => {
          this.dialogRef.close({
            clientId,
            clientView: this.client,
          });
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
