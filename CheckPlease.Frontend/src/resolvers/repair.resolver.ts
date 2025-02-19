import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from '../environment/environment';
import { RepairsService } from '../services/repairs.service';

export const repairResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const repairId = route.paramMap.get('id');
  const router = inject(Router);
  const repairsService = inject(RepairsService);

  if (!repairId) {
    router.navigate([environment.redirectToMain]);
    return of(null);
  }

  return repairsService.getRepair(repairId).pipe(
    map((client) => {
      if (!client) {
        router.navigate([environment.redirectToMain]);
        return null;
      }
      return client;
    }),
    catchError(() => {
      router.navigate([environment.redirectToMain]);
      return of(null);
    }),
  );
};
