import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/Services/user.service';

declare var UIkit:any;

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  post : any;
  loaded:boolean = false;
  isAdmin:boolean;
  comments:any=[];
  commentForm:FormGroup;
  upvotesCount:number = 0;
  upvoted: boolean;
  saved: boolean = false;
  constructor(private fb:FormBuilder,private route: ActivatedRoute,public userService:UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      console.log(params);
      // this.userService.initSocket();
      this.userService.socket.emit('JoinPost',{id:params.id});
      this.userService.getPost(params.id).subscribe((res)=>{
        this.post = res;
        this.upvotesCount = this.post.upvotes.length;
        this.isAdmin = JSON.parse(sessionStorage.getItem('user')).role=="Admin";
        this.upvoted = this.isUpvoted();
        this.comments = this.post.comments;
        console.log("comments are ",this.comments);
        console.log(this.post);
        this.loaded = true;
      })
    })
    this.userService.socket.on('PostChanged',(res)=>{
        this.post = res;
        this.upvotesCount = res.upvotes.length;
        this.comments = res.comments;
        console.log(this.comments);
    });
    this.commentForm = this.fb.group({
      comment:['',[Validators.required]]
    })
  }

  addComment(){
    this.commentForm.markAllAsTouched();
    if(this.comment.invalid){
      UIkit.notification({message:'Write something to comment',status:'primary',timeout:'500'});
    }else{
      this.userService.comment(this.post._id,this.commentForm.value).subscribe((res)=>{
        console.log("commented");
        console.log(res);
        this.commentForm.reset();
      });
    }
  }

  savePost(){
    console.log("post saved!");
    this.saved = !this.saved;
  }

  upvote(){
    if(this.upvoted){
      this.userService.downvote(this.post._id).subscribe((res:any)=>{
        this.upvotesCount = res.upvotes.length;
        console.log(res);
      })
    }else{
      this.userService.upvote(this.post._id).subscribe((res:any)=>{
        this.upvotesCount = res.upvotes.length;
        console.log(res);
      })
    }
    this.upvoted = !this.upvoted;
  }

  date(date:any){
    return moment(date).fromNow();
  }

  isUpvoted(){
    return this.post.upvotes.includes(JSON.parse(sessionStorage.getItem('user'))._id);
  }

  get comment(){
    return this.commentForm.get('comment')
  }

}
