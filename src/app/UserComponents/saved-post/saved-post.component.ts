import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
declare var UIkit:any
@Component({
  selector: 'saved-post',
  templateUrl: './saved-post.component.html',
  styleUrls: ['./saved-post.component.css']
})
export class SavedPostComponent implements OnInit {

  @Input('post') post:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  removeSaved(id){
    this.userService.removeSavedPost(id).subscribe((res)=>{
      UIkit.notification({message:"saved post deleted"})
    })
  }
}
