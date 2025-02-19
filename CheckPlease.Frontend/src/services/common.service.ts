import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainPageDto } from '../models/main-page';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getMainPageInfo(): Observable<MainPageDto> {
    return this._httpService.get<MainPageDto>(`api/common`);
  }
}
