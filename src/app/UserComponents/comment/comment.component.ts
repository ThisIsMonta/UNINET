import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('data') data:any;
  @Input('post') post:any;
  commentIsMine:boolean;
  isAdmin:boolean;
  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.data.user.role=="Admin";  
    this.commentIsMine = this.userService.isMine(this.data.user._id)
  }

  deleteComment(postId,id){
    this.userService.deleteComment(postId,id).subscribe((res)=>{
    })
  }

  date(date:any){
    return moment(date).fromNow();
  }
}
