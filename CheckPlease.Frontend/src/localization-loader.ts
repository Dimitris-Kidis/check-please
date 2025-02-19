import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalizationLoader implements TranslateLoader {
  public onTranslationLoaded = new EventEmitter<void>();
  public constructor(private http: HttpClient) {}

  public getTranslation(isoCode: string): Observable<any> {
    return forkJoin([this.http.get(`assets/locales/get/${isoCode}.json`)]).pipe(
      map(([translations]) => ({
        ...translations,
      })),
      tap(() => {
        this.onTranslationLoaded.emit();
      }),
    );
  }
}
