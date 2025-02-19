import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClientDto } from '../../../../models/client';
import { ClientsService } from '../../../../services/clients.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { TextAreaEditControlComponent } from '../../../common/controls/text-area-edit-control/text-area-edit-control.component';
import { TextEditControlComponent } from '../../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { SpinnerModule } from '../../../directives/spinner/spinner.module';
import { getClientEditConfig, IClientEditConfig } from './client-edit.config';
import { getClientEditSchema, IClientEditSchema } from './client-edit.schema';

@Component({
  selector: 'check-please-client-edit',
  imports: [
    FormsModule,
    TranslateModule,
    TextEditControlComponent,
    TextAreaEditControlComponent,
    CommonModule,
    SpinnerModule,
    MatIconModule,
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss',
})
export class ClientEditComponent implements OnInit {
  public isCreateMode: boolean = true;
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
  ) {}

  public ngOnInit(): void {
    this.client = this.route.snapshot.data['client'];

    if (this.client != null) {
      this.isCreateMode = false;
      return;
    }

    this.client = {};
  }

  public save(): void {
    this.setIsBusy(true);

    const action$ = this.isCreateMode
      ? this.clientsService.createClient(this.client)
      : this.clientsService.updateClient(this.client);

    action$
      .subscribe({
        next: () => {
          this.router.navigate(['clients']);
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public cancel(): void {
    this.router.navigate(['clients']);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
