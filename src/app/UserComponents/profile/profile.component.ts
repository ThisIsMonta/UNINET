import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route:ActivatedRoute,private fb:FormBuilder,private userService:UserService) {
    this.route.params.subscribe((params)=>{
      console.log(params);
      this.userService.getProfile(params.id).subscribe((res)=>{
        this.user = res;
        this.profileIsMine = this.userService.isMine(this.user._id)
        console.log(this.profileIsMine);
        this.loaded = true;
        console.log(res);
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
    console.log(this.postForm.value);
    if (this.postForm.invalid) {
      console.log("verify your form");
    } else {
      this.formData.append("content",this.postForm.get('content').value);
      console.log(this.formData);
      this.userService.post(this.formData).subscribe((res) => {
        console.log(res);
        this.posting = false;
        this.files = [];
        this.postForm.reset();
        // this.getPosts();
      })
    }
  }

  uploadImages(event) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files);
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
