import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { CarDto } from '../../../models/car';
import { ClientDto } from '../../../models/client';
import { DetailDto, RepairDto } from '../../../models/repair';
import { CarsService } from '../../../services/cars.service';
import { ClientsService } from '../../../services/clients.service';
import { MessageService } from '../../../services/message.service';
import { RepairsService } from '../../../services/repairs.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { DateEditControlComponent } from '../../common/controls/date-edit-control/date-edit-control.component';
import { NumberEditControlComponent } from '../../common/controls/number-edit-control/number-edit-control.component';
import { IDetailOption } from '../../common/controls/predefined-text-edit-control/predefined-text-edit-control.component';
import { TextAreaEditControlComponent } from '../../common/controls/text-area-edit-control/text-area-edit-control.component';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { DefaultValuePipe } from '../../pipes/default-value.pipe';
import { BotSenderComponent } from '../bot-sender/bot-sender.component';
import { CarCreateDialogComponent } from '../car-create-dialog/car-create-dialog.component';
import { CarSearchDialogComponent } from '../car-search-dialog/car-search-dialog.component';
import { ClientCreateDialogComponent } from '../client-create-dialog/client-create-dialog.component';
import { ClientSearchDialogComponent } from '../client-search-dialog/client-search-dialog.component';
import { RepairTableComponent } from '../repair-table/repair-table.component';
import {
  IRepairCreateCarConfig,
  IRepairCreateClientConfig,
  IRepairCreateConfig,
  getRepairCreateCarConfig,
  getRepairCreateClientConfig,
  getRepairCreateConfig,
} from './repair-tab.config';
import {
  IRepairCreateCarSchema,
  IRepairCreateClientSchema,
  IRepairCreateSchema,
  getRepairCreateCarSchema,
  getRepairCreateClientSchema,
  getRepairCreateSchema,
} from './repair-tab.schema';

@Component({
  selector: 'check-please-repair-tab',
  imports: [
    RepairTableComponent,
    DateEditControlComponent,
    TextAreaEditControlComponent,
    BotSenderComponent,
    CommonModule,
    MatIconModule,
    TextEditControlComponent,
    MatDialogModule,
    NumberEditControlComponent,
    DefaultValuePipe,
  ],
  templateUrl: './repair-tab.component.html',
  styleUrl: './repair-tab.component.scss',
})
export class RepairTabComponent implements OnInit {
  public isBusy: boolean = false;
  public details: DetailDto[] = [];
  public repair: RepairDto = { details: [] };
  public defaultDate: Date = new Date();
  public options: IDetailOption[] = [];

  public client: IClientView = {};
  public car: ICarView = {};

  public carSuggestions: CarDto[] = [];
  public clientSuggestions: ClientDto[] = [];

  public dateDefaultFormat: string = environment.dateDefaultFormat;

  public repairsHistoryList: RepairDto[] = [];

  public schema: IRepairCreateSchema = getRepairCreateSchema();
  public config: IRepairCreateConfig = getRepairCreateConfig();

  public clientSchema: IRepairCreateClientSchema = getRepairCreateClientSchema();
  public clientConfig: IRepairCreateClientConfig = getRepairCreateClientConfig();

  public carSchema: IRepairCreateCarSchema = getRepairCreateCarSchema();
  public carConfig: IRepairCreateCarConfig = getRepairCreateCarConfig();

  public constructor(
    private readonly repairsService: RepairsService,
    private readonly carsService: CarsService,
    private readonly clientsService: ClientsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly messageService: MessageService,
    private readonly dialog: MatDialog,
  ) {
    this.repair.repairDate = this.defaultDate;
  }

  public ngOnInit(): void {
    this.getDetailsNamesOptions();
  }

  public getCarHistory(carId: string): void {
    this.setIsBusy(true);

    this.carsService
      .getCarHistory(carId)
      .subscribe({
        next: (data: RepairDto[]) => {
          this.repairsHistoryList = data;
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public seeReport(id: string): void {
    const url = this.router.serializeUrl(this.router.createUrlTree(['repairs', id]));
    window.open(url, '_blank');
  }

  public getSuggestionsForClient(phoneNumber: string): void {
    this.carsService.getSuggestionsForClient(phoneNumber).subscribe({
      next: (data: CarDto[]) => {
        this.carSuggestions = data;
      },
      error: (err) => this.displayErrorHelper.displayErrorFunc(err),
    });
  }

  public getSuggestionsForCar(carSign: string): void {
    this.clientsService.getSuggestionsForCar(carSign).subscribe({
      next: (data: ClientDto[]) => {
        this.clientSuggestions = data;
      },
      error: (err) => this.displayErrorHelper.displayErrorFunc(err),
    });
  }

  public createClient(): void {
    const dialogRef = this.dialog.open(ClientCreateDialogComponent, {
      autoFocus: false,
      panelClass: 'calendar-event-modal',
      disableClose: false,
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { clientId, clientView } = result;

      if (clientId) {
        this.repair.clientId = clientId;
        this.client = clientView;
      }
    });
  }

  public searchCar(): void {
    const dialogRef = this.dialog.open(CarSearchDialogComponent, {
      autoFocus: false,
      panelClass: 'calendar-event-modal',
      disableClose: false,
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { carId, carView } = result;

      if (carId) {
        this.getCarHistory(carId);
        this.repair.carId = carId;
        this.car = carView;
      }
    });
  }

  public selectCar(car: CarDto): void {
    this.repair.carId = car.id;
    this.car.carSign = car.carSign;
    this.car.mileage = car.mileage;
    this.getCarHistory(car.id!);
  }

  public selectClient(client: ClientDto): void {
    this.repair.clientId = client.id;
    this.client.fullName = client.fullName;
    this.client.phoneNumber = client.phoneNumber;
  }

  public searchClient(): void {
    const dialogRef = this.dialog.open(ClientSearchDialogComponent, {
      autoFocus: false,
      panelClass: 'calendar-event-modal',
      disableClose: false,
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { clientId, clientView } = result;

      if (clientId) {
        this.repair.clientId = clientId;
        this.client = clientView;
      }
    });
  }

  public createCar(): void {
    const dialogRef = this.dialog.open(CarCreateDialogComponent, {
      autoFocus: false,
      panelClass: 'calendar-event-modal',
      disableClose: false,
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const { carId, carView } = result;

      if (carId) {
        this.repair.carId = carId;
        this.car = carView;
        this.repair.mileage = carView.mileage;
        this.getCarHistory(carId);
      }
    });
  }

  public resetClient(): void {
    this.repair.clientId = '';
    this.client = {};
  }

  public resetCar(): void {
    this.repair.carId = '';
    this.car = {};
  }

  public createRepair(): void {
    this.setIsBusy(true);

    this.repairsService
      .createRepair(this.repair)
      .subscribe({
        next: () => {
          this.messageService.showSuccess('Ремонт успешно создан..');
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }

  private getDetailsNamesOptions(): void {
    this.repairsService.getDetailsNamesOptions().subscribe({
      next: (data: IDetailOption[]) => {
        this.options = data;
      },
      error: (err: HttpErrorResponse) => {
        this.displayErrorHelper.displayErrorFunc(err);
      },
    });
  }
}

export interface IClientView {
  fullName?: string;
  phoneNumber?: string;
}

export interface ICarView {
  carSign?: string;
  mileage?: number;
}
