import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private selectedItemSource = new BehaviorSubject<string>('');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public selectedItem$ = this.selectedItemSource.asObservable();

  public constructor(private readonly toastrService: ToastrService) {}

  public selectItem(item: string): void {
    this.selectedItemSource.next(item);
  }

  public displayErrors(error: HttpErrorResponse): void {
    const err = error.error.errors;
    for (const key in err) {
      this.toastrService.error(err[key], 'Ошибка');
    }
  }
}
