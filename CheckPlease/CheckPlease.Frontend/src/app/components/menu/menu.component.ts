import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDatabase, faPlus, faSearch, faWrench } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilesService } from 'src/services/files.service';
import { DateConvertPipe } from '../../pipes/date-convert.pipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public downloadLink: string = '';

  public faPlus = faPlus;
  public faWrench = faWrench;
  public faSearch = faSearch;
  public faDatabase = faDatabase;

  private isLoadingDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public constructor(private readonly filesService: FilesService) {
    library.add(faPlus);
  }

  public get isLoaded$(): Observable<boolean> {
    return this.isLoadingDone$.asObservable();
  }

  public startDownload(): void {
    this.isLoadingDone$.next(false);
    this.filesService.getDbExcelFile().subscribe((file: Blob) => {
      this.isLoadingDone$.next(true);
      const a: HTMLAnchorElement = document.createElement('a');
      const data = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadURL: string = window.URL.createObjectURL(data);
      a.href = downloadURL;
      const pipe: DateConvertPipe = new DateConvertPipe();
      a.download = `${pipe.transform(new Date().toString())}.xlsx`;
      a.click();
    });
  }
}
