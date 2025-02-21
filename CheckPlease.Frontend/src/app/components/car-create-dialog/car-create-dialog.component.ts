import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarDto } from '../../../models/car';
import { CarsService } from '../../../services/cars.service';
import { PageSpinnerService } from '../../common/components/page-spinner/page-spinner.service';
import { NumberEditControlComponent } from '../../common/controls/number-edit-control/number-edit-control.component';
import { TextAreaEditControlComponent } from '../../common/controls/text-area-edit-control/text-area-edit-control.component';
import { TextEditControlComponent } from '../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { SpinnerModule } from '../../directives/spinner/spinner.module';
import { ICarEditConfig, getCarEditConfig } from '../cars-tab/car-edit/car-edit.config';
import { ICarEditSchema, getCarEditSchema } from '../cars-tab/car-edit/car-edit.schema';

@Component({
  selector: 'check-please-car-create-dialog',
  imports: [
    FormsModule,
    TranslateModule,
    TextEditControlComponent,
    NumberEditControlComponent,
    TextAreaEditControlComponent,
    CommonModule,
    SpinnerModule,
    MatIconModule,
  ],
  templateUrl: './car-create-dialog.component.html',
  styleUrl: './car-create-dialog.component.scss',
})
export class CarCreateDialogComponent {
  public isBusy: boolean = false;

  public car: CarDto = {};

  public schema: ICarEditSchema = getCarEditSchema();
  public config: ICarEditConfig = getCarEditConfig();

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly pageSpinnerService: PageSpinnerService,
    private readonly carsService: CarsService,
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    public dialogRef: MatDialogRef<CarCreateDialogComponent>,
  ) {}

  public save(): void {
    this.setIsBusy(true);

    this.carsService
      .createCar(this.car)
      .subscribe({
        next: (carId: string) => {
          this.dialogRef.close({
            carId,
            carView: this.car,
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
