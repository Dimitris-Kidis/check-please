import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from '../environment/environment';
import { CarsService } from '../services/cars.service';

export const carResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const carId = route.paramMap.get('id');
  const router = inject(Router);
  const carsService = inject(CarsService);

  if (!carId) {
    router.navigate([environment.redirectToMain]);
    return of(null);
  }

  return carsService.getCar(carId).pipe(
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
