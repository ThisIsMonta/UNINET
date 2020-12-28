import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class GroupGuard implements CanActivate, CanActivateChild {

  constructor(private router:Router,private adminService:AdminService){}

  canActivate(): boolean {
    return true;
  }
  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    console.log("guard says",route.params.id);
    if(JSON.parse(sessionStorage.getItem('groups')).includes(route.params.id) || JSON.parse(sessionStorage.getItem('user')).role=="Admin"){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
  
}
