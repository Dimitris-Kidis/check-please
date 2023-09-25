import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private _httpService: HttpClient) { }

  getDbExcelFile(): Observable<any> {
    return this._httpService.get<any[]>(`api/prints/excel`, {
      responseType: 'blob' as 'json'
    });
  }

  getPdfFile(id: number): Observable<any> {
    return this._httpService.get<any[]>(`api/prints`, {
      params: {repairId: id},
      responseType: 'blob' as 'json'
    });
  }
}
