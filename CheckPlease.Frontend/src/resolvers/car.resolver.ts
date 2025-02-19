import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from '../environment/environment';
import { CarsService } from '../services/cars.service';

export const carResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const carId = route.paramMap.get('id');
  const router = inject(Router);
  const carsService = inject(CarsService);

  console.log(route);

  if (!carId) {
    router.navigate([environment.redirectToMain]);
    return of(null);
  }

  if (carId == 'new') {
    return of(null);
  }

  return carsService.getCar(carId).pipe(
    map((car) => {
      if (!car) {
        router.navigate([environment.redirectToMain]);
        return null;
      }
      return car;
    }),
    catchError(() => {
      router.navigate(['cars', 'new']);
      return of(null);
    }),
  );
};
