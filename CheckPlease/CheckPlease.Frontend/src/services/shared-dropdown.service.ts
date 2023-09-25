import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { CarSearchResult, RepairHistory } from 'src/models/search';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    private selectedItemSource = new BehaviorSubject<string>('');
    selectedItem$ = this.selectedItemSource.asObservable();

    selectItem(item: string) {
        this.selectedItemSource.next(item);
    }
}