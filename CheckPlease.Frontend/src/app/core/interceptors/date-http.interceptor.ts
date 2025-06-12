import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DateHttpInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const body = this.convertDatesToUTC(req.body);
    const clonedRequest = req.clone({ body });

    return next.handle(clonedRequest);
  }

  private convertDatesToUTC(obj: any): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      const utcDate = new Date(Date.UTC(obj.getFullYear(), obj.getMonth(), obj.getDate()));
      return utcDate.toISOString().split('T')[0]; // Только дата (YYYY-MM-DD)
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertDatesToUTC(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = this.convertDatesToUTC(obj[key]);
      return acc;
    }, {} as any);
  }
}
