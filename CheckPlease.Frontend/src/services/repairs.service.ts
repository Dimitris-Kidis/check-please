import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatorResult, SearchPaginatedRequest } from '../models/pagination';
import { RepairDto } from '../models/repair';

@Injectable({
  providedIn: 'root',
})
export class RepairsService {
  public constructor(private readonly _httpService: HttpClient) {}

  public getRepair(id: string): Observable<RepairDto> {
    return this._httpService.get<RepairDto>(`api/repairs/${id}`);
  }

  public createRepair(command: RepairDto): Observable<any> {
    return this._httpService.post<any>(`api/repairs`, command);
  }

  public updateRepair(command: RepairDto): Observable<any> {
    return this._httpService.put<any>(`api/repairs`, command);
  }

  public deleteRepair(id: string): Observable<any> {
    return this._httpService.delete<any>(`api/repairs/${id}`);
  }

  public getRepairsPaginated(query: SearchPaginatedRequest): Observable<PaginatorResult<RepairDto>> {
    return this._httpService.post<PaginatorResult<RepairDto>>(`api/repairs/paginated`, query);
  }

  // public getCheckPrint(id: string): Observable<Blob> {
  //   return this._httpService.get(`api/repairs/print/${id}`, { responseType: 'blob' });
  // }

  public getCheckPrint(id: string): Observable<HttpResponse<Blob>> {
    return this._httpService.get<Blob>(`api/repairs/print`, {
      params: { repairId: id },
      responseType: 'blob' as 'json',
      observe: 'response',
    });
  }

  // public downloadPdf(id: number): void {
  //   this.filesService.getPdfFile(id).subscribe((response: HttpResponse<Blob>) => {
  //     const fileName = response.headers.get('content-disposition')!.split(';')[1].split('=')[1].replace(/"/g, '');
  //     const a: HTMLAnchorElement = document.createElement('a');
  //     const data: Blob = new Blob([response.body!], { type: 'application/pdf' });
  //     const downloadURL: string = window.URL.createObjectURL(data);
  //     a.href = downloadURL;
  //     a.download = fileName;
  //     a.click();
  //     this.repairInfoComponent.stopLoading();
  //   });
  // }
}
