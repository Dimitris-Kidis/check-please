import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
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

@Component({
  selector: 'check-please-repair-rows',
  templateUrl: './repair-rows.component.html',
  styleUrls: ['./repair-rows.component.scss'],
})
export class RepairRowsComponent implements OnInit, AfterViewInit {
  @Output() public passRepairData = new EventEmitter<CreateRepairCommand>();

  @Input() public newMileage: number;

  @ViewChild('mileageInput') public mileageInput: ElementRef;
  @ViewChild('inputs') public inputs: ElementRef;

  public options: string[] = ['Фильтр'];

  public myForm: FormGroup;

  public mileage: number;
  public problems: string = '';

  public faArrowLeft = faArrowLeft;
  public faDownload = faDownload;
  public faPlus = faPlus;
  public faTrashCan = faTrashCan;
  private isLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public constructor(
    private readonly cdr: ChangeDetectorRef,
    private clientsService: ClientsService,
    private fb: FormBuilder,
    private filesService: FilesService,
    private carService: CarsService,
  ) {}

  public ngOnInit(): void {
    this.myForm = this.fb.group({
      details: this.fb.array([this.createDetail()]),
    });
  }

  public ngAfterViewInit(): void {
    this.newMileage ? (this.mileage = this.newMileage) : this.mileageInput.nativeElement.focus();
  }

  // Inside your component class
  public onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.toLowerCase();
    // Set the filtered options for the specific form control
    this.detailsArray.at(index).get('detailName')!.setValue(value);
  }

  public filteredOptions(i: number): string[] {
    const inputValue = this.detailsArray.at(i).get('detailName')!.value;
    console.log(inputValue);
    return this.options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase));
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
