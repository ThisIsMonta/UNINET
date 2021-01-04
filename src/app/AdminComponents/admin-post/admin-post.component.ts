import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/Services/user.service';

declare var UIkit:any;

@Component({
  selector: 'admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {


  @Input('post') post:any;
  isAdmin:boolean;

  upvotesCount:number = 0;
  upvoted: boolean;
  saved: boolean = false;
  isDeleted : boolean = false;
  user:any;
  constructor(public userService:UserService) { }

  ngOnInit(): void {
    console.log(this.post);
    this.upvotesCount = this.post.upvotes.length;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.isAdmin = this.user.role=="Admin";
    this.upvoted = this.isUpvoted();
    this.saved = this.isSaved();
  }

  savePost(){
    this.userService.save(this.post._id).subscribe((res)=>{
      console.log(res);
    },()=>{},()=>{
      this.saved = true;
    })
  }

  deletePost(id){
    this.userService.deletePost(id).subscribe((res)=>{
      this.isDeleted = true;
    },(e)=>{
      UIkit.notification({message: e.message});
    },()=>{
      UIkit.notification({message: `Post has been deleted`,status:'success'});
    });
  }

  upvote(){
    if(this.upvoted){
      this.userService.downvote(this.post._id).subscribe((res:any)=>{
        this.upvotesCount = res.upvotes.length;
      })
    }else{
      this.userService.upvote(this.post._id).subscribe((res:any)=>{
        this.upvotesCount = res.upvotes.length;
      })
    }
    this.upvoted = !this.upvoted;
  }

  date(date:any){
    return moment(date).fromNow();
  }

  isUpvoted(){
    return this.post.upvotes.includes(JSON.parse(sessionStorage.getItem('user')).userId);
  }

  isSaved(){
    return this.user.saves.includes(this.post._id)
  }

}
