import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user:any;
  postForm:FormGroup;

  loaded:boolean = false;
  profileIsMine:boolean;
  posting:boolean = false;
  files = [];
  filesPath: any = null;
  fileName: any;
  file: any;
  imageUrl: string | ArrayBuffer;
  formData = new FormData;
  groups: any = [];

  constructor(private route:ActivatedRoute,private fb:FormBuilder,public adminService:AdminService,public userService:UserService) {
    this.route.params.subscribe((params)=>{
      this.userService.getProfile(params.id).subscribe((res:any)=>{
        this.user = res;
        this.profileIsMine = this.userService.isMine(this.user._id)
        if (this.user.role=="Teacher") {
          this.adminService.groups().subscribe((res:any)=>{
            this.groups = res.populated;
          })
        }else{
          this.adminService.getClass(this.user.class._id).subscribe((res:any)=>{
            this.groups = res.populated.groups;
          })
        }
      },()=>{},()=>{
        this.loaded = true;
      })
   })
  }



  ngOnInit(): void {
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      media: ['']
    })
  }


  addPost() {
    this.posting = true;
    if (this.postForm.invalid) {
    } else {
      this.formData.append("content",this.postForm.get('content').value);
      this.userService.post(this.formData).subscribe((res) => {
        this.posting = false;
        this.files = [];
        this.postForm.reset();
        // this.getPosts();
      })
    }
  }

  uploadImages(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        this.formData.append(`media`, <File>event.target.files[i]);
        
        reader.onload = (event: any) => {
          this.files.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
}
