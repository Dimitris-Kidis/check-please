import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { CarSearchResult, RepairHistory } from 'src/models/search';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    private selectedItemSource = new BehaviorSubject<string>('');
    selectedItem$ = this.selectedItemSource.asObservable();

    constructor(private toastrService: ToastrService) {
    }

    selectItem(item: string) {
        this.selectedItemSource.next(item);
    }

    public displayErrors(error: HttpErrorResponse) {
      const err = error.error.errors;
      for (const key in err) {
        this.toastrService.error(err[key], 'Ошибка')
      }
    }
}