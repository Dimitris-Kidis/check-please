import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainPageData } from 'src/models/main-page';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getMainPageData(date: string): Observable<MainPageData> {
    return this._httpService.post<MainPageData>(`api/repairs/main-page`, { date });
  }
}
