import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateMileageCommand } from 'src/app/commands/car-commands';
import { CreateRepairCommand } from 'src/app/commands/repair-commands';
import { DateConvertPipe } from 'src/app/pipes/date-convert.pipe';
import { CarsService } from 'src/services/cars.service';
import { FilesService } from 'src/services/files.service';
import { RepairService } from 'src/services/repair.service';
import { RepairInfoComponent } from '../repair-info/repair-info.component';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/services/shared-dropdown.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit {

  public clientId: number = 0
  public carId: number = 0;
  public isPreviewConfirmed: boolean = false;
  public newMileage: number;

  @ViewChild(RepairInfoComponent) repairInfoComponent: RepairInfoComponent;

  constructor(
    private filesService: FilesService,
    private carService: CarsService,
    private repairService: RepairService,
    private sharedService: SharedService,
    private toastrService: ToastrService,

  ) {

  }

  ngOnInit(): void {
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
    console.log('MILE ' + +data.mileage)
    const newMileage: UpdateMileageCommand = {
      carId: this.carId,
      mileage: +data.mileage
    }
    this.updateMileage(newMileage);
    this.createRepair(data);
  }

  private createRepair(data: CreateRepairCommand): void {
    data.carId = this.carId;
    data.clientId = this.clientId;
    data.mileage = +data.mileage;
    
    console.log('data', data)

    // const newCar: CreateNewCar = {
    //   carSign: this.carSignString,
    //   ...(this.vinCodeString === '' || !this.vinCodeString ? {} : {vinCode: `${this.vinCodeString}`}),
    //   ...(this.volumeString === '' || !this.volumeString ? {} : {volume: `${this.volumeString}`}),
    //   ...(this.brandString === '' || !this.brandString ? {} : {brand: `${this.brandString}`}),
    //   ...(this.modelString === '' || !this.modelString ? {} : {model: `${this.modelString}`}),
    //   ...(this.mileageString === 0 || !this.mileageString ? {} : {mileage: this.mileageString}),
    //   ...(this.yearString === 0 || !this.yearString ? {} : {year: this.yearString}),
    // };
    this.repairService.createRepair(data)
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(() => {
        this.sharedService.displayErrors(err)
        this.repairInfoComponent.stopLoading();
      }))
    )
    .subscribe(
      (repairId: number) => this.downloadPdf(repairId)
    );
  }

  private updateMileage(command: UpdateMileageCommand): void {
    this.carService.updateMileage(command)
    .pipe(
      catchError((err: HttpErrorResponse) => throwError(() => {
        this.sharedService.displayErrors(err)
        this.repairInfoComponent.stopLoading();
      }))
    )
    .subscribe(() => {
      this.repairInfoComponent.stopLoading();
      this.toastrService.success('Пробег успешно обновлен!');
    })
  }

  public downloadPdf(id: number): void {
    this.filesService.getPdfFile(id)
    .subscribe(
      (file: Blob) => {
        const a: HTMLAnchorElement = document.createElement('a');
        const data: Blob = new Blob([file], { type: 'application/pdf' });
        const downloadURL: string = window.URL.createObjectURL(data);
        a.href = downloadURL;
        let pipe: DateConvertPipe = new DateConvertPipe();
        a.download = `${pipe.transform(new Date().toString())}.pdf`;
        a.click();
        this.repairInfoComponent.stopLoading();
      }
    )
  }

  public get state(): string {
    if (this.clientId === 0) return 'client';
    if (this.carId === 0) return 'car';
    return 'repair';
  }
}
