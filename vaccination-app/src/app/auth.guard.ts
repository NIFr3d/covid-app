import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(auth.isLoggedIn()) {
    return true;
  }else{
    router.navigateByUrl('/login');
    return false;

  }
};