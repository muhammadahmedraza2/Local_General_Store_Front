import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {

    if (this.auth.isLoggedIn()) {
      return true;
    }

    // ❌ not logged in
    this.router.navigate(['/login']);
    return false;
  }
}