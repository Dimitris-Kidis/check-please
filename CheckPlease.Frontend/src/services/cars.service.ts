import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../models/car';
import { PaginatorResult, SearchPaginatedRequest } from '../models/pagination';
import { RepairDto } from '../models/repair';

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

  public getCarsPaginated(query: SearchPaginatedRequest): Observable<PaginatorResult<CarDto>> {
    return this._httpService.post<PaginatorResult<CarDto>>(`api/cars/paginated`, query);
  }

  public getCarHistory(id: string): Observable<RepairDto[]> {
    return this._httpService.get<RepairDto[]>(`api/cars/history/${id}`);
  }

  public getSuggestionsForClient(phoneNumber: string): Observable<CarDto[]> {
    return this._httpService.get<CarDto[]>(`api/cars/suggestions/${phoneNumber}`);
  }
}
