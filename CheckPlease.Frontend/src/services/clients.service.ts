import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDto } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getClient(id: string): Observable<ClientDto> {
    return this._httpService.get<ClientDto>(`api/clients/${id}`);
  }

  public createClient(command: ClientDto): Observable<any> {
    return this._httpService.post<any>(`api/clients`, command);
  }

  public updateClient(command: ClientDto): Observable<any> {
    return this._httpService.put<any>(`api/clients`, command);
  }

  public deleteClient(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/clients/${id}`);
  }

  public getClientsPaginated(query: any): Observable<ClientDto[]> {
    return this._httpService.post<ClientDto[]>(`api/clients/paginated`, query);
  }
}
