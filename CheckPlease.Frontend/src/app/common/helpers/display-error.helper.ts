import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorFunction, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../../../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class DisplayErrorHelper {
  public constructor(private readonly messageService: MessageService) {}

  public displayErrorFunc = (response: HttpErrorResponse): void => {
    if (response.message && response.error.message) {
      this.messageService.showError(response.error.message);
    } else {
      this.messageService.showErrorByCode('COMMON.GENERIC.ERROR');
    }
  };

  public handleHttpError<T>(action?: (error: HttpErrorResponse) => void): OperatorFunction<T, T> {
    return catchError((error: HttpErrorResponse) => {
      this.displayErrorFunc(error);
      action?.(error);

      return throwError(() => error);
    });
  }

  private isProblemDetails(error: any): error is ProblemDetails {
    console.log(error);
    return error && (error.title || error.errors || error.error);
  }
}

export interface ProblemDetails {
  title?: string;
  errors?: Array<string>;
}
