import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

declare var UIKit:any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  profileImageURL: any;
  currentUser:any;
  hasNoImage:boolean;
  formData:FormData = new FormData();
  constructor(private router:Router,private userService:UserService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    this.hasNoImage = this.currentUser.profile.photo?this.currentUser.profile.photo:''
    this.profileImageURL = this.hasNoImage?this.currentUser.profile.photo:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    this.editProfileForm = this.fb.group({
      firstname: [this.currentUser.firstname],
      lastname: [this.currentUser.lastname],
      profileImage: ['',[

      ]],
      dateOfBirth: [''],
      bio: ['']
    })
    this.editProfileForm.valueChanges.subscribe(console.log);
  }

  editProfile(){
    console.log("editing profile");
    this.editProfileForm.markAllAsTouched();
    if(this.editProfileForm.invalid){
      console.log("false");
    }else{
      this.formData.append('firstname',this.editProfileForm.get('firstname').value)
      this.formData.append('lastname',this.editProfileForm.get('lastname').value)
      this.formData.append('dn',(new Date(this.editProfileForm.get('dateOfBirth').value)).toUTCString())
      this.formData.append('bio',this.editProfileForm.get('bio').value)
      console.log(this.formData);
      this.userService.editProfile(this.formData).subscribe((res:any)=>{
        console.log(res);
        sessionStorage.setItem('user',JSON.stringify(res));
      },()=>{
        UIKit.notification({message:'an error has occured',status:'danger',timeout:'1000'});
      },()=>{
        this.router.navigate(['/home/profile']);
      })
    }
  }

  removeProfileImage() {
    this.profileImageURL = null;
    this.hasNoImage = true;
    console.log("removed");
  }

  uploadProfileImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      this.formData.append(`photo`, <File>event.target.files[0]);

      reader.onload = (event: any) => {
        console.log(event.target.result);
        this.profileImageURL = event.target.result;

        // this.editProfileForm.patchValue({
        //   profileImage: this.profileImageURL
        // });
      }
      this.hasNoImage = false;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get firstname(){
    return this.editProfileForm.get('firstname')
  }

  get lastname(){
    return this.editProfileForm.get('lastname')
  }

  get profileImage(){
    return this.editProfileForm.get('profileImage')
  }

  get dateOfBirth(){
    return this.editProfileForm.get('dateOfBirth')
  }

  get bio(){
    return this.editProfileForm.get('bio')
  }

}
