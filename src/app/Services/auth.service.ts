import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { style } from '@angular/animations';
import { UserService } from './user.service';
declare var UIkit:any

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  validOrNot: boolean;
  public currentUser:any;
  constructor(private http: HttpService, private router: Router) {
    this.token = localStorage.getItem("token");
  }

  login(loginForm: FormGroup) {
    return this.http.sendPostRequest("/auth/login", loginForm).pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          console.log(`Error: ${error.error.message}`);
        } else {
          console.log(`Error: ${error.message}`);
        }
        throw error;
      }));
  }

  signup(signUpForm: FormGroup) {
    this.http.sendPostRequest("/auth/new", signUpForm).subscribe((r) => {
      UIkit.notification({message:"Your account has been successfully created",status: 'success',timeout:'1000'})
      setTimeout(()=>{
        this.router.navigate(['login']);
      },2000);
    });
  }

  signOut(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('groups');
    this.currentUser = null;
    this.router.navigate(['login']);
  }

  public isAuthenticated() :boolean{
    this.token = localStorage.getItem('token');
    this.currentUser = sessionStorage.getItem('user');
    // console.log("token is "+this.token);
    return !!this.token && !!this.currentUser;
  }

  persistUser(token:any,user:any){
    localStorage.setItem('token',token)
    sessionStorage.setItem('user',JSON.stringify(user));
  }
}
