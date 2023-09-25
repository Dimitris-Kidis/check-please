import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateNewClient } from 'src/app/commands/client-commands';
import { CreateNewCar, UpdateMileageCommand } from 'src/app/commands/car-commands';
import { CreateRepairCommand } from 'src/app/commands/repair-commands';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  constructor(private _httpService: HttpClient) { }

  createRepair(command: CreateRepairCommand): Observable<any> {
    return this._httpService.post<any>("api/repairs", command);
  }
}
