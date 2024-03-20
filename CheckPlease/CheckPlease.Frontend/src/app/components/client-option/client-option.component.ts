import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  BlockScrollStrategy,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { faArrowLeft, faArrowRight, faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { CreateNewClient } from 'src/app/commands/client-commands';
import { ClientHistory, ClientSearchResult } from 'src/models/search';
import { ClientsService } from 'src/services/clients.service';
import { SearchService } from 'src/services/search.service';
import { SharedService } from 'src/services/shared-dropdown.service';
import { ClientUserInput } from '../interfaces/client.interface';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';
import { getClientOptionSchema, IClientOptionSchema } from './client-option.config';
import { getClientOptionConfig } from './client-option.schema';

@Component({
  selector: 'app-client-option',
  templateUrl: './client-option.component.html',
  styleUrls: ['./client-option.component.scss'],
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
export class ClientOptionComponent implements OnInit {
  @ViewChild('searchBox') public searchBox: ElementRef;
  @ViewChild('phoneInput') public phoneInput: ElementRef;
  @ViewChild('nameInput') public nameInput: ElementRef;
  @ViewChild('nextButton') public nextButton: ElementRef;
  @Output() public saveClientId = new EventEmitter<number>();

  public newClientSlider: string = 'out';
  public existingClientSlider: string = 'out';
  public searchString: string = '';
  public overlayRef: OverlayRef;
  public isWindowOpen: boolean = false;
  public results$: Observable<ClientSearchResult[]>;
  public config = getClientOptionConfig();

  public clientOption: ClientOptionData;

  // public fullName: string = '';
  // public phoneNumber: string = '';
  public currentClientId: number = 0;

  // public phoneString: string = '';
  // public jobString: string = '';
  // public nameString: string = '';

  public userInputData: ClientUserInput;
  // ; = {
  //   phoneNumber: '',
  //   fullName: '',
  // };

  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;
  public faPlus = faPlus;
  public faSearch = faSearch;
  public faClient = faUser;

  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isPersonInfoLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public constructor(
    private readonly overlay: Overlay,
    private readonly overlayPositionBuilder: OverlayPositionBuilder,
    private readonly injector: Injector,
    private readonly searchService: SearchService,
    private readonly sharedService: SharedService,
    private readonly cdr: ChangeDetectorRef,
    private readonly clientsService: ClientsService,
    private readonly toastrService: ToastrService,
  ) {
    this.resetInputs();
  }

  public get isCarInfoLoaded$(): Observable<boolean> {
    return this.isPersonInfoLoadingDone$.asObservable();
  }

  public get isLoaded$(): Observable<boolean> {
    return this.isLoadingDone$.asObservable();
  }

  @HostListener('document:keydown.enter', ['$event'])
  public enterPress(event: KeyboardEvent): void {
    this.checkForm(event);
    event.preventDefault();
  }

  public ngOnInit(): void {
    this.goSearch();
    this.clientOption = {
      dto: { clientName: '' },
      schema: getClientOptionSchema(),
    };
  }

  public passClientId(): void {
    this.saveClientId.emit(this.currentClientId);
  }

  public toggleNewClientForm(): void {
    if (this.newClientSlider === 'out') this.closeWindow('manual');
    this.newClientSlider = this.newClientSlider === 'out' ? 'in' : 'out';
    this.existingClientSlider = 'out';
    this.searchString = '';
    setTimeout(() => {
      if (this.newClientSlider === 'in') {
        this.searchString = '';
        this.nameInput.nativeElement.focus();
        // this.fullName = '';
        // this.phoneNumber = '';
        // for (const key in this.userInputData) {
        //   this.userInputData[key] = '';
        // }
        this.resetInputs();
        this.cdr.detectChanges();
      }
    });
  }

  public toggleExistingClientForm(): void {
    if (this.existingClientSlider === 'in') this.closeWindow('manual');
    this.existingClientSlider = this.existingClientSlider === 'out' ? 'in' : 'out';
    this.newClientSlider = 'out';

    setTimeout(() => {
      if (this.existingClientSlider === 'in') {
        this.resetInputs();
        this.searchBox.nativeElement.focus();
      }
    });
  }

  public search(term: string): void {
    this.searchTerm.next(term);
    this.cdr.detectChanges();
    if (this.searchString !== '') this.openWindow();
  }

  public resetInputs(): void {
    this.userInputData = {
      fullName: '',
      phoneNumber: '',
    };
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
      ...this.userInputData,
    };

    // newClient.fullName = this.clientOption.dto.clientName;

    this.clientsService
      .createNewClient(newClient)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => {
            this.isLoadingDone$.next(true);
            this.sharedService.displayErrors(err);
          }),
        ),
      )
      .subscribe((newClientId: number) => {
        this.currentClientId = newClientId;
        // console.log(newClientId, +newClientId);
        // this.currentClientId = +newClientId;
        this.nextButton.nativeElement.classList.remove('disabled');
        this.isLoadingDone$.next(true);
        this.newClientSlider = 'out';
        this.toastrService.success('Клиент успешно добавлен в базу данных!');
        this.cdr.detectChanges();
      });
  }

  public getCurrentClient(phoneNumber: string): void {
    this.searchService.searchClient(phoneNumber).subscribe((repairs: ClientHistory[]) => {
      console.log(repairs);
      this.userInputData.fullName = repairs[0].fullName;
      this.userInputData.phoneNumber = repairs[0].phoneNumber.replace(/<[^>]*>/g, '');
      this.currentClientId = repairs[0].id;
      this.nextButton.nativeElement.classList.remove('disabled');
      this.cdr.detectChanges();
      this.isPersonInfoLoadingDone$.next(true);
    });
  }
}

export interface ClientOptionData {
  dto: ClientOptionDto;
  schema: IClientOptionSchema;
}

export interface ClientOptionDto {
  clientName: string;
}
