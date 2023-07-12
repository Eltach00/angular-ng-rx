import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('authToken');
    if (token === null) {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }
}
