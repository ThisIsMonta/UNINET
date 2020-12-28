import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'group-user',
  templateUrl: './group-user.component.html',
  styleUrls: ['./group-user.component.css']
})
export class GroupUserComponent implements OnInit {

  @Input('user') user:any

  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }

}
