import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarDto } from '../../../../models/car';
import { CarsService } from '../../../../services/cars.service';
import { PageSpinnerService } from '../../../common/components/page-spinner/page-spinner.service';
import { NumberEditControlComponent } from '../../../common/controls/number-edit-control/number-edit-control.component';
import { TextAreaEditControlComponent } from '../../../common/controls/text-area-edit-control/text-area-edit-control.component';
import { TextEditControlComponent } from '../../../common/controls/text-edit-control/text-edit-control.component';
import { DisplayErrorHelper } from '../../../common/helpers/display-error.helper';
import { SpinnerModule } from '../../../directives/spinner/spinner.module';
import { ICarEditConfig, getCarEditConfig } from './car-edit.config';
import { ICarEditSchema, getCarEditSchema } from './car-edit.schema';

@Component({
  selector: 'check-please-car-edit',
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
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.scss',
})
export class CarEditComponent implements OnInit {
  public isCreateMode: boolean = true;
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
  ) {}

  public ngOnInit(): void {
    this.car = this.route.snapshot.data['car'];

    if (this.car != null) {
      this.isCreateMode = false;
      return;
    }

    this.car = {};
  }

  public save(): void {
    this.setIsBusy(true);

    this.car.carSign = this.car.carSign?.toUpperCase();
    this.car.vinCode = this.car.vinCode?.toUpperCase();

    const action$ = this.isCreateMode ? this.carsService.createCar(this.car) : this.carsService.updateCar(this.car);

    action$
      .subscribe({
        next: () => {
          this.router.navigate(['cars']);
        },
        error: (err) => this.displayErrorHelper.displayErrorFunc(err),
      })
      .add(() => this.setIsBusy(false));
  }

  public cancel(): void {
    this.router.navigate(['cars']);
  }

  private setIsBusy(isBusy: boolean): void {
    this.isBusy = isBusy;
    this.pageSpinnerService.changeState(isBusy);
  }
}
