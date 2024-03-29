import {
  BlockScrollStrategy,
  CdkOverlayOrigin,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarSearchResult, RepairHistory } from 'src/models/search';
import { FilesService } from 'src/services/files.service';
import { SearchService } from 'src/services/search.service';
import { SharedService } from 'src/services/shared-dropdown.service';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') public searchBox: HTMLElement;
  @ViewChild('searchBox') public input: ElementRef;
  @ViewChild(CdkOverlayOrigin, { static: false }) public overlayOrigin: CdkOverlayOrigin;

  public results$: Observable<CarSearchResult[]>;
  public currentRepairs: RepairHistory[];
  public searchString: string = '';
  public overlayRef: OverlayRef;
  public isWindowOpen: boolean = false;

  public faArrow = faArrowLeft;
  public faDownload = faDownload;

  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isCarInfoLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public constructor(
    private readonly searchService: SearchService,
    private readonly overlay: Overlay,
    private readonly overlayPositionBuilder: OverlayPositionBuilder,
    private readonly injector: Injector,
    private readonly sharedService: SharedService,
    private readonly filesService: FilesService,
  ) {}

  public get isCarInfoLoaded$(): Observable<boolean> {
    return this.isCarInfoLoadingDone$.asObservable();
  }

  public ngOnInit(): void {
    this.goSearch();
  }

  public ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  public search(term: string): void {
    this.searchTerm.next(term);
    if (this.searchString !== '') this.openWindow();
  }

  public downloadPdf(id: number): void {
    this.filesService.getPdfFile(id).subscribe((response: HttpResponse<Blob>) => {
      const fileName = response.headers.get('content-disposition')!.split(';')[1].split('=')[1].replace(/"/g, '');
      const a: HTMLAnchorElement = document.createElement('a');
      const data: Blob = new Blob([response.body!], { type: 'application/pdf' });
      const downloadURL: string = window.URL.createObjectURL(data);
      a.href = downloadURL;
      a.download = fileName;
      a.click();
    });
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

  public closeWindow(): void {
    if (this.overlayRef) {
      this.overlayRef.backdropClick().subscribe(() => {
        this.overlayRef.detach();
        this.overlayRef.dispose();
      });
    }
  }

  public closeWindowMenu(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
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

  public getCurrentCar(carSign: string): void {
    this.searchService.getRepairInfo(carSign).subscribe((repairs: RepairHistory[]) => {
      this.currentRepairs = repairs;
      this.isCarInfoLoadingDone$.next(true);
    });
  }
}
