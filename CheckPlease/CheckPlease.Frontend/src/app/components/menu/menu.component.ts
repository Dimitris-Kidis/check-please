import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDatabase, faPlus, faSearch, faWrench } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerModule } from 'src/app/directives/spinner/spinner.module';
import { FilesService } from 'src/services/files.service';
import { DateConvertPipe } from '../../pipes/date-convert.pipe';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'check-please-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    LoadingComponent,
    TranslateModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    SpinnerModule,
    CommonModule,
  ],
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

  public changeColor(): void {
    // this.router.navigate(['not-found']);
  }
}
