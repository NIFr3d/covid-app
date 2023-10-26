import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from './service/storage.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(StorageService);
  const router = inject(Router);
  if(user.isLoggedIn()) {
    return true;
  }else{
    router.navigateByUrl('/login');
    return false;

  }
};
export const medecinGuard: CanActivateFn = (route, state) => {
  const user = inject(StorageService);
  const router = inject(Router);
  if(user.isLoggedIn()) {
    if(user.isMedecin()) return true;
    else {
      router.navigateByUrl('/error?error=403')
      return false;
    }
  }else{
    router.navigateByUrl('/login')
    return false;
  }
};
export const adminGuard: CanActivateFn = (route, state) => {
  const user = inject(StorageService);
  const router = inject(Router);
  if(user.isLoggedIn()) {
    if(user.isAdmin()) return true;
    else {
      router.navigateByUrl('/error?error=403')
      return false;
    }
  }else{
    router.navigateByUrl('/login')
    return false;
  }
};

