import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateNewClient } from 'src/app/commands/client-commands';
import { processInput } from './shared-functions';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public createNewClient(command: CreateNewClient): Observable<any> {
    command.fullName = processInput(command.fullName);
    command.phoneNumber = processInput(command.phoneNumber);
    return this._httpService.post<any>('api/clients', command);
  }
}
