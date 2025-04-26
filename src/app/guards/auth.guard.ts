import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const token = localStorage.getItem('token');
  const expirationToken = localStorage.getItem('expirationToken');
  let dateExpiration: Date | null = null;

  const router: Router = inject(Router);

  if (expirationToken) {
    dateExpiration = new Date(expirationToken);
  }

  if (!token || !dateExpiration || dateExpiration.getTime() <= new Date().getTime()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
