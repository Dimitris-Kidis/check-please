import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createDateAsUtc } from '../../common/helpers/date.helper';

@Injectable()
export class DateAttributesInterceptor implements HttpInterceptor {
  private readonly iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.body) {
      this.traverseObjectGraph(request.body, this.subtractTimezoneOffsetFn);
    }

    return next.handle(request).pipe(
      tap((response: HttpEvent<any>) => {
        if (response.type == HttpEventType.Response) {
          if (_.isString(response.body)) {
            return;
          }

          if (response.body) {
            this.traverseObjectGraph(response.body, this.addTimezoneOffsetFn);
          }
        }
      }),
    );
  }

  private traverseObjectGraph(obj: any, func: (obj: any, property: string, currValue: any) => void): void {
    _.forIn(obj, function (value, key) {
      func(obj, key, value);
    });
  }

  private addTimezoneOffsetFn = (obj: any, key: string, value: any): void => {
    if (value != null && _.isString(value)) {
      if (this.isIso8601(value)) {
        obj[key] = new Date(value);
      }
    } else if (_.isObjectLike(value)) {
      this.traverseObjectGraph(value, this.addTimezoneOffsetFn);
    }
  };

  private subtractTimezoneOffsetFn = (obj: any, key: string, value: any): void => {
    if (obj instanceof File) {
      return;
    }

    if (value != null && _.isDate(value)) {
      obj[key] = createDateAsUtc(value);
    } else if (_.isObjectLike(value)) {
      this.traverseObjectGraph(value, this.subtractTimezoneOffsetFn);
    }
  };

  private isIso8601(value: any): boolean {
    if (value == null) {
      return false;
    }

    return this.iso8601.test(value);
  }
}
