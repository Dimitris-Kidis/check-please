import { trigger, state, style, transition, animate } from '@angular/animations';
import { OverlayRef, Overlay, OverlayPositionBuilder, FlexibleConnectedPositionStrategy, BlockScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { faArrowLeft, faArrowRight, faDownload, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { CreateNewClient } from 'src/app/commands/client-commands';
import { ClientSearchResult, ClientHistory } from 'src/models/search';
import { ClientsService } from 'src/services/clients.service';
import { SearchService } from 'src/services/search.service';
import { SharedService } from 'src/services/shared-dropdown.service';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FilesService } from 'src/services/files.service';
import { DateConvertPipe } from 'src/app/pipes/date-convert.pipe';
import { CarsService } from 'src/services/cars.service';
import { UpdateMileageCommand } from 'src/app/commands/car-commands';
import { CreateDetailCommand, CreateRepairCommand } from 'src/app/commands/repair-commands';

@Component({
  selector: 'app-repair-info',
  templateUrl: './repair-info.component.html',
  styleUrls: ['./repair-info.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ 'overflow-y': 'hidden', 'height': '*'})),
      state('out', style({ 'overflow-y': 'hidden', 'height': '0px'})),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepairInfoComponent implements OnInit, AfterViewInit{
  myForm: FormGroup;
  public mileage: number;
  public problems: string = '';

  private isLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Output() passRepairData = new EventEmitter<CreateRepairCommand>();

  
  @ViewChild('mileageInput') mileageInput: ElementRef;

  faArrowLeft = faArrowLeft;
  faDownload = faDownload;
  faPlus = faPlus;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private clientsService: ClientsService,
    private fb: FormBuilder,
    private filesService: FilesService,
    private carService: CarsService,
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      details: this.fb.array([ this.createDetail() ])
    });
  }

  ngAfterViewInit(): void {
    this.mileageInput.nativeElement.focus();
  }

  public passRepairInfo(): void {
    this.isLoadingDone$.next(false);
    let details: CreateDetailCommand[] = this.myForm.value.details;
    console.log(details);
    const repairData: CreateRepairCommand = {
      mileage: this.mileage,
      problems: this.problems,
      details: details,
      carId: 0,
      clientId: 0
    }
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
  }

  public createDetail(): FormGroup {
    return this.fb.group({
      detailName: '',
      pricePerOne: '',
      quantity: '',
      repairPrice: ''
    });
  }

}

