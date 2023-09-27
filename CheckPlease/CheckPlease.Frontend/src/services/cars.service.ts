import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateNewClient } from 'src/app/commands/client-commands';
import { CreateNewCar, UpdateMileageCommand } from 'src/app/commands/car-commands';
import { processInput } from './shared-functions';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private _httpService: HttpClient) { }

  getAllCars(): Observable<any[]> {
    return this._httpService.get<any[]>(`api/cars/all-cars`);
  }

  createNewCar(command: CreateNewCar): Observable<any> {
    command.carSign = processInput(command.carSign, true);
    command.vinCode = processInput(command.vinCode, true);
    return this._httpService.post<any>("api/cars", command);
  }

  updateMileage(command: UpdateMileageCommand): Observable<any> {
    console.log('4', command);
    return this._httpService.put<any>("api/cars/car", command);
  }
}
