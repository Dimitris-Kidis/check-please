import { trigger, state, style, transition, animate } from '@angular/animations';
import { OverlayRef, Overlay, OverlayPositionBuilder, FlexibleConnectedPositionStrategy, BlockScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { faArrowLeft, faArrowRight, faCar, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateNewClient } from 'src/app/commands/client-commands';
import { ClientSearchResult, ClientHistory, RepairHistory, CarHistory } from 'src/models/search';
import { ClientsService } from 'src/services/clients.service';
import { SearchService } from 'src/services/search.service';
import { SharedService } from 'src/services/shared-dropdown.service';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';
import { CarsService } from 'src/services/cars.service';
import { CreateNewCar } from 'src/app/commands/car-commands';

@Component({
  selector: 'app-car-option',
  templateUrl: './car-option.component.html',
  styleUrls: ['./car-option.component.scss'],
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
export class CarOptionComponent implements OnInit{
  public newCarSlider: string = 'out';
  public existingCarSlider: string = 'out';
  public searchString: string = '';
  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public overlayRef: OverlayRef;
  public isWindowOpen: boolean = false;
  private isPersonInfoLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public results$: Observable<ClientSearchResult[]>;

  public carSign: string = '';
  public vinCode: string = '';
  public mileage: number;
  public year: number;
  public volume: string = '';
  public brand: string = '';
  public model: string = '';
  public currentCarId: number = 0;


  public carSignString: string = '';
  public vinCodeString: string = '';
  public volumeString: string = '';
  public modelString: string = '';
  public brandString: string = '';
  public mileageString: number = 0;
  public yearString: number = 0;

  @ViewChild('searchBox') searchBox: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;
  @Output() saveCarId = new EventEmitter<number>();

  @ViewChild('carSignInput') carSignInput: ElementRef;
  @ViewChild('vinCodeInput') vinCodeInput: ElementRef;
  // @ViewChild('carSignInput') carSignInput: ElementRef;
  // @ViewChild('carSignInput') carSignInput: ElementRef;
  // @ViewChild('carSignInput') carSignInput: ElementRef;
  // @ViewChild('carSignInput') carSignInput: ElementRef;
  // @ViewChild('carSignInput') carSignInput: ElementRef;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faPlus = faPlus;
  faSearch = faSearch;
  faCar = faCar;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private injector: Injector,
    private searchService: SearchService,
    private sharedService: SharedService,
    private readonly cdr: ChangeDetectorRef,
    private carsService: CarsService
  ) {

  }

  ngOnInit(): void {
    this.goSearch();
  }

  public passCarId(): void {
    this.saveCarId.emit(this.currentCarId);
  }

  public toggleNewCarForm(): void {
    if (this.newCarSlider === 'out' ) this.closeWindow('manual');
    this.newCarSlider = this.newCarSlider === 'out' ? 'in' : 'out';
    this.existingCarSlider = 'out';
    this.searchString = ''
    setTimeout(() => {
      if (this.newCarSlider === 'in') {
        this.searchString = '';
        this.carSignInput.nativeElement.focus();
        this.carSign = '';
        this.vinCode = '';
        this.mileage = 0;
        this.year = 0;
        this.volume = '';
        this.brand = '';
        this.model = '';
        this.cdr.detectChanges();
      }
    });
  }

  public toggleExistingCarForm(): void {
    if (this.existingCarSlider === 'in' ) this.closeWindow('manual');
    this.existingCarSlider = this.existingCarSlider === 'out' ? 'in' : 'out';
    this.newCarSlider = 'out';
    
    setTimeout(() => {
      if (this.existingCarSlider === 'in') {
        this.carSignString = '';
        this.vinCodeString = '';
        this.modelString = '';
        this.volumeString = '';
        this.brandString = '';
        this.mileage = 0;
        this.year = 0;
        this.searchBox.nativeElement.focus();
      }
    });
  }

  public search(term: string): void {
    this.searchTerm.next(term);
    this.cdr.detectChanges();
    if (this.searchString !== '') this.openWindow();
  }

  public checkForm(event: Event): boolean {
    if (this.currentCarId === 0) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    } else {
      this.closeWindow('manual');
      this.passCarId();
      this.cdr.detectChanges();
      return true;
    }
  }
  
  public openWindow(): void {
    if (this.isWindowOpen) return;

    this.isWindowOpen = true;
    const positionStrategy: FlexibleConnectedPositionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.searchBox)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 0,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    const scrollStrategy: BlockScrollStrategy = this.overlay.scrollStrategies.block();
    const overlayRef: OverlayRef = this.overlay.create({ positionStrategy, scrollStrategy });

    const injector: Injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: 'SEARCH_TERM',
          useValue: { term: this.searchTerm, isOpen: true, type: 'Car' },
        },
      ],
    });
    
    overlayRef.attach(new ComponentPortal(SearchDropdownComponent, null, injector));
    this.overlayRef = overlayRef;
  }


  public closeWindow(type: string = 'auto'): void {
    if (!this.overlayRef) return;

    if (type === 'auto') {
      this.overlayRef.backdropClick().subscribe(() => {
        this.overlayRef.detach();
        this.overlayRef.dispose();
        this.cdr.detectChanges();
        this.isWindowOpen = false;
      });
    } else if (type === 'manual') {
      this.isWindowOpen = false;
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.cdr.detectChanges();
    }
    
  }

  public goSearch(): void {
    this.sharedService.selectedItem$.subscribe((carSign: string) => {
      if (this.overlayRef && this.isWindowOpen) {
        this.overlayRef.detach();
        this.isWindowOpen = false;
        this.getCurrentCar(carSign);
      }
    });
  }

  public createNewCar(): void {
    this.isLoadingDone$.next(false);
    const newCar: CreateNewCar = {
      carSign: this.carSignString,
      ...(this.vinCode === '' ? {} : {vinCode: `${this.vinCodeString}`}),
      ...(this.volume === '' ? {} : {volume: `${this.volumeString}`}),
      ...(this.brand === '' ? {} : {brand: `${this.brandString}`}),
      ...(this.model === '' ? {} : {model: `${this.modelString}`}),
      ...(this.mileage === 0 ? {} : {mileage: this.mileageString}),
      ...(this.year === 0 ? {} : {year: this.mileageString}),
    };

    this.carsService.createNewCar(newCar).subscribe(
      (newCarId: number) => {
        this.currentCarId = +newCarId;
        this.carSign = this.carSignString;
        this.vinCode = this.vinCodeString;
        this.mileage = this.mileageString;
        this.year = this.yearString;
        this.volume = this.volumeString;
        this.brand = this.brandString;
        this.model = this.modelString;
        this.nextButton.nativeElement.classList.remove('disabled');
        this.newCarSlider = 'out';
        this.isLoadingDone$.next(true);
        this.cdr.detectChanges();
      }
    );
  }

  public getCurrentCar(carSign: string): void {
    this.searchService.searchCar(carSign).subscribe(
      (repairs: CarHistory[]) => {
        this.carSign = repairs[0].carSign.replace(/<[^>]*>/g, '');
        this.vinCode = repairs[0].vinCode ?? '';
        this.mileage = repairs[0].mileage ?? 0;
        this.year = repairs[0].year ?? 0;
        this.volume = repairs[0].volume ?? '';
        this.brand = repairs[0].brand ?? '';
        this.model = repairs[0].model ?? '';
        this.currentCarId = repairs[0].id;
        this.nextButton.nativeElement.classList.remove('disabled');
        this.cdr.detectChanges();
        this.isPersonInfoLoadingDone$.next(true);
      }
    );
  }

  public get isCarInfoLoaded$(): Observable<boolean> {
    return this.isPersonInfoLoadingDone$.asObservable();
  }

  public get isLoaded$(): Observable<boolean> {
    return this.isLoadingDone$.asObservable();
  }
}
