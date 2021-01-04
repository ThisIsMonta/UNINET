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
    var groups = JSON.parse(sessionStorage.getItem('groups'));
    var user = JSON.parse(sessionStorage.getItem('user'));
    if(groups!=null){
      if(groups.includes(route.params.id)){
        return true;
      }
    }else if(user.role=="Admin"){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
  
}
