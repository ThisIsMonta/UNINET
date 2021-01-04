import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

declare var UIkit:any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {

  editing:boolean = false;
  editProfileForm: FormGroup;
  profileImageURL: any;
  currentUser:any;
  profileImageExists:boolean;
  formData:FormData = new FormData();
  constructor(private router:Router,private userService:UserService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    this.profileImageExists = this.currentUser.profile.photo.length!=0?true:false
    this.profileImageURL = this.profileImageExists?this.userService.host+"/"+this.currentUser.profile.photo[0].filename:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    this.editProfileForm = this.fb.group({
      firstname: [this.currentUser.firstname,[Validators.required]],
      lastname: [this.currentUser.lastname,[Validators.required]],
      profileImage: [''],
      dateOfBirth: [this.currentUser.profile.dn?formatDate(this.currentUser.profile.dn, 'yyyy-MM-dd','en'):''],
      bio: [this.currentUser.profile.bio?this.currentUser.profile.bio:'']
    })
  }

  editProfile(){
    this.editing = true;
    this.editProfileForm.markAllAsTouched();
    if(this.editProfileForm.invalid){
      this.editing = false
      UIkit.notification({message:'Invalid form',status:'danger',timeout:'1000'});
    }else{
      this.formData.append('firstname',this.editProfileForm.get('firstname').value)
      this.formData.append('lastname',this.editProfileForm.get('lastname').value)
      this.formData.append('dn',(new Date(this.editProfileForm.get('dateOfBirth').value)).toUTCString())
      this.formData.append('bio',this.editProfileForm.get('bio').value)
      this.userService.editProfile(this.formData).subscribe((res:any)=>{
        sessionStorage.setItem('user',JSON.stringify(res));
      },(e)=>{
        UIkit.notification({message:e.message,status:'danger',timeout:'1000'});
      },()=>{
        this.editing = false;
        this.router.navigate(['home/profile',this.currentUser._id]);
      })
    }
  }

  removeProfileImage() {
    this.profileImageURL = null;
    this.profileImageExists = false;
  }

  uploadProfileImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      this.formData.append(`photo`, <File>event.target.files[0]);

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.profileImageURL = event.target.result;
      }
      this.profileImageExists = true;
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
