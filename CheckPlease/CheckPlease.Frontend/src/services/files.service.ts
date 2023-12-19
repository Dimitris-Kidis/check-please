import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  public constructor(private _httpService: HttpClient) {}

  public getDbExcelFile(): Observable<any> {
    return this._httpService.get<any[]>(`api/prints/excel`, {
      responseType: 'blob' as 'json',
    });
  }

  public getPdfFile(id: number): Observable<HttpResponse<Blob>> {
    return this._httpService.get<Blob>(`api/prints`, {
      params: { repairId: id },
      responseType: 'blob' as 'json',
      observe: 'response',
    });
  }

  // getPdfFile (id: number): Observable<HttpResponse<Blob>> {
  //   // указываем параметр observe: 'response' в опциях запроса
  //   return this.http.get<Blob> (this.url + id, { observe: 'response' });
  //   }
}
