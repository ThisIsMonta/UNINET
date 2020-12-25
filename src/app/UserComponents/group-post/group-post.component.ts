import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'group-post',
  templateUrl: './group-post.component.html',
  styleUrls: ['./group-post.component.css']
})
export class GroupPostComponent implements OnInit {

  @Input('post') post:any;
  loading:boolean = true;
  upvoted:boolean = false;
  upvotesCount :number = 0;
  isAdmin : boolean;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.isAdmin = JSON.parse(sessionStorage.getItem('user')).role=='Admin';
    if(this.post.user==null){
      this.post = null
    }
    this.upvoted = this.isUpvoted();
    this.upvotesCount = this.post.upvotes.length;
  }

  savePost(){
    this.userService.save(this.post._id).subscribe((res)=>{
      console.log(res);
    })
  }

  reportPost(){
    console.log("post reported");
  }

  date(date:any){
    return moment(date).fromNow();
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

  isUpvoted(){
    return this.post.upvotes.includes(JSON.parse(sessionStorage.getItem('user'))._id);
  }
}
