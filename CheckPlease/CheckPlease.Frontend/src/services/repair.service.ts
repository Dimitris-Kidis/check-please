import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRepairCommand, GetRepairsHistoryWithFilterCommand } from 'src/app/commands/repair-commands';
import { RepairHistoryWithFilterResponse } from 'src/models/search';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  public constructor(private _httpService: HttpClient) {}

  public createRepair(command: CreateRepairCommand): Observable<any> {
    return this._httpService.post<any>('api/repairs', command);
  }

  public getRepairHistoryWithFilter(
    command: GetRepairsHistoryWithFilterCommand = {
      isToday: false,
      isYesterday: false,
      date: null,
      carSign: '',
    },
  ): Observable<RepairHistoryWithFilterResponse[]> {
    return this._httpService.post<RepairHistoryWithFilterResponse[]>('api/repairs/list', command);
  }
}
