import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorFunction, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../../../services/message.service';
import { ProblemDetails } from '../../auto-generated/model/problem-details';

@Injectable({
  providedIn: 'root',
})
export class DisplayErrorHelper {
  public constructor(private readonly messageService: MessageService) {}

  public displayErrorFunc = (response: HttpErrorResponse): void => {
    if (this.isProblemDetails(response.error)) {
      if (response.error.errors && response.error.errors.length > 0) {
        response.error.errors.forEach((message) => {
          this.messageService.showError(message);
        });
      } else {
        this.messageService.showError(response.error.title ?? 'COMMON.GENERIC.ERROR');
      }
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
    return error && (error.title || error.errors);
  }
}
