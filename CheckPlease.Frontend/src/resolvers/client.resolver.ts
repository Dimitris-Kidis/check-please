import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { environment } from '../environment/environment';
import { ClientsService } from '../services/clients.service';

export const clientResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const clientId = route.paramMap.get('id');
  const router = inject(Router);
  const clientsService = inject(ClientsService);

  if (!clientId) {
    router.navigate([environment.redirectToMain]);
    return of(null);
  }

  return clientsService.getClient(clientId).pipe(
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
