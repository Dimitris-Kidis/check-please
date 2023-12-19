import { animate, state, style, transition, trigger } from '@angular/animations';
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

enum DetailInputs {
  pricePerOne = 'pricePerOne',
  quantity = 'quantity',
  repairPrice = 'repairPrice',
}
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
  myForm: FormGroup;
  public mileage: number;
  public problems: string = '';

  private isLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Output() passRepairData = new EventEmitter<CreateRepairCommand>();

  @Input() newMileage: number;

  @ViewChild('mileageInput') mileageInput: ElementRef;
  @ViewChild('inputs') inputs: ElementRef;

  faArrowLeft = faArrowLeft;
  faDownload = faDownload;
  faPlus = faPlus;
  faTrashCan = faTrashCan;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private clientsService: ClientsService,
    private fb: FormBuilder,
    private filesService: FilesService,
    private carService: CarsService,
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      details: this.fb.array([this.createDetail()]),
    });
  }

  ngAfterViewInit(): void {
    this.newMileage ? (this.mileage = this.newMileage) : this.mileageInput.nativeElement.focus();
  }

  public passRepairInfo(): void {
    this.isLoadingDone$.next(false);

    const details: CreateDetailCommand[] = this.myForm.value.details;

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
    console.log('repair-info ' + this.mileage);
    const repairData: CreateRepairCommand = {
      mileage: !this.mileage || this.mileage === undefined ? 0 : this.mileage,
      problems: this.problems,
      details: details,
      carId: 0,
      clientId: 0,
    };
    this.passRepairData.emit(repairData);
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

  public get isLoaded$(): Observable<boolean> {
    return this.isLoadingDone$.asObservable();
  }

  public get details(): FormArray {
    return this.myForm.get('details') as FormArray;
  }

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

  public detailsPrice: number;

  updateTotals(index: number) {
    console.log(index);
  }

  get detailsArray(): FormArray {
    return this.myForm.get('details') as FormArray;
  }

  calculateTotal(index: number) {
    const detail = this.detailsArray.at(index);

    const pricePerOne = detail.get('pricePerOne')?.value;
    const quantity = detail.get('quantity')?.value;
    const repairPrice = detail.get('repairPrice')?.value;

    const subtotal = pricePerOne * quantity;
    const total = subtotal + repairPrice;

    detail.get('subtotal')?.setValue(subtotal);
    detail.get('total')?.setValue(total);
  }

  getSubtotal(index: number) {
    return this.detailsArray.at(index).get('subtotal')?.value;
  }

  getTotal(index: number) {
    return this.detailsArray.at(index).get('total')?.value;
  }
}
