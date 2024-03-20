import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { faArrowLeft, faDownload, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateDetailCommand, CreateRepairCommand } from 'src/app/commands/repair-commands';
import { CarsService } from 'src/services/cars.service';
import { ClientsService } from 'src/services/clients.service';
import { FilesService } from 'src/services/files.service';
import { RepairRowsComponent } from '../repair-rows/repair-rows.component';

@Component({
  selector: 'app-repair-info',
  templateUrl: './repair-info.component.html',
  styleUrls: ['./repair-info.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ 'overflow-y': 'hidden', height: '*' })),
      state('out', style({ 'overflow-y': 'hidden', height: '0px' })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairInfoComponent implements OnInit, AfterViewInit {
  @Output() public passRepairData = new EventEmitter<CreateRepairCommand>();

  @Input() public newMileage: number;

  @ViewChild(RepairRowsComponent) public rows: RepairRowsComponent;
  @ViewChild('mileageInput') public mileageInput: ElementRef;
  @ViewChild('inputs') public inputs: ElementRef;

  public myForm: FormGroup;
  public mileage: number;
  public problems: string = '';
  public detailsPrice: number;

  public faArrowLeft = faArrowLeft;
  public faDownload = faDownload;
  public faPlus = faPlus;
  public faTrashCan = faTrashCan;

  private isLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly clientsService: ClientsService,
    private readonly fb: FormBuilder,
    private readonly filesService: FilesService,
    private readonly carService: CarsService,
  ) {}

  public get isLoaded$(): Observable<boolean> {
    return this.isLoadingDone$.asObservable();
  }

  public get details(): FormArray {
    return this.myForm.get('details') as FormArray;
  }

  public get detailsArray(): FormArray {
    return this.myForm.get('details') as FormArray;
  }

  public ngOnInit(): void {
    this.myForm = this.fb.group({
      details: this.fb.array([this.createDetail()]),
    });
  }

  public ngAfterViewInit(): void {
    this.newMileage ? (this.mileage = this.newMileage) : this.mileageInput.nativeElement.focus();
    this.cdr.detectChanges();
  }

  public passRepairInfo(): void {
    this.isLoadingDone$.next(false);

    // const details: CreateDetailCommand[] = this.myForm.value.details;
    const details: CreateDetailCommand[] = this.rows.myForm.value.details;

    console.log('DET', details);
    details.forEach((detail) => {
      // for (const input in DetailInputs) {
      if (!detail['pricePerOne']) {
        detail['pricePerOne'] = 0;
      }
      if (!detail['quantity']) {
        detail['quantity'] = 0;
      }
      if (!detail['repairPrice']) {
        detail['repairPrice'] = 0;
      }
      // }
    });
    // if (!details[length].pricePerOne || !details[length].quantity || !details[length].repairPrice) {
    //   const length = details.length - 1;
    //   details[length].pricePerOne =
    //     !this.myForm.value.details[length].pricePerOne ||
    //     this.myForm.value.details[length].pricePerOne === undefined ?
    //     0 :
    //     this.myForm.value.details[length].pricePerOne;
    //   details[length].quantity =
    //     !this.myForm.value.details[length].quantity ||
    //     this.myForm.value.details[length].quantity === undefined ?
    //     0 :
    //     this.myForm.value.details[length].quantity;
    //   details[length].repairPrice =
    //     !this.myForm.value.details[length].repairPrice ||
    //     this.myForm.value.details[length].repairPrice === undefined ?
    //     0 :
    //     this.myForm.value.details[length].repairPrice;
    // }
    const repairData: CreateRepairCommand = {
      mileage: !this.mileage || this.mileage === undefined ? 0 : this.mileage,
      problems: this.problems,
      details: details,
      carId: 0,
      clientId: 0,
    };
    console.log(repairData);
    this.passRepairData.emit(repairData);
  }

  public drop(event: CdkDragDrop<string[]>): void {
    const currentIndex = event.currentIndex;
    const previousIndex = event.previousIndex;

    if (currentIndex !== previousIndex) {
      // this.details.controls = this.moveItemInFormArray(this.details.controls, previousIndex, currentIndex);
      const controls = this.details.controls;
      const controlToMove = controls[previousIndex];

      controls.splice(previousIndex, 1);
      controls.splice(currentIndex, 0, controlToMove);

      this.myForm.setControl('details', this.fb.array(controls));
    }

    // const prevIndex = this.details.controls[event.item.data];
    // moveItemInArray(this.details.controls, prevIndex, event.currentIndex);
  }

  public moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): FormArray {
    const controlToMove = formArray.at(fromIndex);
    formArray.removeAt(fromIndex);
    formArray.insert(toIndex, controlToMove);

    return formArray;
  }

  public stopLoading(): void {
    this.isLoadingDone$.next(true);
  }

  // public downloadPdf(id: number): void {
  //   this.filesService.getPdfFile(id).subscribe(
  //     (file: Blob) => {
  //       const a: HTMLAnchorElement = document.createElement('a');
  //       const data: Blob = new Blob([file], { type: 'application/pdf' });
  //       const downloadURL: string = window.URL.createObjectURL(data);
  //       a.href = downloadURL;
  //       let pipe: DateConvertPipe = new DateConvertPipe();
  //       a.download = `${pipe.transform(new Date().toString())}.pdf`;
  //       a.click();
  //     }
  //   )
  // }

  public addDetail(): void {
    this.details.push(this.createDetail());

    console.log(this.inputs.nativeElement);
    setTimeout(() => {
      console.log(this.inputs.nativeElement);
    }, 2100);
    // this.details.value[this.details.length - 1].
  }

  public removeControl(index: number): void {
    if (this.details.length > 1) this.details.removeAt(index);
  }

  public createDetail(): FormGroup {
    return this.fb.group({
      detailName: '',
      pricePerOne: '',
      quantity: '',
      repairPrice: '',
      subtotal: '',
      total: '',
    });
  }

  public calculateTotal(index: number): void {
    const detail = this.detailsArray.at(index);

    const pricePerOne = detail.get('pricePerOne')?.value;
    const quantity = detail.get('quantity')?.value;
    const repairPrice = detail.get('repairPrice')?.value;

    const subtotal = pricePerOne * quantity;
    const total = subtotal + repairPrice;

    detail.get('subtotal')?.setValue(subtotal);
    detail.get('total')?.setValue(total);
  }

  public getSubtotal(index: number): number {
    return this.detailsArray.at(index).get('subtotal')?.value;
  }

  public getTotal(index: number): number {
    return this.detailsArray.at(index).get('total')?.value;
  }
}
