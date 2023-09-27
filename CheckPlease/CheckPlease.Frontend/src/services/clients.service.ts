import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateNewClient } from 'src/app/commands/client-commands';
import { processInput } from './shared-functions';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private _httpService: HttpClient) { }

  createNewClient(command: CreateNewClient): Observable<any> {
    command.fullName = processInput(command.fullName);
    command.phoneNumber = processInput(command.phoneNumber);
    return this._httpService.post<any>("api/clients", command);
  }
}
