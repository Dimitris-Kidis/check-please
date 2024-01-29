import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CarSearchResult, ClientSearchResult, RepairHistory, SearchResult } from 'src/models/search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public constructor(private readonly httpClient: HttpClient) {}

  public searchCar(carSign: string): Observable<SearchResult[]> {
    if (!carSign.trim()) {
      return of([]);
    }
    return this.httpClient.get<SearchResult[]>(`api/cars/find-cars?carSign=${carSign}`).pipe(
      map((response) => response.map((item) => ({ ...item, carSign: this.highlightCarSign(item, carSign) }))),
      catchError(() => throwError(() => console.error('Oops, something went wrong!'))),
    );
  }

  public searchClient(phoneNumber: string): Observable<SearchResult[]> {
    if (!phoneNumber.trim()) {
      return of([]);
    }
    return this.httpClient.get<SearchResult[]>(`api/clients/find-clients?phoneNumber=${phoneNumber}`).pipe(
      map((response) => response.map((item) => ({ ...item, phoneNumber: this.highlightClient(item, phoneNumber) }))),
      catchError(() => throwError(() => console.error('Oops, something went wrong!'))),
    );
  }

  public getRepairInfo(carSign: string): Observable<RepairHistory[]> {
    return this.httpClient
      .get<RepairHistory[]>(`api/clients/history?carSign=${carSign}`)
      .pipe(catchError((error: unknown) => throwError(() => error)));
  }

  private highlightCarSign(value: CarSearchResult, term: string): string {
    const regExp: RegExp = new RegExp(term, 'gi');
    return value.carSign.replace(regExp, (match) => `<b>${match}</b>`);
  }

  private highlightClient(value: ClientSearchResult, term: string): string {
    const regExp: RegExp = new RegExp(term, 'gi');
    return value.phoneNumber.replace(regExp, (match) => `<b>${match}</b>`);
  }
}
