import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
declare var UIkit:any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['',
        [
          Validators.required,
        ]
      ], 
      lastname: ['',
        [
          Validators.required,
        ]
      ],
      cin: ['',
        [Validators.required,Validators.minLength(8),Validators.maxLength(8)]
      ],
      email: ['',
        [Validators.required,Validators.email]
      ],
      password: ['',
        [Validators.required,Validators.minLength(8)]
      ],
      accept: [false,
        Validators.requiredTrue
      ]
    });
  }

  signUp() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.authService.signup(this.signUpForm.value);
      this.signUpForm.reset();
    }else{
      UIkit.notification({message: 'Invalid form', status: 'warning',timeout:'500'})
    }
  }

  get firstname() {
    return this.signUpForm.get('firstname');
  }

  get lastname() {
    return this.signUpForm.get('lastname');
  }

  get cin() {
    return this.signUpForm.get('cin');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }
}
