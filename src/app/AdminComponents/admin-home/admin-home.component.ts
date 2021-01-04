import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  formData = new FormData();

  adminPosts:any = [];
  postForm: FormGroup;

  loaded:boolean = false;

  posting:boolean = false;
  files = [];
  filesPath: any = null;
  fileName: any;
  file: any;
  imageUrl: string | ArrayBuffer;
  constructor(private fb: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getPosts();
    setInterval(()=>{
      this.getPosts();
    },10000)
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
      this.adminService.post(this.formData).subscribe((res) => {
        this.posting = false;
        this.files = [];
        this.postForm.reset();
        this.getPosts();
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


  getPosts(){
    this.adminService.getAdminPosts().subscribe((res:any)=>{
      this.adminPosts = res.feed.posts;
      this.loaded = true;
    })
  }

  get content(){
    return this.postForm.get('content');
  }

  get media(){
    return this.postForm.get('media');
  }
}
