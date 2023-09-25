import { animate, state, style, transition, trigger } from '@angular/animations';
import { BlockScrollStrategy, CloseScrollStrategy, FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { faArrowLeft, faArrowRight, faList, faPerson, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';
import { SearchService } from 'src/services/search.service';
import { SharedService } from 'src/services/shared-dropdown.service';
import { CarSearchResult, ClientHistory, ClientSearchResult, RepairHistory } from 'src/models/search';
import { ClientsService } from 'src/services/clients.service';
import { CreateNewClient } from 'src/app/commands/client-commands';

@Component({
  selector: 'app-client-option',
  templateUrl: './client-option.component.html',
  styleUrls: ['./client-option.component.scss'],
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
export class ClientOptionComponent implements OnInit{
  public newClientSlider: string = 'out';
  public existingClientSlider: string = 'out';
  public searchString: string = '';
  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public overlayRef: OverlayRef;
  public isWindowOpen: boolean = false;
  private isPersonInfoLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public results$: Observable<ClientSearchResult[]>;

  public fullName: string = '';
  public phoneNumber: string = '';
  public currentClientId: number = 0;


  public phoneString: string = '';
  public jobString: string = '';
  public nameString: string = '';

  @ViewChild('searchBox') searchBox: ElementRef;
  @ViewChild('phoneInput') phoneInput: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;
  @Output() saveClientId = new EventEmitter<number>();

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faPlus = faPlus;
  faSearch = faSearch;
  faClient = faUser;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private injector: Injector,
    private searchService: SearchService,
    private sharedService: SharedService,
    private readonly cdr: ChangeDetectorRef,
    private clientsService: ClientsService
  ) {

  }

  ngOnInit(): void {
    this.goSearch();
  }

  public passClientId(): void {
    this.saveClientId.emit(this.currentClientId);
  }

  public toggleNewClientForm(): void {
    if (this.newClientSlider === 'out' ) this.closeWindow('manual');
    this.newClientSlider = this.newClientSlider === 'out' ? 'in' : 'out';
    this.existingClientSlider = 'out';
    this.searchString = ''
    setTimeout(() => {
      if (this.newClientSlider === 'in') {
        this.searchString = '';
        this.phoneInput.nativeElement.focus();
        this.fullName = '';
        this.phoneNumber = '';
        this.cdr.detectChanges();
      }
    });
  }

  public toggleExistingClientForm(): void {
    if (this.existingClientSlider === 'in' ) this.closeWindow('manual');
    this.existingClientSlider = this.existingClientSlider === 'out' ? 'in' : 'out';
    this.newClientSlider = 'out';
    
    setTimeout(() => {
      if (this.existingClientSlider === 'in') {
        this.jobString = '';
        this.phoneString = '';
        this.nameString = '';
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
    if (this.currentClientId === 0) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    } else {
      this.closeWindow('manual');
      this.passClientId();
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
          useValue: { term: this.searchTerm, isOpen: true, type: 'Client' },
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
    this.sharedService.selectedItem$.subscribe((phoneNumber: string) => {
      if (this.overlayRef && this.isWindowOpen) {
        this.overlayRef.detach();
        this.isWindowOpen = false;
        this.getCurrentClient(phoneNumber);
      }
    });
  }

  public createNewClient(): void {
    this.isLoadingDone$.next(false);
    const newClient: CreateNewClient = {
      fullName: this.nameString,
      phoneNumber: `${this.phoneString}`,
      ...(this.jobString === '' ? {} : {jobTitle: this.jobString})
    };

    this.clientsService.createNewClient(newClient).subscribe(
      (newClientId: number) => {
        this.currentClientId = +newClientId;
        this.phoneNumber = this.phoneString;
        this.fullName = this.nameString;
        this.nextButton.nativeElement.classList.remove('disabled');
        this.isLoadingDone$.next(true);
        this.newClientSlider = 'out';
        this.cdr.detectChanges();
      }
    );
  }

  public getCurrentClient(phoneNumber: string): void {
    this.searchService.searchClient(phoneNumber).subscribe(
      (repairs: ClientHistory[]) => {
        this.fullName = repairs[0].fullName;
        this.phoneNumber = repairs[0].phoneNumber.replace(/<[^>]*>/g, '');
        this.currentClientId = repairs[0].id;
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
