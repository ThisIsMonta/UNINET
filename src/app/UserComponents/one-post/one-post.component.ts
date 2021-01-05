import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/Services/user.service';

declare var UIkit:any;

@Component({
  selector: 'one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {

  @Input('post') post:any;
  @Output() postDeleted = new EventEmitter();
  loading:boolean = true;
  upvoted:boolean = false;
  upvotesCount :number = 0;
  isAdmin : boolean;
  isMine:boolean;
  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.isMine = this.userService.isMine(this.post.user._id)
    this.isAdmin = JSON.parse(sessionStorage.getItem('user')).role=='Admin';
    if(this.post.user==null){
      this.post = null
    }
    setTimeout(() => {
      this.upvoted = this.isUpvoted();
      this.upvotesCount = this.post.upvotes.length;
    }, 500);
  }

  savePost(){
    this.userService.save(this.post._id).subscribe((res)=>{
    },(e)=>{
      UIkit.notification({message:e.message,status:'danger'})
    },()=>{
      UIkit.notification({message:'Post has been saved',status:'success'})
    })
  }

  deletePost(){
    UIkit.notification({message:'Deleting post',status:'warning',timeout:'250'})
    this.userService.deletePost(this.post._id).subscribe((res)=>{
    },(e)=>{
      UIkit.notification({message:e.message,status:'danger'})
    },()=>{
      UIkit.notification({message:'Post has been deleted',status:'danger'})
      this.postDeleted.emit();
    })
  }

  reportPost(){
    this.userService.report(this.post._id).subscribe((res)=>{
    },(e)=>{
      UIkit.notification({message:"An error has occurred",status:'danger'})
    },()=>{
      UIkit.notification({message:'Post has been reported',status:'success'})
    })
  }

  date(date:any){
    return moment(date).fromNow();
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

  isUpvoted(){
    return this.post.upvotes.includes(JSON.parse(sessionStorage.getItem('user'))._id);
  }
}
