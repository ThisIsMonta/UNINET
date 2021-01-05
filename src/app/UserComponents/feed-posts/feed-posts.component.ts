import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent implements OnInit {

  user:any;
  postForm:FormGroup;
  withMedia:boolean = false;
  loaded:boolean = false;

  posting:boolean = false;
  files = [];
  filesPath: any = null;
  fileName: any;
  file: any;
  imageUrl: string | ArrayBuffer;
  formData = new FormData;
  
  posts:any = [];
  savedPosts:any = [];
  loading:boolean = true;
  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      media: ['']
    })
    this.userService.getTimeline().subscribe((res)=>{
      this.posts = res;
      this.loading = false;
    })
    if(this.user.role!='Admin'){
      this.userService.getSavedPosts().subscribe((res:any)=>{
        this.savedPosts = res.saved;
      })
    }
    
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
    this.userService.getTimeline().subscribe((res)=>{
      this.posts = res;
    })
  }

}
