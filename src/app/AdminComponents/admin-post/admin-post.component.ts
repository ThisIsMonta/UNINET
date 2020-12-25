import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpService } from 'src/app/Services/http.service';
import { UserService } from 'src/app/Services/user.service';

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
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.upvotesCount = this.post.upvotes.length;
    this.isAdmin = JSON.parse(sessionStorage.getItem('user')).role=="Admin";
    this.upvoted = this.isUpvoted();
  }

  savePost(){
    console.log("post saved!");
    this.saved = !this.saved;
  }

  deletePost(id){
    console.log("post deleted");
    this.userService.deletePost(id).subscribe((res)=>{
      console.log(res);
      this.isDeleted = true;
    });
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
    return this.post.upvotes.includes(JSON.parse(sessionStorage.getItem('user')).userId);
  }

}
