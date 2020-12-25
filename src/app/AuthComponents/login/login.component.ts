import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare var UIkit:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;
  isAdmin : any;
  constructor(private fb: FormBuilder,private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    var user:any = JSON.parse(sessionStorage.getItem('user'));
    if(user && localStorage.getItem('token')){
      if(user.role=="Admin"){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/home']);
      }
    }
    this.loginForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ], 
      password: ['',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
    });
  }

  loginUser(){
    this.loginForm.markAllAsTouched();
    this.loading = true;
    if(this.loginForm.invalid){
      UIkit.notification({message: 'Invalid form', status: 'warning',timeout:'500'})
      this.loginForm.reset();
      this.loading = false;
    }else{
      this.authService.login(this.loginForm.value)
      .subscribe((r:any) => {
        if(r.user.role=="Admin"){
          this.isAdmin = true;
          this.authService.persistUser(r.access_token,r.user)
        }else if(r.user.role!="Admin" && r.user.valid){
          this.isAdmin = false
          this.authService.persistUser(r.access_token,r.user)
        }else{
          UIkit.notification({message: 'You can\'t log in right now, please wait for the administration to verify your account.', status: 'warning'})
          this.loading = false;
        }
      },
      error => {
        this.loading = false
        UIkit.notification({message: 'Verify your e-mail or password.',status: 'danger'})
        this.loginForm.reset();
      },()=>{
        if(this.isAdmin){
          UIkit.notification({message:"Welcome back, Admin",status: 'success',timeout:'1000'})
          this.router.navigate(['./admin'])
        }else{
          this.router.navigate(['../home'])
        }
      });
    }
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
