import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {


  group:any;
  students:any = [];
  posts:any = [];
  withMedia:boolean = false;
  formData = new FormData();
  loading:boolean = true;
  posting:boolean = false;
  postForm:FormGroup;
  files = [];
  groupId :any;
  constructor(private fb:FormBuilder,private userService:UserService,private adminService:AdminService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      console.log(params);
      this.adminService.getGroup(params.id).subscribe((res:any)=>{
        this.groupId = params.id;
        this.group = res;
        this.students = res.class.students;
        this.posts = res.feed.posts;
        this.loading = false;
        console.log(res);
      })
    })
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
      this.userService.postInGroup(this.groupId,this.formData).subscribe((res) => {
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
