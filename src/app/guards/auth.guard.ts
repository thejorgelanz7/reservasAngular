import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.auth.isLoggedIn(); // usa tu método
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // o la ruta que uses para loguear
      return false;
    }
    return true;
  }
}
