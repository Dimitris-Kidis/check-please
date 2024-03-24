import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface PageSpinnerData {
  labelKey$: Observable<string | null>;
}

export const PAGE_SPINNER_DATA = new InjectionToken<PageSpinnerData>('pageSpinnerData');
