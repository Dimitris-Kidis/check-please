import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DetailDto, RepairDto } from '../../../../models/repair';
import { MessageService } from '../../../../services/message.service';
import { RepairsService } from '../../../../services/repairs.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { CheckboxEditControlComponent } from '../../../common/controls/checkbox/checkbox-edit-control/checkbox-edit-control.component';
import { DateEditControlComponent } from '../../../common/controls/date-edit-control/date-edit-control.component';
import { NumberEditControlComponent } from '../../../common/controls/number-edit-control/number-edit-control.component';
import { TextAreaEditControlComponent } from '../../../common/controls/text-area-edit-control/text-area-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { SpinnerModule } from '../../../directives/spinner/spinner.module';
import { BotSenderComponent } from '../../bot-sender/bot-sender.component';
import { RepairTableComponent } from '../../repair-table/repair-table.component';
import { IRepairEditConfig, getRepairEditConfig } from './repair-edit.config';
import { IRepairEditSchema, getRepairEditSchema } from './repair-edit.schema';

@Component({
  selector: 'check-please-repair-edit',
  imports: [
    RepairTableComponent,
    FormsModule,
    TranslateModule,
    NumberEditControlComponent,
    TextAreaEditControlComponent,
    FormsModule,
    CommonModule,
    SpinnerModule,
    MatIconModule,
    DateEditControlComponent,
    CheckboxEditControlComponent,
    BotSenderComponent,
  ],
  templateUrl: './repair-edit.component.html',
  styleUrl: './repair-edit.component.scss',
})
export class RepairEditComponent implements OnInit {
  public isBusy: boolean = false;
  public details: DetailDto[] = [];
  public repair: RepairDto = {};

  public schema: IRepairEditSchema = getRepairEditSchema();
  public config: IRepairEditConfig = getRepairEditConfig();

  public constructor(
    private readonly repairsService: RepairsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly messageService: MessageService,
  ) {}

  public ngOnInit(): void {
    this.repair = this.route.snapshot.data['repair'];

    this.details = this.repair.details ?? [];
  }

  public save(): void {
    this.setIsBusy(true);

    this.repairsService
      .updateRepair(this.repair)
      .subscribe({
        next: () => {
          this.router.navigate(['repairs']);
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public test(): void {
    console.log(this.details);
  }

  public cancel(): void {
    this.router.navigate(['repairs']);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
