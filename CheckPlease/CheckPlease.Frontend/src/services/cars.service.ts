import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateNewCar, UpdateMileageCommand } from 'src/app/commands/car-commands';
import { processInput } from './shared-functions';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getAllCars(): Observable<any[]> {
    return this._httpService.get<any[]>(`api/cars/all-cars`);
  }

  public createNewCar(command: CreateNewCar): Observable<any> {
    command.carSign = processInput(command.carSign, true);
    command.vinCode ? (command.vinCode = processInput(command.vinCode, true)) : null;
    return this._httpService.post<any>('api/cars', command);
  }

  public updateMileage(command: UpdateMileageCommand): Observable<any> {
    return this._httpService.put<any>('api/cars/car', command);
  }
}
