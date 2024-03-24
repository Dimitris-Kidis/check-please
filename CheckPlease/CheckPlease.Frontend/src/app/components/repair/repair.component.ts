import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { UpdateMileageCommand } from 'src/app/commands/car-commands';
import { CreateRepairCommand, GetRepairsHistoryWithFilterCommand } from 'src/app/commands/repair-commands';
import { CarsService } from 'src/services/cars.service';
import { FilesService } from 'src/services/files.service';
import { RepairService } from 'src/services/repair.service';
import { SharedService } from 'src/services/shared-dropdown.service';
import { RepairInfoComponent } from '../repair-info/repair-info.component';

@Component({
  selector: 'check-please-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss'],
})
export class RepairComponent implements OnInit {
  @ViewChild(RepairInfoComponent) public repairInfoComponent: RepairInfoComponent;

  public clientId: number = 0;
  public carId: number = 0;
  public isPreviewConfirmed: boolean = false;
  public newMileage: number;
  public mileage: UpdateMileageCommand;

  public constructor(
    private readonly filesService: FilesService,
    private readonly carService: CarsService,
    private readonly repairService: RepairService,
    private readonly sharedService: SharedService,
    private readonly toastrService: ToastrService,
  ) {}

  public get state(): string {
    if (this.clientId === 0) return 'client';
    if (this.carId === 0) return 'car';
    return 'repair';
  }

  public ngOnInit(): void {
    console.log(new Date().toISOString());
    const command: GetRepairsHistoryWithFilterCommand = {
      isToday: false,
      isYesterday: true,
      date: new Date().toISOString(), // ОСТАНОВИЛСЯ ТУТ!
      carSign: '',
    };

    this.repairService.getRepairHistoryWithFilter(command).subscribe((info: any) => console.log(info));
  }

  public getClientId(clientId: number): void {
    this.clientId = clientId;
  }

  public getCarId(carId: number): void {
    this.carId = carId;
  }

  public getNewCarMileage(newMileage: number): void {
    this.newMileage = newMileage;
  }

  public getRepairData(data: CreateRepairCommand): void {
    const newMileage: UpdateMileageCommand = {
      carId: this.carId,
      mileage: +data.mileage,
    };
    this.updateMileage(newMileage, data);
  }

  public downloadPdf(id: number): void {
    this.filesService.getPdfFile(id).subscribe((response: HttpResponse<Blob>) => {
      const fileName = response.headers.get('content-disposition')!.split(';')[1].split('=')[1].replace(/"/g, '');
      const a: HTMLAnchorElement = document.createElement('a');
      const data: Blob = new Blob([response.body!], { type: 'application/pdf' });
      const downloadURL: string = window.URL.createObjectURL(data);
      a.href = downloadURL;
      a.download = fileName;
      a.click();
      this.repairInfoComponent.stopLoading();
    });
  }

  private createRepair(data: CreateRepairCommand): void {
    data.carId = this.carId;
    data.clientId = this.clientId;
    data.mileage = +data.mileage;

    // const newCar: CreateNewCar = {
    //   carSign: this.carSignString,
    //   ...(this.vinCodeString === '' || !this.vinCodeString ? {} : {vinCode: `${this.vinCodeString}`}),
    //   ...(this.volumeString === '' || !this.volumeString ? {} : {volume: `${this.volumeString}`}),
    //   ...(this.brandString === '' || !this.brandString ? {} : {brand: `${this.brandString}`}),
    //   ...(this.modelString === '' || !this.modelString ? {} : {model: `${this.modelString}`}),
    //   ...(this.mileageString === 0 || !this.mileageString ? {} : {mileage: this.mileageString}),
    //   ...(this.yearString === 0 || !this.yearString ? {} : {year: this.yearString}),
    // };
    this.repairService
      .createRepair(data)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => {
            this.sharedService.displayErrors(err);
            this.repairInfoComponent.stopLoading();
          }),
        ),
      )
      .subscribe((repairId: number) => this.downloadPdf(repairId));
  }

  private updateMileage(command: UpdateMileageCommand, data: CreateRepairCommand): void {
    this.carService
      .updateMileage(command)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => {
            this.sharedService.displayErrors(err);
            this.repairInfoComponent.stopLoading();
          }),
        ),
      )
      .subscribe(() => {
        this.repairInfoComponent.stopLoading();
        this.createRepair(data);
        this.toastrService.success('Пробег успешно обновлен!');
      });
  }
}
