import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth:AuthService,private router:Router){}

  canActivateChild(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.signOut();
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
