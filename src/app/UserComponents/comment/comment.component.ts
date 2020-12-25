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
  commentIsMine:boolean;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.commentIsMine = this.userService.isMine(this.data.user._id)
  }

  deleteComment(id){
    console.log("deleted");
    this.userService.deleteComment(id).subscribe((res)=>{
      console.log(res);
    })
  }

  date(date:any){
    return moment(date).fromNow();
  }
}
