import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getCar(id: string): Observable<CarDto> {
    return this._httpService.get<CarDto>(`api/cars/${id}`);
  }

  public createCar(command: CarDto): Observable<any> {
    return this._httpService.post<any>(`api/cars`, command);
  }

  public updateCar(command: CarDto): Observable<any> {
    return this._httpService.put<any>(`api/cars`, command);
  }

  public deleteCar(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/cars/${id}`);
  }

  public getCarsPaginated(query: any): Observable<CarDto[]> {
    return this._httpService.post<CarDto[]>(`api/cars/paginated`, query);
  }
}
