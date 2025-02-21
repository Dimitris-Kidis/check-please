import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DetailDto } from '../../../models/repair';
import { RepairsService } from '../../../services/repairs.service';
import { CONTROL_CONTAINER_PROVIDER } from '../../common/controls/control-container-provider';
import { NumberEditControlComponent } from '../../common/controls/number-edit-control/number-edit-control.component';
import {
  IDetailOption,
  PredefinedTextEditControlComponent,
} from '../../common/controls/predefined-text-edit-control/predefined-text-edit-control.component';
import { TypeSafeMatCellDefDirective } from '../../common/directives/type-safe-mat-cell-def.directive';
import { DisplayErrorHelper } from '../../common/helpers/display-error.helper';
import { DefaultValuePipe } from '../../pipes/default-value.pipe';
import { SharedModule } from '../../shared/shared.module';
import { getRepairTableEditConfig, IRepairTableEditConfig } from './repair-table.config';
import { getRepairTableEditSchema, IRepairTableEditSchema } from './repair-table.schema';

type DataWithSchema = {
  data: DetailDto;
  schema: IRepairTableEditSchema;
};

@Component({
  selector: 'check-please-repair-table',
  imports: [
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    DefaultValuePipe,
    TypeSafeMatCellDefDirective,
    NumberEditControlComponent,
    DragDropModule,
    DefaultValuePipe,
    NumberEditControlComponent,
    TypeSafeMatCellDefDirective,
    PredefinedTextEditControlComponent,
  ],
  templateUrl: './repair-table.component.html',
  styleUrl: './repair-table.component.scss',
  viewProviders: [CONTROL_CONTAINER_PROVIDER],
})
export class RepairTableComponent implements OnInit {
  @Output() public dataSaved = new EventEmitter<void>();
  @ViewChild(MatTable) public table?: MatTable<DataWithSchema>;

  @Input() public isEditMode: boolean = true;
  @Input() public hasToDisplayTotalRow: boolean = true;
  @Input() public details: DetailDto[] = [];
  @Input() public options: IDetailOption[] = [];

  @Output() public detailsChange = new EventEmitter<DetailDto[]>();

  public config: IRepairTableEditConfig = getRepairTableEditConfig();
  public schema: IRepairTableEditSchema = getRepairTableEditSchema();

  public readonly displayedColumns: string[] = [
    'detail-name',
    'price-per-one',
    'quantity',
    'details-price',
    'repair-price',
    'total-price',
    'actions',
  ];

  public dynamicRepairDetails: DataWithSchema[] = [];

  public constructor(
    private readonly displayErrorHelper: DisplayErrorHelper,
    private readonly repairsService: RepairsService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.dynamicRepairDetails = this.details.map((detail) => ({
      data: detail,
      schema: getRepairTableEditSchema(),
    }));
  }

  public save(): void {
    this.removeEmptyRows();
  }

  public removeEmptyRows(): void {
    const nonEmpty = this.dynamicRepairDetails.filter((row) => !this.isRowEmpty(row.data));

    this.dynamicRepairDetails = nonEmpty;
  }

  public isRowEmpty(row: DetailDto): boolean {
    const fieldsToCheck = Object.assign({}, row, { id: undefined, tenancyId: undefined });

    return Object.values(fieldsToCheck).every((value) => value === null || value === undefined || value === '');
  }

  public add(): void {
    this.dynamicRepairDetails.push({ data: {}, schema: getRepairTableEditSchema() });
    this.table?.renderRows();
    this.emit();
  }

  public emit(): void {
    this.details = this.dynamicRepairDetails.map((item) => item.data);
    this.detailsChange.emit(this.details);
  }

  public remove(index: number): void {
    this.dynamicRepairDetails.splice(index, 1);
    this.table?.renderRows();
    this.emit();
  }

  public calculatePrices(row: DataWithSchema): void {
    const data = row.data;
    data.detailsPrice = (data.pricePerOne ?? 0) * (data.quantity ?? 0);
    data.totalPrice = (data.detailsPrice ?? 0) + (data.repairPrice ?? 0);

    this.calculateTotalSum();
  }

  public calculateTotalSum(): number {
    this.emit();

    return this.dynamicRepairDetails.reduce((sum, row) => {
      return sum + (row.data.totalPrice || 0);
    }, 0);
  }

  // public onDrop(event: CdkDragDrop<DataWithSchema[]>): void {
  //   moveItemInArray(this.dynamicRepairDetails, event.previousIndex, event.currentIndex);
  //   this.table?.renderRows();
  // } REFACTOR

  public onDrop(event: any): void {
    const dropEvent = event as CdkDragDrop<DataWithSchema[]>;

    moveItemInArray(this.dynamicRepairDetails, dropEvent.previousIndex, dropEvent.currentIndex);
    this.table?.renderRows();
  }
}
